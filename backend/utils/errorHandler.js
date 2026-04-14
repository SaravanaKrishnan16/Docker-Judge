/**
 * Error Handler Utility
 */

/**
 * Handle errors and send appropriate response
 * @param {Object} res - Express response object
 * @param {Error} error - Error object
 */
function handleError(res, error) {
  // Docker-related errors
  if (error.message && error.message.includes('Docker')) {
    return res.status(503).json({
      status: 'error',
      message: 'Docker service unavailable',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }

  // Timeout errors
  if (error.message && error.message.includes('timeout')) {
    return res.status(400).json({
      status: 'error',
      message: 'Execution timeout exceeded'
    });
  }

  // Generic errors
  res.status(500).json({
    status: 'error',
    message: 'Execution failed',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}

module.exports = {
  handleError
};
