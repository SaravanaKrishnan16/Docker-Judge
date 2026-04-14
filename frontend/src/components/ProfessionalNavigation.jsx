import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  CodeBracketIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const ProfessionalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Problems',
      href: '/problems'
    },
    {
      name: 'Try Judge',
      href: '/judge'
    }
  ];

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <CodeBracketIcon className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              DockerJudge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center space-x-1 text-slate-300 hover:text-white transition-colors duration-200 py-2"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.dropdown && (
                      <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </motion.div>
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <motion.a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: dropdownIndex * 0.05 }}
                            whileHover={{ x: 5 }}
                            onClick={(e) => {
                              if (dropdownItem.href.startsWith('#')) {
                                e.preventDefault();
                                const element = document.querySelector(dropdownItem.href);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                }
                              }
                              setActiveDropdown(null);
                            }}
                          >
                            {dropdownItem.name}
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}


          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl"
            >
              <div className="py-6 space-y-4">
                {navigationItems.map((item, index) => (
                  <div key={item.name}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <Link
                        to={item.href}
                        className="text-slate-300 hover:text-white transition-colors font-medium"
                        onClick={() => {
                          if (!item.dropdown) setIsOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <button
                          onClick={() => handleDropdown(index)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <ChevronDownIcon 
                            className={`h-4 w-4 transition-transform duration-200 ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                      )}
                    </motion.div>

                    {/* Mobile Dropdown */}
                    <AnimatePresence>
                      {item.dropdown && activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 ml-4 space-y-2"
                        >
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <motion.a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block py-2 text-slate-400 hover:text-white transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dropdownIndex * 0.05 }}
                              onClick={(e) => {
                                if (dropdownItem.href.startsWith('#')) {
                                  e.preventDefault();
                                  const element = document.querySelector(dropdownItem.href);
                                  if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }
                                setIsOpen(false);
                              }}
                            >
                              {dropdownItem.name}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}


              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default ProfessionalNavigation;