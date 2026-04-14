import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { fadeInUp, staggerContainer } from '../utils/constants';
import { CodeBracketIcon, PlayIcon, CpuChipIcon, ShieldCheckIcon, ClockIcon, SparklesIcon, RocketLaunchIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  const { theme } = useTheme();
  
  const stats = [
    { number: '50+', label: 'Problems', icon: <AcademicCapIcon className="w-8 h-8" />, color: 'from-blue-500 to-cyan-500' },
    { number: '2', label: 'Languages', icon: <CodeBracketIcon className="w-8 h-8" />, color: 'from-green-500 to-emerald-500' },
    { number: '30s', label: 'Timeout', icon: <ClockIcon className="w-8 h-8" />, color: 'from-purple-500 to-pink-500' },
    { number: 'Free', label: 'To Use', icon: <SparklesIcon className="w-8 h-8" />, color: 'from-amber-500 to-orange-500' }
  ];

  const features = [
    {
      title: 'Code Judge System',
      description: 'Execute and test your code with our advanced judging system',
      icon: <PlayIcon className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      link: '/judge'
    },
    {
      title: 'Problem Library',
      description: 'Access 50+ curated coding challenges across all difficulty levels',
      icon: <AcademicCapIcon className="w-8 h-8" />,
      gradient: 'from-green-500 to-emerald-500',
      link: '/problems'
    },
    {
      title: 'Secure Execution',
      description: 'Isolated Docker containers ensure safe code execution',
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500',
      link: '/judge'
    },
    {
      title: 'Real-time Feedback',
      description: 'Get instant results with execution metrics and output',
      icon: <CpuChipIcon className="w-8 h-8" />,
      gradient: 'from-red-500 to-rose-500',
      link: '/judge'
    }
  ];
  
  return (
    <div className={`relative min-h-screen overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      
      {/* Animated Background Elements */}
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
      </div>
      
      {/* Hero Section */}
      <motion.section 
        className="relative z-10 pt-32 pb-20 px-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div className="mb-8" variants={fadeInUp}>
            <motion.span 
              className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium border backdrop-blur-xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 text-blue-400 border-blue-500/30' 
                  : 'bg-white/70 text-blue-600 border-blue-300/50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(59, 130, 246, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity },
                scale: { duration: 0.2 },
                y: { duration: 0.2 }
              }}
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Advanced Online Code Judge Platform
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight"
            variants={fadeInUp}
          >
            <motion.span 
              className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Docker
            </motion.span>
            <br />
            <motion.span 
              className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
              whileHover={{ 
                textShadow: theme === 'dark' 
                  ? '0 0 20px rgba(255,255,255,0.5)' 
                  : '0 0 20px rgba(0,0,0,0.3)'
              }}
            >
              Judge
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className={`text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
            }`}
            variants={fadeInUp}
          >
            Master algorithms and data structures with our comprehensive coding platform. 
            <span className="font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {' '}Execute, Learn, Excel.
            </span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            variants={fadeInUp}
          >
            <Link to="/judge">
              <motion.button
                className="group relative px-10 py-5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl text-white font-bold text-lg shadow-2xl overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(99, 102, 241, 0.4)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  backgroundPosition: { duration: 3, repeat: Infinity },
                  scale: { duration: 0.2 },
                  y: { duration: 0.2 }
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                <span className="relative z-10 flex items-center">
                  <PlayIcon className="w-6 h-6 mr-2" />
                  Start Coding Now
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </Link>
            
            <Link to="/problems">
              <motion.button
                className={`px-10 py-5 rounded-2xl font-bold text-lg border-2 backdrop-blur-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-slate-600 text-white hover:bg-slate-800/50 hover:border-slate-500'
                    : 'border-gray-300 text-gray-900 hover:bg-white/70 hover:border-gray-400'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  <AcademicCapIcon className="w-6 h-6 mr-2" />
                  Browse Problems
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
            variants={fadeInUp}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`group relative p-8 rounded-3xl backdrop-blur-xl border overflow-hidden ${
                  theme === 'dark' 
                    ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50' 
                    : 'bg-white/40 border-gray-300/50 hover:bg-white/60'
                }`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                <motion.div 
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
                
                <motion.div 
                  className={`text-3xl lg:text-4xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {stat.number}
                </motion.div>
                
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Features Section */}
      <motion.section 
        id="features"
        className="relative z-10 py-32 px-6"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-20">
            <motion.h2 
              className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </motion.h2>
            <motion.p 
              className={`text-xl lg:text-2xl max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Everything you need to master coding interviews and competitive programming
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <motion.div
                  className={`group relative p-8 rounded-3xl backdrop-blur-xl border cursor-pointer overflow-hidden h-full ${
                    theme === 'dark' 
                      ? 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/60' 
                      : 'bg-white/40 border-gray-300/50 hover:bg-white/70'
                  }`}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -15,
                    rotateX: 5
                  }}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  <motion.div 
                    className={`relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-8 mx-auto`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className={`text-xl lg:text-2xl font-bold mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text transition-all duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`text-center leading-relaxed ${
                    theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                  
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      Explore →
                    </span>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced CTA Section */}
      <motion.section 
        className="relative z-10 py-32 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className={`relative p-16 rounded-[3rem] backdrop-blur-xl border overflow-hidden ${
              theme === 'dark' 
                ? 'bg-slate-800/40 border-slate-700/50' 
                : 'bg-white/50 border-gray-300/50'
            }`}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            />
            
            <div className="relative z-10">
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 mb-8 shadow-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <RocketLaunchIcon className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h2 
                className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                animate={{
                  textShadow: [
                    '0 0 20px rgba(99, 102, 241, 0.3)',
                    '0 0 40px rgba(99, 102, 241, 0.6)',
                    '0 0 20px rgba(99, 102, 241, 0.3)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity
                }}
              >
                Ready to <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Excel</span>?
              </motion.h2>
              
              <motion.p 
                className={`text-xl lg:text-2xl mb-12 max-w-3xl mx-auto ${
                  theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Join thousands of developers mastering algorithms and acing coding interviews with DockerJudge
              </motion.p>
              
              <motion.div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/judge">
                  <motion.button
                    className="group relative px-12 py-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-2xl text-white font-bold text-xl shadow-2xl overflow-hidden"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 30px 60px rgba(99, 102, 241, 0.4)",
                      y: -8
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      backgroundPosition: { duration: 3, repeat: Infinity },
                      scale: { duration: 0.2 },
                      y: { duration: 0.2 }
                    }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      <RocketLaunchIcon className="w-7 h-7 mr-3" />
                      Launch Your Journey
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.button>
                </Link>
                
                <Link to="/problems">
                  <motion.button
                    className={`px-12 py-6 rounded-2xl font-bold text-xl border-2 backdrop-blur-xl transition-all duration-300 ${
                      theme === 'dark'
                        ? 'border-slate-600 text-white hover:bg-slate-800/50 hover:border-slate-500'
                        : 'border-gray-300 text-gray-900 hover:bg-white/70 hover:border-gray-400'
                    }`}
                    whileHover={{ 
                      scale: 1.05,
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      <AcademicCapIcon className="w-7 h-7 mr-3" />
                      Explore Problems
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}