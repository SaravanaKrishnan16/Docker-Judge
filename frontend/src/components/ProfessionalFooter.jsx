import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { CodeBracketIcon, HeartIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const { theme } = useTheme();
  
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Code Judge', href: '/judge' },
        { name: 'Problems', href: '/problems' },
        { name: 'Python Support', href: '/judge' },
        { name: 'Java Support', href: '/judge' }
      ]
    },
    {
      title: 'About Platform',
      links: [
        { name: 'Docker-based Execution', href: '#' },
        { name: 'Secure Code Sandboxing', href: '#' },
        { name: 'Real-time Judging', href: '#' },
        { name: 'Multi-language Support', href: '#' }
      ]
    },
    {
      title: 'Features',
      links: [
        { name: 'Isolated Containers', href: '#' },
        { name: 'Performance Metrics', href: '#' },
        { name: 'Instant Feedback', href: '#' },
        { name: 'Algorithm Practice', href: '#' }
      ]
    }
  ];

  return (
    <footer className={`relative z-10 border-t ${
      theme === 'dark' 
        ? 'bg-slate-950 border-slate-800' 
        : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <motion.div 
                className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <CodeBracketIcon className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DockerJudge
              </span>
            </Link>
            <p className={`mb-6 leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}>
              Advanced online code judge platform for mastering algorithms and data structures. Execute, learn, and excel in your coding journey.
            </p>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className={`font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className={`transition-colors duration-200 ${
                        theme === 'dark' 
                          ? 'text-slate-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center ${
          theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
        }`}>
          <div className={`text-sm mb-4 md:mb-0 flex items-center ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>
            © 2026 DockerJudge. Developed by 
            <a 
              href="https://www.linkedin.com/in/saravana-krishnan-j-3a7080299/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`mx-1 transition-colors ${
                theme === 'dark' 
                  ? 'text-indigo-400 hover:text-indigo-300'
                  : 'text-indigo-600 hover:text-indigo-500'
              }`}
            >
              Saravana Krishnan J
            </a>
            with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mx-1"
            >
              <HeartIcon className="w-4 h-4 text-red-500" />
            </motion.span>
            for developers
          </div>
          <div className="flex space-x-6 text-sm">
            <motion.a 
              href="#" 
              whileHover={{ y: -2 }}
              className={`transition-colors ${
                theme === 'dark' 
                  ? 'text-slate-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ y: -2 }}
              className={`transition-colors ${
                theme === 'dark' 
                  ? 'text-slate-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;