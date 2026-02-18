/**
 * API Integration Layer
 * Handles all communication with DockerJudge backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Execute code on the backend
 * @param {string} language - Language (python, java, cpp)
 * @param {string} code - Source code to execute
 * @param {string} input - Optional stdin input
 * @returns {Promise<Object>} Execution result
 */
export async function executeCode(language, code, input = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: language.toLowerCase(),
        code: code,
        input: input
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      status: 'error',
      error: error.message,
      output: '',
      executionTimeMs: 0,
      memoryKb: 0
    };
  }
}

/**
 * Get all problems
 * @returns {Promise<Array>} List of problems
 */
export async function getProblems() {
  try {
    const response = await fetch(`${API_BASE_URL}/problems`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch problems:', error);
    return [];
  }
}

/**
 * Get single problem by ID
 * @param {string} problemId - Problem ID
 * @returns {Promise<Object|null>} Problem data or null if not found
 */
export async function getProblem(problemId) {
  try {
    const response = await fetch(`${API_BASE_URL}/problems/${problemId}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch problem:', error);
    return null;
  }
}

/**
 * Check backend health
 * @returns {Promise<boolean>} True if backend is healthy
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET'
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

export const DEFAULT_CODE_TEMPLATES = {
  python: `# DockerJudge - Python Executor
print("Hello from Python!")

# Simple calculation
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
average = total / len(numbers)

print(f"Sum: {total}")
print(f"Average: {average}")
`,
  java: `// DockerJudge - Java Executor
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        
        // Simple calculation
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        
        System.out.println("Sum: " + sum);
    }
}
`
};
