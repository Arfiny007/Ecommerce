import { socialLinks } from "@/constants/branding";

interface SocialIconProps {
  className?: string;
}

export function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.17 2.53 7.75 6.14 9.26-.09-.79-.17-2.01.04-2.88.18-.77 1.17-4.97 1.17-4.97s-.3-.6-.3-1.49c0-1.39.81-2.43 1.81-2.43.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.35-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.88 3.14-4.59 0-2.4-1.72-4.08-4.18-4.08-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.79.75 2.29a.3.3 0 01.07.29c-.08.33-.25 1.04-.29 1.18-.04.19-.16.23-.37.14-1.38-.64-2.24-2.66-2.24-4.29 0-3.49 2.53-6.7 7.3-6.7 3.83 0 6.81 2.73 6.81 6.38 0 3.81-2.4 6.88-5.74 6.88-1.12 0-2.18-.58-2.54-1.27l-.69 2.63c-.25.96-.93 2.16-1.39 2.89 1.05.32 2.16.5 3.31.5 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

export function TwitterIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TikTokIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

export const SOCIAL_ICONS = [
  { key: "instagram" as const, label: "Instagram", Icon: InstagramIcon, href: socialLinks.instagram },
  { key: "pinterest" as const, label: "Pinterest", Icon: PinterestIcon, href: socialLinks.pinterest },
  { key: "twitter" as const, label: "X (Twitter)", Icon: TwitterIcon, href: socialLinks.twitter },
  { key: "tiktok" as const, label: "TikTok", Icon: TikTokIcon, href: socialLinks.tiktok },
] as const;
