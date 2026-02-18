import { motion } from 'framer-motion';
import { Clock, Zap, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const MetricsPanel = ({ metrics }) => {
  const [animatedValues, setAnimatedValues] = useState({
    executionTime: 0,
    memoryUsage: 0
  });

  useEffect(() => {
    if (metrics) {
      const duration = 1000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setAnimatedValues({
          executionTime: Math.round((metrics.executionTime || 0) * progress * 100) / 100,
          memoryUsage: Math.round((metrics.memoryUsage || 0) * progress * 100) / 100
        });

        if (step >= steps) {
          clearInterval(interval);
          setAnimatedValues({
            executionTime: metrics.executionTime || 0,
            memoryUsage: metrics.memoryUsage || 0
          });
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [metrics]);

  if (!metrics) {
    return (
      <div className="p-4 text-center text-slate-400">
        No metrics available
      </div>
    );
  }

  const metricsData = [
    {
      icon: Clock,
      label: 'Execution Time',
      value: `${animatedValues.executionTime}ms`,
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      label: 'Memory Usage',
      value: `${animatedValues.memoryUsage}MB`,
      color: 'text-purple-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 mb-4"
    >
      <div className="grid grid-cols-2 gap-4">
        {metricsData.map(({ icon: Icon, label, value, color }, index) => (
          <motion.div
            key={label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className={`text-lg font-mono font-bold ${color}`}>
              {value}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MetricsPanel;