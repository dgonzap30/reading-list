export function ProgressRing({ percent, size = 44, stroke = 6, className = '' }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = Math.max(0.001, circumference * (percent / 100));
  const classes = ['shrink-0'];
  if (className) classes.push(className);

  return (
    <svg width={size} height={size} className={classes.join(' ')}>
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
        className="fill-none stroke-emerald-400 transition-all duration-500"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
