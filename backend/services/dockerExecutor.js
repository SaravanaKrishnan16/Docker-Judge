/**
 * Docker Executor Service
 * Manages container lifecycle, code execution, and result capture
 * CRITICAL: This is the security-sensitive core of the system
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const LIMITS = require('../config/limits');
const { getDockerRunArgs, getCompilationCommand, getContainerCommand } = require('../utils/sandbox');


/**
 * Extract class name from Java code
 * @param {string} code - Java source code
 * @returns {string|null} Class name or null if not found
 */
function getJavaClassName(code) {
  if (!code) return null;
  const match = code.match(/public\s+class\s+(\w+)/i);
  return match ? match[1] : null;
}

/**
 * Execute code in isolated Docker container
 * @param {string} language - Programming language
 * @param {string} code - User code to execute
 * @param {string} input - Optional stdin input
 * @returns {Promise<Object>} Execution result
 */
async function executeCode(language, code, input = '') {
  // Direct Docker execution for reliability and consistency
  return executeCodeInDocker(language, code, input);
}

/**
 * Original Docker execution method
 */
async function executeCodeInDocker(language, code, input = '') {
  const executionId = uuidv4();
  const tempDir = path.join(os.tmpdir(), 'dockerjudge', `execution-${executionId}`);
  
  // Decode HTML entities and fix newlines in code
  code = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  // Handle escaped newlines from JSON
  code = code.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');
  
  // For Docker-in-Docker, we need to use the host path, not the container path
  // The backend container's /tmp/dockerjudge is mounted from the host
  let hostTempDir = tempDir;
  console.log(`[${executionId}] Container temp dir: ${tempDir}`);
  console.log(`[${executionId}] HOST_TMP_DIR env: ${process.env.HOST_TMP_DIR}`);
  if (process.env.HOST_TMP_DIR) {
    // Replace /tmp/dockerjudge with the host path
    hostTempDir = tempDir.replace('/tmp/dockerjudge', process.env.HOST_TMP_DIR);
    console.log(`[${executionId}] Using host temp dir: ${hostTempDir}`);
  }
  
  try {
    // Create isolated temp directory
    fs.mkdirSync(tempDir, { recursive: true, mode: 0o777 });
    console.log(`[${executionId}] Created temp directory: ${tempDir}`);

    // Write code to file with dynamic filename for Java
    let inputFile = LIMITS.INPUT_FILES[language];
    // Always use Main.java for Java to match the public class
    const codePath = path.join(tempDir, inputFile);
    fs.writeFileSync(codePath, code, { encoding: 'utf8', mode: 0o644 });
    console.log(`[${executionId}] Wrote code file: ${codePath}`);
    console.log(`[${executionId}] Code content: ${code.substring(0, 100)}...`);
    
    // Write input file if provided
    if (input) {
      const inputPath = path.join(tempDir, 'input.txt');
      fs.writeFileSync(inputPath, input, { encoding: 'utf8', mode: 0o644 });
      console.log(`[${executionId}] Wrote input file: ${inputPath}`);
    }
    
    // Set directory permissions
    fs.chmodSync(tempDir, 0o755);
    console.log(`[${executionId}] Set directory permissions: ${tempDir}`);

    // Check for compilation requirement
    const compilationCmd = getCompilationCommand(language, code);
    
    if (compilationCmd) {
      console.log(`[${executionId}] Compiling and executing ${language} code...`);
      
      // For Java, compile and run in the same container
      if (language === 'java') {
        // Always use Main as the class name since that's our public class
        const className = 'Main';
        
        // Java execution without timeout constraints
        const result = await executeInContainer(
          language,
          hostTempDir,
          ['sh', '-c', input ? `javac ${className}.java && java ${className} < input.txt` : `javac ${className}.java && java ${className}`],
          false
        );
        
        console.log(`[${executionId}] Java execution result:`, {
          exitCode: result.exitCode,
          stdout: result.stdout,
          stderr: result.stderr
        });
        
        // Check for compilation errors in stderr
        if (result.stderr && result.stderr.includes('error:')) {
          return {
            status: 'compilation_error',
            output: result.stdout,
            error: result.stderr,
            executionTimeMs: result.executionTimeMs,
            memoryKb: 0
          };
        }
        
        return {
          status: result.exitCode === 0 ? 'success' : 'runtime_error',
          output: result.stdout,
          error: result.stderr,
          executionTimeMs: result.executionTimeMs,
          memoryKb: result.memoryKb || 0
        };
      }

      
      // For other languages, keep the original two-step process
      console.log(`[${executionId}] Compilation command: ${compilationCmd.command.join(' ')}`);
      const compileResult = await executeInContainer(
        language,
        hostTempDir,
        compilationCmd.command,
        true
      );

      if (compileResult.exitCode !== 0) {
        return {
          status: 'compilation_error',
          output: '',
          error: compileResult.stderr,
          executionTimeMs: compileResult.executionTimeMs,
          memoryKb: 0
        };
      }
    }

    // Execute code (skip for Java as it's already handled above)
    if (language !== 'java') {
      console.log(`[${executionId}] Executing ${language} code...`);
      
      const execCommand = getContainerCommand(language, code, input);
      console.log(`[${executionId}] Execution command: ${execCommand.join(' ')}`);
      const execResult = await executeInContainer(
        language,
        hostTempDir,
        execCommand,
        false
      );

      console.log(`[${executionId}] Execution result:`, {
        exitCode: execResult.exitCode,
        stdout: execResult.stdout,
        stderr: execResult.stderr
      });

      // Build response
      const response = {
        status: execResult.exitCode === 0 ? 'success' : 'runtime_error',
        output: execResult.stdout,
        error: execResult.stderr,
        executionTimeMs: execResult.executionTimeMs,
        memoryKb: execResult.memoryKb || 0
      };

      console.log(`[${executionId}] Execution completed: ${response.status}`);
      return response;
    }

  } catch (error) {
    console.error(`[${executionId}] Fatal error:`, error);
    return {
      status: 'error',
      output: '',
      error: error.message,
      executionTimeMs: 0,
      memoryKb: 0
    };
  } finally {
    // Cleanup temp directory
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log(`[${executionId}] Cleaned up temp directory`);
    } catch (error) {
      console.error(`[${executionId}] Cleanup error:`, error.message);
    }
  }
}

/**
 * Execute command inside Docker container
 * @param {string} language - Programming language
 * @param {string} tempDir - Host temp directory with code
 * @param {Array} command - Command to execute inside container
 * @param {boolean} isCompilation - Whether this is a compilation step
 * @returns {Promise<Object>} {stdout, stderr, exitCode, executionTimeMs, memoryKb}
 */
function executeInContainer(language, tempDir, command, isCompilation = false) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    try {
      // Build docker command
      const args = getDockerRunArgs(language, tempDir);
      const fullCommand = [...args, ...command];
      
      console.log(`[DOCKER] Running: docker ${fullCommand.join(' ')}`);

      const child = spawn('docker', fullCommand, {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        const executionTime = Date.now() - startTime;
        resolve({
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode: code || 0,
          executionTimeMs: executionTime,
          memoryKb: 0
        });
      });

      child.on('error', (error) => {
        resolve({
          stdout: '',
          stderr: error.message,
          exitCode: 1,
          executionTimeMs: Date.now() - startTime,
          memoryKb: 0
        });
      });

    } catch (error) {
      resolve({
        stdout: '',
        stderr: error.message,
        exitCode: 1,
        executionTimeMs: Date.now() - startTime,
        memoryKb: 0
      });
    }
  });
}

module.exports = {
  executeCode
};
