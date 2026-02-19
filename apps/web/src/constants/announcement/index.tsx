export const CalendarIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-4 w-4 ${className}`}
    aria-hidden="true"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="17"
      rx="3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 2v4M16 2v4M3 9h18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
