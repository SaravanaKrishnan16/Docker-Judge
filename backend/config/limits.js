/**
 * Resource Limits Configuration
 * Strict limits to prevent abuse and DoS attacks
 */

const LIMITS = {
  // Timeout in milliseconds
  EXECUTION_TIMEOUT_MS: 300000,

  // Time limits for different solution types (per testcase)
  TIME_LIMITS: {
    OPTIMAL: 1000,      // 1 second for optimal solutions
    ACCEPTABLE: 3000,   // 3 seconds for acceptable solutions
    BRUTE_FORCE: 5000,  // 5 seconds for brute force (will be flagged)
    HARD_LIMIT: 10000   // 10 seconds absolute limit
  },

  // Memory limit in megabytes
  MEMORY_LIMIT_MB: 2048,

  // CPU limit (fraction of 1 core)
  CPU_LIMIT: 1.0,

  // Process limit (prevent fork bombs)
  PID_LIMIT: 1024,

  // Code size limit in bytes (10MB)
  CODE_SIZE_LIMIT_BYTES: 10 * 1024 * 1024,

  // Supported languages
  SUPPORTED_LANGUAGES: ['python', 'java'],

  // Docker image names
  DOCKER_IMAGES: {
    python: 'dockerjudge-python:latest',
    java: 'dockerjudge-java:latest'
  },

  // Working directory inside container
  CONTAINER_WORK_DIR: '/tmp/code',

  // Input file names inside container
  INPUT_FILES: {
    python: 'solution.py',
    java: 'Main.java'
  }
};

module.exports = LIMITS;
