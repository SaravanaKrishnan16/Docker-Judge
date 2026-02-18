import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { getProblem } from '../api';
import CodeEditor from '../components/CodeEditor';
import LoadingSpinner from '../components/LoadingSpinner';
import SubmissionResult from '../components/SubmissionResult';
import PageNavigation from '../components/PageNavigation';
import { PlayIcon, CodeBracketIcon, ClockIcon, CpuChipIcon, CheckCircleIcon, XCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const difficultyColors = {
  Easy: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    gradient: 'from-emerald-400 to-green-500',
    glow: 'shadow-emerald-500/25'
  },
  Medium: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/25'
  },
  Hard: {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-pink-500',
    glow: 'shadow-red-500/25'
  }
};

function ProblemDetailPage() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem && problem.templates && problem.templates[language]) {
      setCode(problem.templates[language]);
    }
  }, [problem, language]);

  const fetchProblem = async () => {
    try {
      const data = await getProblem(problemId);
      if (!data) {
        throw new Error('Problem not found');
      }
      setProblem(data);
      if (data.templates && data.templates[language]) {
        setCode(data.templates[language]);
      }
    } catch (error) {
      console.error('Failed to fetch problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) return;
    
    console.log('Submitting code:', { problemId, language, codeLength: code.length });
    
    setSubmitting(true);
    setSubmissionResult(null);
    
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
      
      const response = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId,
          language,
          code,
        }),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Submission failed. Please try again.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // If JSON parsing fails, use default message
          console.error('Failed to parse error response:', e);
        }
        
        setSubmissionResult({
          verdict: 'ERROR',
          message: errorMessage
        });
        return;
      }
      
      const result = await response.json();
      console.log('Submission result:', result);
      
      setSubmissionResult(result);
    } catch (error) {
      console.error('Submission failed:', error);
      let errorMessage = 'Submission failed. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Submission timed out. The solution may be taking too long to execute.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try again.';
      }
      
      setSubmissionResult({
        verdict: 'ERROR',
        message: errorMessage
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <p className="text-gray-500">The requested problem could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <PageNavigation />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-300 to-purple-400'
          }`}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1.1, 1],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-8 ${
            theme === 'dark' ? 'bg-gradient-to-r from-green-500 to-cyan-500' : 'bg-gradient-to-r from-green-300 to-cyan-400'
          }`}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Problem Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <motion.div
                className={`p-3 rounded-2xl bg-gradient-to-r ${difficultyColors[problem.difficulty].gradient}`}
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <CodeBracketIcon className="w-8 h-8 text-white" />
              </motion.div>
              
              <div>
                <motion.h1
                  className={`text-3xl lg:text-4xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(99, 102, 241, 0.3)',
                      '0 0 30px rgba(99, 102, 241, 0.5)',
                      '0 0 20px rgba(99, 102, 241, 0.3)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {problem.title}
                </motion.h1>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border-2 backdrop-blur-xl ${
                    difficultyColors[problem.difficulty].text
                  } ${
                    difficultyColors[problem.difficulty].bg
                  } ${
                    difficultyColors[problem.difficulty].border
                  } shadow-lg ${difficultyColors[problem.difficulty].glow}`}
                >
                  <motion.div 
                    className={`w-3 h-3 rounded-full mr-2 bg-gradient-to-r ${difficultyColors[problem.difficulty].gradient}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {problem.difficulty} Level
                </motion.div>
              </div>
            </div>
            
            {/* Stats */}
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'
              }`}>
                <ClockIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>~30 min</span>
              </div>
              
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'
              }`}>
                <SparklesIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Not Attempted</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem Description Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`h-[calc(100vh-16rem)] rounded-3xl backdrop-blur-xl border overflow-hidden ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}
          >
            <div className="h-full overflow-y-auto">
              <div className="p-8">
                {/* Description */}
                <motion.div className="mb-8">
                  <h3 className={`text-xl font-bold mb-4 flex items-center ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <motion.div
                      className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"
                      animate={{ scaleY: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Problem Description
                  </h3>
                  <div className={`prose max-w-none ${
                    theme === 'dark' ? 'prose-invert' : ''
                  }`}>
                    <p className={`text-lg leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {problem.description}
                    </p>
                  </div>
                </motion.div>

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <h3 className={`text-xl font-bold mb-6 flex items-center ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <motion.div
                        className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      />
                      Examples
                    </h3>
                    <div className="space-y-6">
                      {problem.examples.map((example, index) => (
                        <motion.div
                          key={index}
                          className={`p-6 rounded-2xl border backdrop-blur-sm ${
                            theme === 'dark' 
                              ? 'bg-slate-900/50 border-slate-600/50' 
                              : 'bg-gray-50/80 border-gray-200/50'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="mb-4">
                            <span className={`font-bold text-lg ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>
                              Example {index + 1}:
                            </span>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <span className={`font-semibold text-sm uppercase tracking-wider ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`}>
                                Input:
                              </span>
                              <motion.code 
                                className={`block mt-2 p-3 rounded-lg text-sm font-mono ${
                                  theme === 'dark' 
                                    ? 'bg-slate-800 text-green-400' 
                                    : 'bg-white text-green-700'
                                }`}
                                whileHover={{ scale: 1.01 }}
                              >
                                {example.input}
                              </motion.code>
                            </div>
                            <div>
                              <span className={`font-semibold text-sm uppercase tracking-wider ${
                                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                              }`}>
                                Output:
                              </span>
                              <motion.code 
                                className={`block mt-2 p-3 rounded-lg text-sm font-mono ${
                                  theme === 'dark' 
                                    ? 'bg-slate-800 text-blue-400' 
                                    : 'bg-white text-blue-700'
                                }`}
                                whileHover={{ scale: 1.01 }}
                              >
                                {example.output}
                              </motion.code>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Constraints */}
                {problem.constraints && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <h3 className={`text-xl font-bold mb-4 flex items-center ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      <motion.div
                        className="w-2 h-6 bg-gradient-to-b from-red-500 to-pink-500 rounded-full mr-3"
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      />
                      Constraints
                    </h3>
                    <motion.div 
                      className={`p-6 rounded-2xl border backdrop-blur-sm ${
                        theme === 'dark' 
                          ? 'bg-slate-900/50 border-slate-600/50' 
                          : 'bg-gray-50/80 border-gray-200/50'
                      }`}
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <p className={`font-mono text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {problem.constraints}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Code Editor Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`h-[calc(100vh-16rem)] rounded-3xl backdrop-blur-xl border flex flex-col ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}
          >
            {/* Editor Header */}
            <motion.div 
              className={`p-6 border-b backdrop-blur-xl ${
                theme === 'dark' ? 'border-slate-700/50 bg-slate-900/50' : 'border-gray-200/50 bg-gray-50/50'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                  >
                    <CpuChipIcon className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:scale-105 ${
                        theme === 'dark'
                          ? 'bg-slate-800/80 border-slate-600 text-white focus:border-blue-500'
                          : 'bg-white/80 border-gray-300 text-gray-900 focus:border-blue-500'
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20 font-medium`}
                    >
                      <option value="java">Java</option>
                      <option value="python">Python</option>
                    </select>
                  </motion.div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={submitting || !code.trim()}
                  className={`group relative px-8 py-3 rounded-xl font-bold transition-all duration-300 overflow-hidden ${
                    submitting || !code.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:shadow-2xl'
                  } text-white`}
                  animate={{
                    backgroundPosition: submitting ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%'
                  }}
                  transition={{
                    backgroundPosition: { duration: 2, repeat: submitting ? Infinity : 0 }
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                >
                  <span className="relative z-10 flex items-center">
                    {submitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Running...
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-5 h-5 mr-2" />
                        Submit Solution
                      </>
                    )}
                  </span>
                  {!submitting && !(!code.trim()) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Code Editor Container */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <div className={`flex-1 overflow-hidden ${submissionResult ? 'h-1/2' : 'h-full'}`}>
                <CodeEditor
                  code={code}
                  onChange={setCode}
                  language={language}
                  isRunning={submitting}
                />
              </div>

              {/* Submission Result */}
              <AnimatePresence>
                {submissionResult && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: '50%', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`border-t overflow-hidden ${
                      theme === 'dark' ? 'border-slate-700/50' : 'border-gray-200/50'
                    }`}
                  >
                    <div className="h-full overflow-y-auto">
                      <SubmissionResult result={submissionResult} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetailPage;