import { motion } from 'framer-motion';

const languageIcons = {
  python: '🐍',
  javascript: '🟨',
  java: '☕',
  cpp: '⚡',
  c: '🔧'
};

export default function LanguageSelector({ language, onLanguageChange, languages }) {
  const toggleLanguage = () => {
    const newLanguage = language === 'python' ? 'java' : 'python';
    onLanguageChange(newLanguage);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-white transition-all duration-200"
    >
      <span className="text-lg">{languageIcons[language] || '📄'}</span>
      <span className="font-medium">{languages[language]?.name || language}</span>
    </motion.button>
  );
}