/**
 * Local Executor Service - Fallback for when Docker is slow
 * WARNING: This is less secure than Docker but faster for development
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

/**
 * Execute Java code locally (faster than Docker)
 */
async function executeJavaLocally(code, input = '') {
  const executionId = uuidv4();
  const tempDir = path.join(os.tmpdir(), 'dockerjudge-local', `execution-${executionId}`);
  
  try {
    // Create temp directory
    fs.mkdirSync(tempDir, { recursive: true });
    
    // Write Java file
    const javaFile = path.join(tempDir, 'Main.java');
    fs.writeFileSync(javaFile, code);
    
    // Write input file if provided
    if (input) {
      const inputFile = path.join(tempDir, 'input.txt');
      fs.writeFileSync(inputFile, input);
    }
    
    const startTime = Date.now();
    
    try {
      // Compile Java
      execSync(`javac "${javaFile}"`, { 
        cwd: tempDir, 
        timeout: 10000,
        stdio: 'pipe'
      });
      
      // Run Java
      const command = input ? 
        `java -cp "${tempDir}" Main < "${path.join(tempDir, 'input.txt')}"` :
        `java -cp "${tempDir}" Main`;
        
      const output = execSync(command, { 
        cwd: tempDir, 
        timeout: 5000,
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const executionTimeMs = Date.now() - startTime;
      
      return {
        status: 'success',
        output: output.trim(),
        error: '',
        executionTimeMs,
        memoryKb: 0
      };
      
    } catch (error) {
      const executionTimeMs = Date.now() - startTime;
      
      if (error.stderr && error.stderr.includes('error:')) {
        return {
          status: 'compilation_error',
          output: '',
          error: error.stderr,
          executionTimeMs,
          memoryKb: 0
        };
      }
      
      return {
        status: 'runtime_error',
        output: error.stdout || '',
        error: error.stderr || error.message,
        executionTimeMs,
        memoryKb: 0
      };
    }
    
  } catch (error) {
    return {
      status: 'error',
      output: '',
      error: error.message,
      executionTimeMs: 0,
      memoryKb: 0
    };
  } finally {
    // Cleanup
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

/**
 * Execute Python code locally
 */
async function executePythonLocally(code, input = '') {
  const executionId = uuidv4();
  const tempDir = path.join(os.tmpdir(), 'dockerjudge-local', `execution-${executionId}`);
  
  try {
    fs.mkdirSync(tempDir, { recursive: true });
    
    const pythonFile = path.join(tempDir, 'solution.py');
    fs.writeFileSync(pythonFile, code);
    
    if (input) {
      const inputFile = path.join(tempDir, 'input.txt');
      fs.writeFileSync(inputFile, input);
    }
    
    const startTime = Date.now();
    
    try {
      const command = input ? 
        `python "${pythonFile}" < "${path.join(tempDir, 'input.txt')}"` :
        `python "${pythonFile}"`;
        
      const output = execSync(command, { 
        cwd: tempDir, 
        timeout: 5000,
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const executionTimeMs = Date.now() - startTime;
      
      return {
        status: 'success',
        output: output.trim(),
        error: '',
        executionTimeMs,
        memoryKb: 0
      };
      
    } catch (error) {
      const executionTimeMs = Date.now() - startTime;
      
      return {
        status: 'runtime_error',
        output: error.stdout || '',
        error: error.stderr || error.message,
        executionTimeMs,
        memoryKb: 0
      };
    }
    
  } catch (error) {
    return {
      status: 'error',
      output: '',
      error: error.message,
      executionTimeMs: 0,
      memoryKb: 0
    };
  } finally {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

module.exports = {
  executeJavaLocally,
  executePythonLocally
};