import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Resizable } from 're-resizable';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import StatusBadge from './StatusBadge';
import OutputPanel from './OutputPanel';
import InputPanel from './InputPanel';
import RunButton from './RunButton';
import ExecutionHistory from './ExecutionHistory';
import SettingsModal from './SettingsModal';
import FloatingActionBar from './FloatingActionBar';
import MetricsPanel from './MetricsPanel';
import AnimatedTabs from './AnimatedTabs';
import ResponsiveLayout from './ResponsiveLayout';
import { useJudge } from '../contexts/JudgeContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { LANGUAGES } from '../utils/constants';

const JudgeInterface = () => {
  const [activeTab, setActiveTab] = useState('output');
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [editorWidth, setEditorWidth] = useState('50%');
  
  const { 
    code, 
    setCode, 
    language, 
    setLanguage, 
    input, 
    setInput, 
    output, 
    status, 
    metrics,
    executeCode,
    clearOutput 
  } = useJudge();

  useKeyboardShortcuts({
    'ctrl+enter': executeCode,
    'ctrl+shift+c': clearOutput,
    'ctrl+,': () => setShowSettings(true),
    'ctrl+h': () => setShowHistory(!showHistory)
  });

  const tabs = [
    { id: 'input', label: 'Input', count: input.split('\\n').length },
    { id: 'output', label: 'Output', count: output.split('\\n').length },
    { id: 'errors', label: 'Errors', count: 0 },
    { id: 'metrics', label: 'Metrics', count: Object.keys(metrics).length }
  ];

  return (
    <ResponsiveLayout>
      <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                CodeJudge
              </h1>
              <StatusBadge status={status} />
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                language={language} 
                onLanguageChange={setLanguage}
                languages={LANGUAGES}
              />
              <RunButton 
                onClick={executeCode} 
                isRunning={status === 'running'} 
              />
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Code Editor */}
          <Resizable
            size={{ width: editorWidth, height: '100%' }}
            onResizeStop={(e, direction, ref, d) => {
              setEditorWidth(ref.style.width);
            }}
            minWidth="30%"
            maxWidth="70%"
            enable={{ right: true }}
            handleStyles={{
              right: {
                background: 'linear-gradient(to bottom, #475569, #334155)',
                width: '4px',
                cursor: 'col-resize'
              }
            }}
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-slate-900 border-r border-slate-800"
            >
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language={language}
                    status={status}
                  />
                </div>
              </div>
            </motion.div>
          </Resizable>

          {/* Right Panel - Input/Output */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex flex-col bg-slate-950"
          >
            {/* Tabs */}
            <AnimatedTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'input' && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <InputPanel value={input} onChange={setInput} />
                  </motion.div>
                )}

                {activeTab === 'output' && (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <OutputPanel 
                      output={output} 
                      status={status}
                      isStreaming={status === 'running'}
                    />
                  </motion.div>
                )}

                {activeTab === 'errors' && (
                  <motion.div
                    key="errors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full p-6"
                  >
                    <div className="text-slate-400 text-center mt-20">
                      No errors to display
                    </div>
                  </motion.div>
                )}

                {activeTab === 'metrics' && (
                  <motion.div
                    key="metrics"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <MetricsPanel metrics={metrics} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Floating Action Bar */}
        <FloatingActionBar
          onSettings={() => setShowSettings(true)}
          onHistory={() => setShowHistory(!showHistory)}
          onClear={clearOutput}
        />

        {/* Execution History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-slate-900 border-l border-slate-800 z-40"
            >
              <ExecutionHistory onClose={() => setShowHistory(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Modal */}
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </div>
    </ResponsiveLayout>
  );
};

export default JudgeInterface;