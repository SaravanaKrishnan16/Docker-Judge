import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function ResizablePanels({ leftPanel, rightPanel, direction = 'horizontal', initialSizes = [50, 50] }) {
  const [sizes, setSizes] = useState(initialSizes);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    let percentage;
    if (direction === 'horizontal') {
      percentage = ((e.clientX - rect.left) / rect.width) * 100;
    } else {
      percentage = ((e.clientY - rect.top) / rect.height) * 100;
    }

    percentage = Math.max(20, Math.min(80, percentage));
    setSizes([percentage, 100 - percentage]);
  }, [isDragging, direction]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} h-full w-full`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="relative"
        style={{
          [direction === 'horizontal' ? 'width' : 'height']: `${sizes[0]}%`
        }}
      >
        {leftPanel}
      </div>

      <motion.div
        className={`
          ${direction === 'horizontal' ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'}
          bg-slate-600 hover:bg-blue-500 transition-colors duration-200 relative group
        `}
        onMouseDown={handleMouseDown}
        whileHover={{ scale: direction === 'horizontal' ? [2, 1] : [1, 2] }}
        transition={{ duration: 0.2 }}
      >
        <div className={`
          absolute inset-0 ${direction === 'horizontal' ? 'w-2 -left-0.5' : 'h-2 -top-0.5'}
          ${isDragging ? 'bg-blue-500/20' : 'group-hover:bg-blue-500/10'}
          transition-colors duration-200
        `} />
      </motion.div>

      <div
        className="relative"
        style={{
          [direction === 'horizontal' ? 'width' : 'height']: `${sizes[1]}%`
        }}
      >
        {rightPanel}
      </div>
    </div>
  );
}