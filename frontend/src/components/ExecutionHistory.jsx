import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export default function ExecutionHistory({ history, onSelectExecution }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-full"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Recent Executions</h3>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {history.map((execution, index) => (
            <motion.div
              key={execution.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
              onClick={() => {}}
              className="p-3 rounded-lg border border-slate-700/50 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">
                  {execution.language}
                </span>
                <div className="flex items-center gap-2">
                  <StatusBadge status={execution.status} />
                  <span className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(execution.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-slate-400 font-mono truncate">
                {execution.code.slice(0, 50)}...
              </div>
              
              {execution.executionTime && (
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-blue-400">{execution.executionTime}ms</span>
                  {execution.memoryUsed && (
                    <span className="text-purple-400">{execution.memoryUsed}MB</span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-slate-500"
          >
            No executions yet. Run some code to see history!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const config = {
    SUCCESS: { color: 'bg-green-500', text: '✓' },
    ERROR: { color: 'bg-red-500', text: '✗' },
    TLE: { color: 'bg-purple-500', text: '⏱' }
  };
  
  const { color, text } = config[status] || { color: 'bg-slate-500', text: '?' };
  
  return (
    <div className={`w-5 h-5 rounded-full ${color} flex items-center justify-center text-xs text-white`}>
      {text}
    </div>
  );
}