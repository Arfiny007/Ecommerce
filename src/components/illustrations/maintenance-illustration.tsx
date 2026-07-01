function MaintenanceIllustration() {
  return (
    <svg
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto h-36 w-40 text-muted-foreground/30"
      aria-hidden
    >
      <circle cx="100" cy="90" r="50" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M100 55v10M100 115v10M65 90h10M125 90h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M78 78l7 7M115 115l7 7M122 78l-7 7M85 115l-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <rect
        x="85"
        y="82"
        width="30"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M92 90h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M40 40c6-4 12-4 18 0M150 140c5-3 10-3 15 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
  );
}

export { MaintenanceIllustration };
