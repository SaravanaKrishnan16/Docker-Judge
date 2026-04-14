import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InputPanel({ input, onInputChange }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Input</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
          onClick={() => onInputChange('')}
        >
          Clear
        </motion.button>
      </div>

      <motion.div
        animate={{
          borderColor: isFocused ? '#3b82f6' : '#475569',
          boxShadow: isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none'
        }}
        className="relative rounded-lg overflow-hidden border transition-all duration-200"
      >
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter your input here..."
          className="w-full h-[200px] bg-black/50 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none placeholder-slate-500"
        />
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
        />
      </motion.div>

      <div className="mt-2 text-xs text-slate-400">
        Tip: Use Ctrl+Enter to run your code
      </div>
    </motion.div>
  );
}