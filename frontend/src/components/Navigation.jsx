import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CodeBracketIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Platform', href: '/judge', current: location.pathname === '/judge' },
    { name: 'Features', href: '#features', current: false },
    { name: 'Pricing', href: '#pricing', current: false },
    { name: 'Docs', href: '#docs', current: false },
    { name: 'About', href: '#about', current: false },
    { name: 'Contact', href: '#contact', current: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl"
            >
              <CodeBracketIcon className="h-8 w-8 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              CodeForge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-indigo-400 ${
                  item.current ? 'text-indigo-400' : 'text-slate-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/judge"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Launch Platform
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-sm font-medium transition-colors ${
                  item.current ? 'text-indigo-400' : 'text-slate-300 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/judge"
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Launch Platform
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navigation;