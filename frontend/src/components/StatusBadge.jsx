import { motion } from 'framer-motion';

const statusConfig = {
  idle: { color: 'bg-slate-600', text: 'Ready', icon: '●' },
  running: { color: 'bg-yellow-500', text: 'Running', icon: '⟳' },
  success: { color: 'bg-green-500', text: 'Success', icon: '✓' },
  error: { color: 'bg-red-500', text: 'Error', icon: '✗' }
};

export default function StatusBadge({ status = 'idle' }) {
  const config = statusConfig[status] || statusConfig.idle;
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${config.color}`}
    >
      <motion.span
        animate={status === 'running' ? { rotate: 360 } : {}}
        transition={{ duration: 1, repeat: status === 'running' ? Infinity : 0 }}
      >
        {config.icon}
      </motion.span>
      {config.text}
    </motion.div>
  );
}