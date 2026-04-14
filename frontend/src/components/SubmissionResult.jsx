import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { CheckCircleIcon, XCircleIcon, ClockIcon, ExclamationTriangleIcon, CpuChipIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const verdictConfig = {
  'ACCEPTED': {
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    gradient: 'from-emerald-400 to-green-500',
    icon: CheckCircleIcon,
    message: '🎉 Congratulations! Your solution is correct and efficient.'
  },
  'WRONG ANSWER': {
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-pink-500',
    icon: XCircleIcon,
    message: '❌ Your solution produces incorrect output. Check your logic and try again.'
  },
  'TIME LIMIT EXCEEDED': {
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    gradient: 'from-amber-400 to-orange-500',
    icon: ClockIcon,
    message: '⏱️ Your solution is too slow. Try optimizing your algorithm.'
  },
  'RUNTIME ERROR': {
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-pink-500',
    icon: ExclamationTriangleIcon,
    message: '💥 Your solution crashed during execution. Check for runtime errors.'
  },
  'COMPILE ERROR': {
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-pink-500',
    icon: ExclamationTriangleIcon,
    message: '🔧 Your code failed to compile. Fix syntax errors and try again.'
  },
  'ERROR': {
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-pink-500',
    icon: ExclamationTriangleIcon,
    message: '⚠️ An error occurred during submission. Please try again.'
  }
};

function SubmissionResult({ result }) {
  const { theme } = useTheme();
  const config = verdictConfig[result.verdict] || verdictConfig['ERROR'];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="p-6"
    >
      {/* Main Result Card */}
      <motion.div 
        className={`relative rounded-2xl border-2 backdrop-blur-xl overflow-hidden ${
          config.bgColor
        } ${
          config.borderColor
        }`}
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-5`} />
        
        <div className="relative z-10 p-8">
          {/* Header with Icon and Verdict */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className={`p-3 rounded-2xl bg-gradient-to-r ${config.gradient} shadow-lg`}
                animate={{ 
                  rotate: result.verdict === 'ACCEPTED' ? [0, 360] : [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: result.verdict === 'ACCEPTED' ? 0.6 : 0.4 },
                  scale: { duration: 0.3 }
                }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <div>
                <motion.h3 
                  className={`text-2xl font-bold ${config.color}`}
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(0,0,0,0)',
                      '0 0 10px rgba(0,0,0,0.3)',
                      '0 0 0px rgba(0,0,0,0)'
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {result.verdict}
                </motion.h3>
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Submission Result
                </p>
              </div>
            </div>
            
            {/* Success Rate Badge */}
            {result.passed !== undefined && result.total !== undefined && (
              <motion.div
                className={`px-4 py-2 rounded-xl font-bold text-lg ${
                  result.passed === result.total 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                {result.passed}/{result.total}
              </motion.div>
            )}
          </motion.div>
          
          {/* Message */}
          <motion.div
            className={`mb-6 p-4 rounded-xl backdrop-blur-sm ${
              theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/70'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {config.message}
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {/* Test Cases */}
            {result.passed !== undefined && result.total !== undefined && (
              <motion.div
                className={`p-4 rounded-xl backdrop-blur-sm border ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-white/70 border-gray-200/50'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <DocumentTextIcon className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Test Cases
                  </span>
                </div>
                <div className={`text-2xl font-bold ${
                  result.passed === result.total ? config.color : 'text-red-500'
                }`}>
                  {result.passed} / {result.total}
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {((result.passed / result.total) * 100).toFixed(1)}% passed
                </div>
              </motion.div>
            )}
            
            {/* Runtime */}
            {result.time_ms !== undefined && (
              <motion.div
                className={`p-4 rounded-xl backdrop-blur-sm border ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-white/70 border-gray-200/50'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <ClockIcon className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Runtime
                  </span>
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {result.time_ms} ms
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Total time{result.max_time_ms ? ` (max: ${result.max_time_ms}ms)` : ''}
                </div>
              </motion.div>
            )}
            
            {/* Memory Usage (if available) */}
            {result.memory_mb !== undefined && (
              <motion.div
                className={`p-4 rounded-xl backdrop-blur-sm border ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-white/70 border-gray-200/50'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <CpuChipIcon className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Memory
                  </span>
                </div>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {result.memory_mb} MB
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Memory used
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Additional Information */}
          <div className="space-y-4">
            {/* Efficiency Analysis */}
            {result.efficiency && (
              <motion.div
                className={`p-4 rounded-xl backdrop-blur-sm border-l-4 ${
                  result.efficiency.type === 'OPTIMAL' 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : result.efficiency.type === 'ACCEPTABLE'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : result.efficiency.type === 'BRUTE_FORCE'
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className={`text-sm font-medium mb-1 ${
                  result.efficiency.type === 'OPTIMAL' 
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : result.efficiency.type === 'ACCEPTABLE'
                    ? 'text-blue-600 dark:text-blue-400'
                    : result.efficiency.type === 'BRUTE_FORCE'
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  Solution Efficiency: {result.efficiency.type.replace('_', ' ')}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {result.efficiency.message}
                </div>
                {result.max_time_ms && (
                  <div className={`text-xs mt-2 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Max execution time: {result.max_time_ms}ms
                  </div>
                )}
              </motion.div>
            )}

            {/* Warnings */}
            {result.warnings && result.warnings.length > 0 && (
              <motion.div
                className={`p-4 rounded-xl backdrop-blur-sm border-l-4 border-yellow-500 ${
                  theme === 'dark' 
                    ? 'bg-yellow-900/20 border-yellow-800' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className={`text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  ⚠️ Performance Tips
                </div>
                {result.warnings.map((warning, index) => (
                  <div key={index} className={`text-sm mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    • {warning}
                  </div>
                ))}
              </motion.div>
            )}
            {/* Failed Test Case */}
            {result.failedTestcase && (
              <motion.div
                className={`p-4 rounded-xl backdrop-blur-sm border-l-4 border-red-500 ${
                  theme === 'dark' 
                    ? 'bg-red-900/20 border-red-800' 
                    : 'bg-red-50 border-red-200'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className={`text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-red-400' : 'text-red-600'
                }`}>
                  Failed Test Case
                </div>
                <div className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Test Case #{result.failedTestcase}
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {result.message && result.message !== config.message && (
              <motion.div
                className={`p-4 rounded-xl backdrop-blur-sm border ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-gray-50/70 border-gray-200/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <div className={`text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Details
                </div>
                <div className={`text-sm font-mono leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {result.message}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SubmissionResult;