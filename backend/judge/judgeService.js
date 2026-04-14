const { executeCode } = require('../services/dockerExecutor');
const LIMITS = require('../config/limits');
const fs = require('fs');
const path = require('path');

/**
 * Compare two outputs with LeetCode-style rules
 */
function compareOutputs(expected, actual) {
  const normalize = (str) => str.trim().replace(/\s+/g, ' ');
  return normalize(expected) === normalize(actual);
}

/**
 * Determine solution efficiency based on execution time
 */
function analyzeSolutionEfficiency(executionTime) {
  if (executionTime <= LIMITS.TIME_LIMITS.OPTIMAL) {
    return { type: 'OPTIMAL', message: 'Excellent! Optimal solution.' };
  } else if (executionTime <= LIMITS.TIME_LIMITS.ACCEPTABLE) {
    return { type: 'ACCEPTABLE', message: 'Good solution, but could be optimized.' };
  } else if (executionTime <= LIMITS.TIME_LIMITS.BRUTE_FORCE) {
    return { type: 'BRUTE_FORCE', message: 'Warning: This appears to be a brute force solution. Consider optimizing.' };
  } else {
    return { type: 'TOO_SLOW', message: 'Solution is too slow and exceeds time limits.' };
  }
}

/**
 * Load problem data from JSON file
 */
function loadProblem(problemId) {
  const problemPath = path.join(__dirname, '../problems', `${problemId}.json`);
  if (!fs.existsSync(problemPath)) {
    throw new Error(`Problem ${problemId} not found`);
  }
  return JSON.parse(fs.readFileSync(problemPath, 'utf8'));
}

/**
 * Judge a submission against all testcases
 */
async function judgeSubmission(problemId, language, code) {
  const problem = loadProblem(problemId);
  const testcases = problem.testcases;
  
  let passed = 0;
  let totalTime = 0;
  let maxTime = 0;
  let verdict = 'ACCEPTED';
  let failedTestcase = null;
  let efficiencyAnalysis = null;
  let warnings = [];

  for (let i = 0; i < testcases.length; i++) {
    const testcase = testcases[i];
    
    try {
      const result = await executeCode(language, code, testcase.input);
      totalTime += result.executionTimeMs;
      maxTime = Math.max(maxTime, result.executionTimeMs);

      // Check for compilation error
      if (result.status === 'compilation_error') {
        verdict = 'COMPILE ERROR';
        break;
      }

      // Check for runtime error
      if (result.status === 'runtime_error' || result.status === 'error') {
        verdict = 'RUNTIME ERROR';
        failedTestcase = i + 1;
        break;
      }

      // Check for hard timeout
      if (result.executionTimeMs > LIMITS.TIME_LIMITS.HARD_LIMIT) {
        verdict = 'TIME LIMIT EXCEEDED';
        failedTestcase = i + 1;
        break;
      }

      // Check output correctness
      if (!compareOutputs(testcase.output, result.output)) {
        verdict = 'WRONG ANSWER';
        failedTestcase = i + 1;
        break;
      }

      passed++;
    } catch (error) {
      verdict = 'RUNTIME ERROR';
      failedTestcase = i + 1;
      break;
    }
  }

  // Analyze solution efficiency if all tests passed
  if (verdict === 'ACCEPTED') {
    efficiencyAnalysis = analyzeSolutionEfficiency(maxTime);
    
    if (efficiencyAnalysis.type === 'BRUTE_FORCE') {
      warnings.push('Your solution works but uses a brute force approach. Consider optimizing for better performance.');
    } else if (efficiencyAnalysis.type === 'ACCEPTABLE') {
      warnings.push('Good solution! There might be room for further optimization.');
    }
  }

  return {
    verdict,
    passed,
    total: testcases.length,
    time_ms: totalTime,
    max_time_ms: maxTime,
    failedTestcase,
    efficiency: efficiencyAnalysis,
    warnings
  };
}

module.exports = {
  judgeSubmission,
  loadProblem
};