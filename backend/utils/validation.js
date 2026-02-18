/**
 * Request Validation Utility
 */

const LIMITS = require('../config/limits');

/**
 * Validate execute request
 * @param {Object} body - Request body
 * @returns {Object} {valid: boolean, message: string}
 */
function validateRequest(body) {
  // Check if body exists
  if (!body) {
    return { valid: false, message: 'Request body is required' };
  }

  const { language, code } = body;

  // Validate language
  if (!language) {
    return { valid: false, message: 'Language is required' };
  }

  if (!LIMITS.SUPPORTED_LANGUAGES.includes(language.toLowerCase())) {
    return {
      valid: false,
      message: `Unsupported language: ${language}. Supported: ${LIMITS.SUPPORTED_LANGUAGES.join(', ')}`
    };
  }

  // Validate code
  if (!code) {
    return { valid: false, message: 'Code is required' };
  }

  if (typeof code !== 'string') {
    return { valid: false, message: 'Code must be a string' };
  }

  if (code.length > LIMITS.CODE_SIZE_LIMIT_BYTES) {
    return {
      valid: false,
      message: `Code size exceeds limit: ${code.length} > ${LIMITS.CODE_SIZE_LIMIT_BYTES} bytes`
    };
  }

  if (code.trim().length === 0) {
    return { valid: false, message: 'Code cannot be empty' };
  }

  return { valid: true };
}

module.exports = {
  validateRequest
};
