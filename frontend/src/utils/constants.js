// Animation variants for consistent motion design
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Language configurations
export const LANGUAGES = {
  python: { name: 'Python', extension: 'py', monaco: 'python' },
  javascript: { name: 'JavaScript', extension: 'js', monaco: 'javascript' },
  java: { name: 'Java', extension: 'java', monaco: 'java' },
  cpp: { name: 'C++', extension: 'cpp', monaco: 'cpp' },
  c: { name: 'C', extension: 'c', monaco: 'c' }
};

// Status colors
export const STATUS_COLORS = {
  idle: 'bg-slate-600',
  running: 'bg-yellow-500',
  success: 'bg-green-500',
  error: 'bg-red-500',
  timeout: 'bg-purple-500'
};

// Utility functions
export const formatTime = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

export const formatMemory = (bytes) => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};