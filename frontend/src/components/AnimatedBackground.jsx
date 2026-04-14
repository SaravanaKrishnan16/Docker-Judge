import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const AnimatedBackground = () => {
  const { theme } = useTheme();

  return (
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
  );
};

export default AnimatedBackground;