import { motion } from 'framer-motion';

const AnimatedTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-slate-800 bg-slate-900/50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-blue-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-slate-700 rounded-full">
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              initial={false}
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default AnimatedTabs;