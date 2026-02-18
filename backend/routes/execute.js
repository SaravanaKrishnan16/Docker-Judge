/**
 * Execute Route - Handles code execution requests
 */

const express = require('express');
const router = express.Router();
const { executeCode } = require('../services/dockerExecutor');
const { validateRequest } = require('../utils/validation');
const { handleError } = require('../utils/errorHandler');

/**
 * POST /api/execute
 * Execute user code in isolated Docker container
 *
 * Request body:
 * {
 *   "language": "python|java",
 *   "code": "user code as string"
 * }
 *
 * Response:
 * {
 *   "status": "success|error",
 *   "output": "stdout",
 *   "error": "stderr",
 *   "executionTimeMs": number,
 *   "memoryKb": number
 * }
 */
router.post('/execute', async (req, res) => {
  try {
    // Validate request
    const validation = validateRequest(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        status: 'error',
        message: validation.message
      });
    }

    const { language, code } = req.body;
    const input = req.body.input || '';

    console.log(`[EXECUTE] Language: ${language}, Code length: ${code.length} bytes, Input length: ${input.length} bytes`);

    // Execute code in container
    const result = await executeCode(language, code, input);

    // Return result
    res.json(result);
  } catch (error) {
    console.error('[EXECUTE] Error:', error);
    handleError(res, error);
  }
});

module.exports = router;
