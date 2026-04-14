import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

const CopyButton = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: copied ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {copied ? (
          <CheckIcon className="w-4 h-4 text-green-400" />
        ) : (
          <ClipboardIcon className="w-4 h-4 text-slate-300" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default CopyButton;