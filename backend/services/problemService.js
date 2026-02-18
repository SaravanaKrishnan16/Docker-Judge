const fs = require('fs');
const path = require('path');

/**
 * Get all problems (without testcases for security)
 */
function getAllProblems() {
  const problemsDir = path.join(__dirname, '../problems');
  const files = fs.readdirSync(problemsDir).filter(f => f.endsWith('.json'));
  
  const problems = files.map(file => {
    const problemData = JSON.parse(fs.readFileSync(path.join(problemsDir, file), 'utf8'));
    // Remove testcases and templates from public data
    const { testcases, templates, ...publicData } = problemData;
    return publicData;
  });

  // Sort problems by title alphabetically
  return problems.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Get single problem by ID (without testcases)
 */
function getProblem(problemId) {
  const problemPath = path.join(__dirname, '../problems', `${problemId}.json`);
  if (!fs.existsSync(problemPath)) {
    return null;
  }
  
  const problemData = JSON.parse(fs.readFileSync(problemPath, 'utf8'));
  // Remove testcases from public data but keep templates
  const { testcases, ...publicData } = problemData;
  return publicData;
}

module.exports = {
  getAllProblems,
  getProblem
};