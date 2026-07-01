function NoResultsIllustration() {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-32 w-40 text-muted-foreground/40"
      aria-hidden
    >
      <rect x="40" y="30" width="80" height="100" rx="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M55 55h50M55 75h35M55 95h45"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="145" cy="115" r="28" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M162 132l14 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M135 108c4-8 16-8 20 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export { NoResultsIllustration };
