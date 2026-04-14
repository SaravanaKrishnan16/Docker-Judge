import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function OutputPanel({ output, isRunning, executionTime, memoryUsed }) {
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    if (output && !isRunning) {
      setDisplayedOutput('');
      let i = 0;
      const timer = setInterval(() => {
        if (i < output.length) {
          setDisplayedOutput(output.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setShowMetrics(true);
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [output, isRunning]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4 rounded-xl">
        <h3 className="text-lg font-semibold text-white">Output</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
          onClick={() => navigator.clipboard.writeText(output)}
        >
          Copy
        </motion.button>
      </div>

      <div className="bg-black/50 rounded-lx p-4 font-mono text-sm min-h-[200px] relative overflow-hidden">
        <AnimatePresence>
          {isRunning ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-yellow-400"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"
              />
              Executing code...
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 whitespace-pre-wrap"
            >
              {displayedOutput}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showMetrics && (executionTime || memoryUsed) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-4 flex gap-4"
          >
            {executionTime && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-2"
              >
                <div className="text-blue-400 text-xs">Execution Time</div>
                <div className="text-white font-mono">{executionTime}ms</div>
              </motion.div>
            )}
            {memoryUsed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-purple-500/20 border border-purple-500/30 rounded-lg px-3 py-2"
              >
                <div className="text-purple-400 text-xs">Memory Used</div>
                <div className="text-white font-mono">{memoryUsed}MB</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}