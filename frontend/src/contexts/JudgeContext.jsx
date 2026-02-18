import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const JudgeContext = createContext();

export { JudgeContext };

export const useJudge = () => {
  const context = useContext(JudgeContext);
  if (!context) {
    throw new Error('useJudge must be used within a JudgeProvider');
  }
  return context;
};

export const JudgeProvider = ({ children }) => {
  const sampleCode = {
    python: 'print("Hello, World!")',
    javascript: 'console.log("Hello, World!");',
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`
  };

  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(sampleCode.python);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('idle');
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLanguage) => {
    console.log('Language change:', language, '->', newLanguage);
    setLanguage(newLanguage);
    setCode(sampleCode[newLanguage] || '');
    setOutput(''); // Clear previous output
    setStatus('idle');
  };

  const runCode = useCallback(async () => {
    console.log('Running code:', { language, code: code.substring(0, 50) + '...', input });
    
    setIsRunning(true);
    setStatus('running');
    setOutput('');
    setMetrics(null);

    try {
      const requestBody = {
        code: code.trim(),
        language,
        input: input.trim(),
      };
      
      console.log('Request body:', requestBody);
      
      const response = await fetch('http://localhost:3000/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      setOutput(result.output || result.error || 'No output');
      setStatus(result.status === 'success' ? 'success' : 'error');
      
      // Parse metrics from API response
      const parsedMetrics = {
        executionTime: result.executionTimeMs || 0,
        memoryUsage: result.memoryKb ? (result.memoryKb / 1024).toFixed(2) : 0
      };
      setMetrics(parsedMetrics);

      // Add to history
      const execution = {
        id: Date.now(),
        code,
        language,
        input,
        output: result.output,
        status: result.status,
        metrics: result.metrics,
        timestamp: new Date().toISOString(),
      };

      setHistory(prev => [execution, ...prev.slice(0, 9)]);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setStatus('error');
    } finally {
      setIsRunning(false);
    }
  }, [code, language, input]);

  const clearEditor = useCallback(() => {
    setCode(sampleCode[language] || '');
    setOutput('');
    setStatus('idle');
    setMetrics(null);
  }, [language, sampleCode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [runCode]);

  const value = {
    code,
    setCode,
    language,
    setLanguage: handleLanguageChange,
    input,
    setInput,
    output,
    setOutput,
    status,
    metrics,
    history,
    isRunning,
    runCode,
    clearEditor,
  };

  return (
    <JudgeContext.Provider value={value}>
      {children}
    </JudgeContext.Provider>
  );
};