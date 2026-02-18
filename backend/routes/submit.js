const express = require('express');
const router = express.Router();
const { judgeSubmission } = require('../judge/judgeService');

/**
 * POST /api/submit
 * Submit code for judging
 */
router.post('/submit', async (req, res) => {
  try {
    const { problemId, language, code } = req.body;

    // Validate request
    if (!problemId || !language || !code) {
      return res.status(400).json({
        error: 'Missing required fields: problemId, language, code'
      });
    }

    if (!['java', 'python'].includes(language)) {
      return res.status(400).json({
        error: 'Unsupported language. Supported: java, python'
      });
    }

    console.log(`[SUBMIT] Problem: ${problemId}, Language: ${language}, Code length: ${code.length}`);

    // Judge the submission
    const result = await judgeSubmission(problemId, language, code);

    console.log(`[SUBMIT] Result: ${result.verdict}, ${result.passed}/${result.total} passed`);

    res.json(result);
  } catch (error) {
    console.error('[SUBMIT] Error:', error);
    // Ensure we always send valid JSON
    res.status(500).json({ 
      verdict: 'ERROR',
      error: error.message || 'Submission failed',
      passed: 0,
      total: 0
    });
  }
});

module.exports = router;