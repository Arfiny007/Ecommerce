function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-40 w-48 text-muted-foreground/30"
      aria-hidden
    >
      <path
        d="M40 160h160M60 160V80l60-40 60 40v80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="100" y="110" width="40" height="50" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M90 80h60M110 80V60M130 80V60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="180" cy="50" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
      <text
        x="180"
        y="55"
        textAnchor="middle"
        fill="currentColor"
        fontSize="11"
        fontFamily="serif"
        opacity="0.6"
      >
        ?
      </text>
      <path
        d="M30 50c10-8 20-8 30 0M200 140c8-6 16-6 24 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

export { NotFoundIllustration };
