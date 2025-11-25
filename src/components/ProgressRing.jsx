import { useId } from 'react';

export function ProgressRing({ percent, size = 44, stroke = 6, className = '' }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = Math.max(0.001, circumference * (percent / 100));
  const gradientId = useId();
  const classes = ['shrink-0 drop-shadow-[0_10px_25px_rgba(16,185,129,0.35)]'];
  if (className) classes.push(className);

  return (
    <svg width={size} height={size} className={classes.join(' ')}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        className="fill-none stroke-white/10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        className="fill-none transition-all duration-500"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        stroke={`url(#${gradientId})`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
