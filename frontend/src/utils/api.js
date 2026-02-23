const API_BASE = 'http://localhost:8000/api';

export const api = {
  async execute(code, language, input = '') {
    const response = await fetch(`${API_BASE}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language,
        input
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getHistory() {
    const response = await fetch(`${API_BASE}/history`);
    return response.json();
  },

  // LeetCode-style platform APIs
  async getProblems() {
    const response = await fetch(`${API_BASE}/problems`);
    return response.json();
  },

  async getProblem(problemId) {
    const response = await fetch(`${API_BASE}/problems/${problemId}`);
    return response.json();
  },

  async submitSolution(problemId, language, code) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    try {
      const response = await fetch(`${API_BASE}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemId, language, code }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }
};