"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { SITE_NAME, SOCIAL_LINKS } from "@/constants/site";
import { FOOTER_NAV } from "@/constants/navigation";
import { Container } from "@/components/common/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/common/marquee";

const GALLERY_IMAGES = [
  "photo-1469334031218-e382a71b716b",
  "photo-1483985988355-763728e1935b",
  "photo-1490481651871-ab68de25d43d",
  "photo-1445205170230-053b83016050",
  "photo-1558618666-fcd25c85f82e",
  "photo-1515886657613-9f3515b0c78f",
].map(
  (id) => `https://images.unsplash.com/${id}?w=400&q=80&auto=format&fit=crop`
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="overflow-hidden border-b border-border py-6">
        <Marquee speed={40}>
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={i}
              className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-muted"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </Marquee>
      </div>

      <Container className="py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="font-display text-3xl font-light tracking-[0.2em]"
            >
              {SITE_NAME}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Curated luxury for those who appreciate the art of considered living.
            </p>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Camera className="h-4 w-4" />
              Follow us
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {Object.entries(FOOTER_NAV).map(([key, links]) => (
              <div key={key}>
                <h4 className="text-xs font-medium uppercase tracking-[0.15em]">
                  {key}
                </h4>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-medium uppercase tracking-[0.15em]">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-muted-foreground">
              Be the first to discover new collections and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" variant="luxury" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-muted-foreground"
              >
                Thank you for subscribing.
              </motion.p>
            )}
          </div>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
