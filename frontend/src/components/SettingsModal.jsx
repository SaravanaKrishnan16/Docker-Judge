import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function SettingsModal({ isOpen, onClose, settings, onSettingsChange }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 rounded-2xl p-6 w-96 z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </motion.button>
            </div>

            <div className="space-y-6">
              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Editor Theme
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['vs-dark', 'monokai', 'github-dark', 'dracula'].map((theme) => (
                    <motion.button
                      key={theme}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLocalSettings({ ...localSettings, theme })}
                      className={`p-3 rounded-lg border transition-all ${
                        localSettings.theme === theme
                          ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                          : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {theme.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Font Size: {localSettings.fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={localSettings.fontSize}
                  onChange={(e) => setLocalSettings({ ...localSettings, fontSize: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Auto-save */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">
                  Auto-save code
                </label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLocalSettings({ ...localSettings, autoSave: !localSettings.autoSave })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    localSettings.autoSave ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                >
                  <motion.div
                    animate={{ x: localSettings.autoSave ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
                  />
                </motion.button>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 py-2 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}