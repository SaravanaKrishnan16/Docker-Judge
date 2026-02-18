import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';

export default function CodeEditor({ language, code, onChange, isRunning }) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Consolas, monospace',
      lineHeight: 1.6,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      renderWhitespace: 'selection',
      smoothScrolling: false,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: false
    });

    // Add zoom functionality with Ctrl+Scroll
    editor.onMouseWheel((e) => {
      if (e.browserEvent && e.browserEvent.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        const currentFontSize = editor.getOption(monaco.editor.EditorOption.fontSize);
        const delta = e.browserEvent.deltaY > 0 ? -1 : 1;
        const newFontSize = Math.max(8, Math.min(32, currentFontSize + delta));
        editor.updateOptions({ fontSize: newFontSize });
        return;
      }
      // Allow normal scrolling - don't stop propagation for regular scroll
    });

    // Add keyboard shortcuts for zoom
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Equal, () => {
      const currentFontSize = editor.getOption(monaco.editor.EditorOption.fontSize);
      editor.updateOptions({ fontSize: Math.min(32, currentFontSize + 1) });
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Minus, () => {
      const currentFontSize = editor.getOption(monaco.editor.EditorOption.fontSize);
      editor.updateOptions({ fontSize: Math.max(8, currentFontSize - 1) });
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit0, () => {
      editor.updateOptions({ fontSize: 14 });
    });

    // Custom theme
    monaco.editor.defineTheme('dockerjudge-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
        { token: 'keyword', foreground: '8B5CF6' },
        { token: 'string', foreground: '10B981' },
        { token: 'number', foreground: 'F59E0B' },
        { token: 'function', foreground: '3B82F6' }
      ],
      colors: {
        'editor.background': '#1E293B',
        'editor.foreground': '#F1F5F9',
        'editor.lineHighlightBackground': '#334155',
        'editor.selectionBackground': '#475569',
        'editorCursor.foreground': '#8B5CF6',
        'editorLineNumber.foreground': '#64748B',
        'editorLineNumber.activeForeground': '#F1F5F9'
      }
    });

    monaco.editor.setTheme('dockerjudge-dark');
  };

  const getLanguageMode = (lang) => {
    const modes = {
      python: 'python',
      javascript: 'javascript',
      java: 'java',
      cpp: 'cpp'
    };
    return modes[lang] || 'plaintext';
  };

  return (
    <motion.div 
      className="h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigator.clipboard.writeText(code)}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-1.5"
            title="Copy Code"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange('')}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors flex items-center gap-1.5"
            title="Clear Editor"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </motion.button>
        </div>
        <span className="text-sm text-slate-400">main.{language === 'cpp' ? 'cpp' : language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'java'}</span>
      </div>

      {/* Monaco Editor */}
      <div className="h-[calc(100%-3rem)]">
        <Editor
          height="100%"
          language={getLanguageMode(language)}
          value={code}
          onChange={(value) => {
            console.log('Code changed:', value?.substring(0, 50) + '...');
            onChange(value || '');
          }}
          onMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 6,
            contextmenu: true,
            selectOnLineNumbers: true,
            mouseWheelScrollSensitivity: 1,
            fastScrollSensitivity: 5,
            mouseWheelZoom: false,
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
              verticalScrollbarSize: 14,
              horizontalScrollbarSize: 14,
              alwaysConsumeMouseWheel: false
            },
            smoothScrolling: false,
            scrollBeyondLastLine: false,
            padding: { left: 10 }
          }}
        />
      </div>

      {/* Running Overlay */}
      {isRunning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] flex items-center justify-center"
        >
          <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white">Executing...</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}