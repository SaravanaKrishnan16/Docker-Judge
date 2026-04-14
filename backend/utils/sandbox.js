/**
 * Sandbox Utility - Security policies and container setup
 */

const LIMITS = require('../config/limits');

/**
 * Generate Docker run command with security restrictions
 * @param {string} language - Programming language
 * @param {string} tempDir - Host temp directory
 * @returns {Array} Docker run command arguments
 */
function getDockerRunArgs(language, tempDir) {
  const imageName = LIMITS.DOCKER_IMAGES[language];
  
  return [
    'run',
    '--rm',
    '--volume', `${tempDir}:/tmp/code`,
    '--workdir', '/tmp/code',
<<<<<<< HEAD
    '--memory', `${LIMITS.MEMORY_LIMIT_MB}m`,
    '--cpus', LIMITS.CPU_LIMIT.toString(),
    '--pids-limit', LIMITS.PID_LIMIT.toString(),
    '--network', 'none',
    '--read-only',
    '--tmpfs', '/tmp:rw,noexec,nosuid,size=100m',
=======
>>>>>>> 124c7d68b545197e2970aa4afbfd8ea59bdb4455
    imageName
  ];
}

/**
 * Get container execution command based on language
 * @param {string} language - Programming language
 * @param {string} code - Source code (for extracting class name in Java)
 * @param {string} input - Optional stdin input
 * @returns {Array} Command to execute code
 */
function getContainerCommand(language, code = '', input = '') {
  const commands = {
<<<<<<< HEAD
    python: ['python3', 'solution.py'],
=======
    python: input ? ['sh', '-c', 'python3 solution.py < input.txt'] : ['python3', 'solution.py'],
>>>>>>> 124c7d68b545197e2970aa4afbfd8ea59bdb4455
    java: ['java', '-cp', '.', 'Main']
  };

  return commands[language] || [];
}

/**
 * Get compilation command for language (if needed)
 * @param {string} language - Programming language
 * @param {string} code - Source code (for extracting class name in Java)
 * @returns {Object|null} {command: Array, executable: string} or null if no compilation needed
 */
function getCompilationCommand(language, code = '') {
  const commands = {
    java: {
      command: ['javac', 'Main.java'],
      executable: 'Main'
    }
  };

  return commands[language] || null;
}

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

module.exports = {
  getDockerRunArgs,
  getContainerCommand,
  getCompilationCommand
};
