import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const PageNavigation = ({ showBack = true }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`fixed top-4 left-4 z-50 flex items-center space-x-3`}
    >
      {/* Back button */}
      {showBack && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          className={`p-2 rounded-lg backdrop-blur-xl transition-colors ${
            theme === 'dark'
              ? 'bg-slate-900/80 hover:bg-slate-800 text-gray-300 hover:text-white border border-slate-700'
              : 'bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200'
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </motion.button>
      )}

      {/* Docker Judge Logo */}
      <Link to="/" className="flex items-center space-x-2 group">
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center backdrop-blur-xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white font-bold text-sm">DJ</span>
        </motion.div>
        <span className={`text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
          DockerJudge
        </span>
      </Link>
    </motion.div>
  );
};

export default PageNavigation;