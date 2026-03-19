import React from 'react';
import './ScoreGauge.css';

const ScoreGauge = ({ score, size = 200 }) => {
  const radius = (size / 2) - 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 90) return '#a78bfa';
    if (s >= 75) return '#fbbf24';
    if (s >= 60) return '#3b82f6';
    if (s >= 40) return '#f97316';
    return '#ef4444';
  };

  const color = getColor(score);

  return (
    <div className="gauge-wrapper" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14"
        />

        {/* Score arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />

        {/* Score text */}
        <text x={size / 2} y={size / 2 - 8} textAnchor="middle" fill={color}
          fontSize={size * 0.18} fontWeight="700" fontFamily="Inter, sans-serif">
          {score}
        </text>
        <text x={size / 2} y={size / 2 + 16} textAnchor="middle" fill="#64748b"
          fontSize={size * 0.07} fontFamily="Inter, sans-serif">
          / 100
        </text>
      </svg>
    </div>
  );
};

export default ScoreGauge;
