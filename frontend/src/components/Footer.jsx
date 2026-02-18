import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Code Judge', href: '/judge' },
        { name: 'Python', href: '/judge' },
        { name: 'Java', href: '/judge' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'GitHub', href: 'https://github.com' },
        { name: 'Documentation', href: '#' },
        { name: 'Examples', href: '#' }
      ]
    }
  ];

  return (
    <footer className="relative z-10 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <CodeBracketIcon className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Docker Judge
              </span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Simple online code judge for Python and Java. 
              Free and open source.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <span className="text-slate-400 hover:text-white text-sm font-medium">
                  GH
                </span>
              </motion.a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © 2024 Docker Judge. Open source project.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="https://github.com" className="text-slate-400 hover:text-white transition-colors">
              View Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;