
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MatchScoreCircularProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

const MatchScoreCircular: React.FC<MatchScoreCircularProps> = ({
  score,
  size = 200,
  strokeWidth = 16,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const scoreColor =
    score < 40 ? 'text-red-600' : score < 70 ? 'text-blue-600' : 'text-green-600';
  
  const scoreGradientId = `scoreGradient-${score}`;
  const scoreGradientColor = 
    score < 40 ? '#DC2626' : score < 70 ? '#2563EB' : '#059669';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
            <linearGradient id={scoreGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={scoreGradientColor} stopOpacity="0.5" />
                <stop offset="100%" stopColor={scoreGradientColor} stopOpacity="1" />
            </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${scoreGradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className={`absolute flex flex-col items-center ${scoreColor}`}>
        <motion.span
          className="text-4xl md:text-5xl font-bold tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-base md:text-lg font-medium text-muted-foreground">% Match</span>
      </div>
    </div>
  );
};

export default MatchScoreCircular;
