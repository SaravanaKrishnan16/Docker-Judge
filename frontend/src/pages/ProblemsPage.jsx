import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { getProblems } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import PageNavigation from '../components/PageNavigation';
import { MagnifyingGlassIcon, FunnelIcon, CodeBracketIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const difficultyColors = {
  Easy: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    gradient: 'from-emerald-400 to-green-500'
  },
  Medium: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    gradient: 'from-amber-400 to-orange-500'
  },
  Hard: {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-pink-500'
  }
};

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const data = await getProblems();
      setProblems(data);
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'difficulty':
        const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      case 'difficulty-desc':
        const diffOrderDesc = { 'Easy': 3, 'Medium': 2, 'Hard': 1 };
        return diffOrderDesc[a.difficulty] - diffOrderDesc[b.difficulty];
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <PageNavigation showBack={false} />
      
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 ${
            theme === 'dark' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-blue-300 to-purple-400'
          }`}
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 0.8, 1.1, 1],
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-8 ${
            theme === 'dark' ? 'bg-gradient-to-r from-green-500 to-cyan-500' : 'bg-gradient-to-r from-green-300 to-cyan-400'
          }`}
        />
        <motion.div
          animate={{
            rotate: [0, -360],
            scale: [1, 1.3, 0.9, 1],
            x: [0, 120, -60, 0],
            y: [0, -80, 40, 0]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-6 ${
            theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-purple-300 to-pink-400'
          }`}
        />
        <motion.div
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 0.9, 1],
            x: [0, -100, 50, 0],
            y: [0, 30, -40, 0]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-1/4 left-1/3 w-48 h-48 rounded-full opacity-7 ${
            theme === 'dark' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-amber-300 to-orange-400'
          }`}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-2xl"
          >
            <CodeBracketIcon className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent`}
          >
            Coding Challenges
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Master algorithms, data structures, and problem-solving skills with our curated collection of coding challenges
          </motion.p>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <div className={`text-center p-4 rounded-xl backdrop-blur-sm ${
              theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
            }`}>
              <div className="text-3xl font-bold text-blue-500">{problems.length}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Total Problems</div>
            </div>
            <div className={`text-center p-4 rounded-xl backdrop-blur-sm ${
              theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
            }`}>
              <div className="text-3xl font-bold text-emerald-500">{problems.filter(p => p.difficulty === 'Easy').length}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Easy</div>
            </div>
            <div className={`text-center p-4 rounded-xl backdrop-blur-sm ${
              theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
            }`}>
              <div className="text-3xl font-bold text-amber-500">{problems.filter(p => p.difficulty === 'Medium').length}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Medium</div>
            </div>
            <div className={`text-center p-4 rounded-xl backdrop-blur-sm ${
              theme === 'dark' ? 'bg-white/5' : 'bg-black/5'
            }`}>
              <div className="text-3xl font-bold text-red-500">{problems.filter(p => p.difficulty === 'Hard').length}</div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Hard</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className={`backdrop-blur-xl rounded-2xl p-6 shadow-2xl border ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700/50' 
              : 'bg-white/70 border-gray-200/50'
          }`}>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search problems by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] ${
                    theme === 'dark'
                      ? 'bg-slate-900/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:bg-slate-900/80'
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                />
              </div>
              
              <div className="relative">
                <FunnelIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className={`pl-12 pr-8 py-4 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] min-w-[200px] ${
                    theme === 'dark'
                      ? 'bg-slate-900/50 border-slate-600 text-white focus:border-blue-500 focus:bg-slate-900/80'
                      : 'bg-white/80 border-gray-300 text-gray-900 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                >
                  <option value="All">All Difficulties</option>
                  <option value="Easy">Easy Problems</option>
                  <option value="Medium">Medium Problems</option>
                  <option value="Hard">Hard Problems</option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`pl-4 pr-8 py-4 rounded-xl border-2 transition-all duration-300 focus:scale-[1.02] min-w-[180px] ${
                    theme === 'dark'
                      ? 'bg-slate-900/50 border-slate-600 text-white focus:border-blue-500 focus:bg-slate-900/80'
                      : 'bg-white/80 border-gray-300 text-gray-900 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                >
                  <option value="title">Sort by Title</option>
                  <option value="difficulty">Easy to Hard</option>
                  <option value="difficulty-desc">Hard to Easy</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/problem/${problem.id}`)}
                className={`group cursor-pointer rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 hover:shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600'
                    : 'bg-white/70 border-gray-200/50 hover:bg-white/90 hover:border-gray-300'
                }`}
              >
                {/* Problem Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <motion.h3
                      className={`text-lg font-semibold mb-2 group-hover:text-blue-500 transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {problem.title}
                    </motion.h3>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        difficultyColors[problem.difficulty].text
                      } ${
                        difficultyColors[problem.difficulty].bg
                      } ${
                        difficultyColors[problem.difficulty].border
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${
                        difficultyColors[problem.difficulty].gradient
                      }`} />
                      {problem.difficulty}
                    </motion.div>
                  </div>
                  
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`p-2 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100/50'
                    }`}
                  >
                    <CodeBracketIcon className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`} />
                  </motion.div>
                </div>
                
                {/* Problem Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className={`w-4 h-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <span className={`${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>~30 min</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400'
                    }`} />
                    <span className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>Not Attempted</span>
                  </div>
                </div>
                
                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProblems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`text-center py-20 rounded-2xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-slate-800/30' : 'bg-white/30'
              }`}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                }`}
              >
                <MagnifyingGlassIcon className={`w-8 h-8 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </motion.div>
              <h3 className={`text-xl font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                No problems found
              </h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Try adjusting your search criteria or difficulty filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProblemsPage;