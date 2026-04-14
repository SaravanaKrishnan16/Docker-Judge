const express = require('express');
const router = express.Router();
const { getAllProblems, getProblem } = require('../services/problemService');

/**
 * GET /problems
 * Get all problems list
 */
router.get('/problems', (req, res) => {
  console.log('[PROBLEMS] GET /problems called');
  try {
    const problems = getAllProblems();
    console.log('[PROBLEMS] Found problems:', problems.length);
    res.json(problems);
  } catch (error) {
    console.error('[PROBLEMS] Error:', error);
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
});

/**
 * GET /api/problems/:id
 * Get single problem details
 */
router.get('/problems/:id', (req, res) => {
  try {
    const problem = getProblem(req.params.id);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    console.error('[PROBLEM] Error:', error);
    res.status(500).json({ error: 'Failed to fetch problem' });
  }
});

module.exports = router;