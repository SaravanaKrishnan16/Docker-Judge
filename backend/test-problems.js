const { getAllProblems } = require('./services/problemService');

console.log('Testing problemService...');
try {
  const problems = getAllProblems();
  console.log('Problems found:', problems.length);
  console.log('Problems:', JSON.stringify(problems, null, 2));
} catch (error) {
  console.error('Error:', error);
}