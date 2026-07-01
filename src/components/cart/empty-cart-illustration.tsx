function EmptyCartIllustration() {
  return (
    <svg
      viewBox="0 0 200 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-36 w-44 text-muted-foreground/35"
      aria-hidden
    >
      <path
        d="M55 55h90l-8 75H63L55 55z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M70 55V45a30 30 0 0160 0v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="85" cy="105" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="115" cy="105" r="3" fill="currentColor" opacity="0.4" />
      <path
        d="M95 120c5 8 15 8 20 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M30 75c8-12 24-12 32 0M138 75c8-12 24-12 32 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.3"
      />
      <rect
        x="75"
        y="25"
        width="50"
        height="6"
        rx="3"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
    </svg>
  );
}

export { EmptyCartIllustration };
