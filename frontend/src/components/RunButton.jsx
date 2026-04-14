import { motion } from 'framer-motion';

export default function RunButton({ isRunning, onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isRunning}
      whileHover={!disabled && !isRunning ? { scale: 1.05, boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' } : {}}
      whileTap={!disabled && !isRunning ? { scale: 0.95 } : {}}
      animate={{
        width: isRunning ? '120px' : '100px',
        backgroundColor: isRunning ? '#eab308' : disabled ? '#475569' : '#22c55e'
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-12 rounded-xl font-semibold text-white overflow-hidden disabled:cursor-not-allowed"
    >
      <motion.div
        animate={{ opacity: isRunning ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center gap-2 "
      >
        <span className='pr-1'>▶</span>
        <span>Run</span>
      </motion.div>
      
      <motion.div
        animate={{ opacity: isRunning ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center gap-2"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        />
        Running
      </motion.div>
      
      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: isRunning 
            ? 'linear-gradient(45deg, #eab308, #f59e0b, #eab308)' 
            : 'linear-gradient(45deg, #22c55e, #16a34a, #22c55e)',
          backgroundSize: '200% 200%',
          backgroundPosition: isRunning ? '100% 0%' : '0% 0%'
        }}
        transition={{ duration: 2, repeat: isRunning ? Infinity : 0, ease: 'linear' }}
        className="absolute inset-0 -z-10"
      />
    </motion.button>
  );
}