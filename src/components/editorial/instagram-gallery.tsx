import Image from "next/image";
import { InstagramIcon } from "@/components/common/social-icons";
import { INSTAGRAM_FEED } from "@/constants/editorial";
import { socialLinks } from "@/constants/branding";

interface InstagramGalleryProps {
  images?: typeof INSTAGRAM_FEED;
  className?: string;
}

export function InstagramGallery({
  images = INSTAGRAM_FEED,
  className,
}: InstagramGalleryProps) {
  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InstagramIcon className="h-4 w-4" aria-hidden />
          <span className="text-sm font-medium">@finyfashions</span>
        </div>
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-editorial text-muted-foreground transition-luxury hover:text-foreground"
        >
          Follow →
        </a>
      </div>
      <div className="grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-3">
        {images.map((item) => (
          <a
            key={item.id}
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-[var(--radius-lg)]"
            aria-label={`FINY FASHIONS on Instagram — image ${item.id}`}
          >
            <Image
              src={`https://images.unsplash.com/${item.image}?w=300&q=80&auto=format&fit=crop`}
              alt=""
              fill
              className="image-hover-zoom-emphasis"
              sizes="120px"
            />
            <div className="absolute inset-0 bg-foreground/0 transition-luxury group-hover:bg-foreground/20" />
          </a>
        ))}
      </div>
    </div>
  );
}
