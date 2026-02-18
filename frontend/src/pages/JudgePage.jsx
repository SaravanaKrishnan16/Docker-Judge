import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import { JudgeContext } from '../contexts/JudgeContext';
import CodeEditor from '../components/CodeEditor';
import LanguageSelector from '../components/LanguageSelector';
import RunButton from '../components/RunButton';
import OutputPanel from '../components/OutputPanel';
import InputPanel from '../components/InputPanel';
import StatusBadge from '../components/StatusBadge';
import MetricsPanel from '../components/MetricsPanel';
import ExecutionHistory from '../components/ExecutionHistory';
import AnimatedTabs from '../components/AnimatedTabs';
import ResizablePanels from '../components/ResizablePanels';
import PageNavigation from '../components/PageNavigation';

export default function JudgePage() {
  const { 
    code, setCode, 
    language, setLanguage, 
    input, setInput, 
    output, 
    status, 
    metrics, 
    history, 
    isRunning, 
    runCode 
  } = useContext(JudgeContext);
  const [activeTab, setActiveTab] = useState('output');
  const [inputHeight, setInputHeight] = useState(33);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const container = e.currentTarget.closest('.right-panel');
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const percentage = ((e.clientY - rect.top) / rect.height) * 100;
    const clampedPercentage = Math.max(20, Math.min(70, percentage));
    setInputHeight(clampedPercentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const languages = {
    python: { name: 'Python', extension: 'py' },
    java: { name: 'Java', extension: 'java' }
  };

  const tabs = [
    { id: 'output', label: 'Output', count: output ? 1 : 0 },
    { id: 'metrics', label: 'Metrics', count: metrics ? 1 : 0 },
    { id: 'history', label: 'History', count: history?.length || 0 }
  ];

  return (
    <motion.div 
      className="h-screen bg-slate-950 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageNavigation />
      {/* Header */}
      <div className="h-16 bg-slate-900/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-end px-6">
        <div className="flex items-center gap-4">
          <LanguageSelector 
            language={language}
            onLanguageChange={setLanguage}
            languages={languages}
          />
          <RunButton 
            onClick={runCode} 
            isRunning={isRunning}
            disabled={!code.trim()}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-4rem)]">
        <ResizablePanels
        leftPanel={
          <div className="h-full flex flex-col">
            {/* Code Editor */}
            <div className="flex-1 p-4">
              <CodeEditor 
                language={language}
                code={code}
                onChange={setCode}
                isRunning={isRunning}
              />
            </div>
          </div>
        }
        rightPanel={
          <div className="h-full flex flex-col right-panel" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            {/* Input Panel */}
            <div className="border-b border-slate-800" style={{ height: `${inputHeight}%` }}>
              <InputPanel 
                input={input}
                onInputChange={setInput}
              />
            </div>
            
            {/* Resizer */}
            <div 
              className="h-1 bg-slate-600 hover:bg-blue-500 cursor-row-resize transition-colors duration-200 relative group flex items-center justify-center"
              onMouseDown={handleMouseDown}
            >
              <div className="w-8 h-0.5 bg-slate-400 group-hover:bg-blue-400 transition-colors duration-200"></div>
            </div>
            
            {/* Output Section */}
            <div className="flex flex-col" style={{ height: `${100 - inputHeight}%` }}>
              <AnimatedTabs 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
              
              <div className="flex-1 overflow-hidden">
                {activeTab === 'output' && (
                  <OutputPanel 
                    output={output}
                    isRunning={isRunning}
                    executionTime={metrics?.executionTime}
                    memoryUsed={metrics?.memoryUsed}
                  />
                )}
                {activeTab === 'metrics' && <MetricsPanel metrics={metrics} />}
                {activeTab === 'history' && <ExecutionHistory history={history} />}
              </div>
            </div>
          </div>
        }
      />
      </div>

    </motion.div>
  );
}