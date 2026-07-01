"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Sparkles } from "lucide-react";
import { newsletter } from "@/constants/branding";
import { NEWSLETTER_TRUST } from "@/constants/home-content";
import { Section } from "@/components/common/section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/common/surface";

const TRUST_ICONS = [Sparkles, Mail, Shield];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Section
      spacing="lg"
      containerized={false}
      className="relative overflow-hidden border-t border-border-subtle"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-mesh-light bg-radial-bloom"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-[var(--radius-full)] bg-champagne/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-16 bottom-10 h-48 w-48 rounded-[var(--radius-full)] bg-ivory/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-[var(--container-narrow)] px-[var(--space-5)] text-center sm:px-[var(--space-8)]">
        <p className="text-xs font-medium uppercase tracking-editorial text-muted-foreground">
          Stay Connected
        </p>
        <h2 className="mt-4 font-display text-3xl font-light md:text-4xl">
          {newsletter.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          {newsletter.description}
        </p>

        <Surface
          variant="elevated"
          rounded="3xl"
          padding="lg"
          className="mx-auto mt-10 max-w-lg shadow-luxury"
        >
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) {
                setSubscribed(true);
                setEmail("");
              }
            }}
            animate={{ scale: focused ? 1.01 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={newsletter.placeholder}
              required
              className="flex-1 border-0 bg-surface-muted shadow-none focus-visible:ring-1"
            />
            <Button type="submit" variant="cta" size="lg" className="shrink-0">
              Subscribe
            </Button>
          </motion.form>

          {subscribed && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              {newsletter.successMessage}
            </motion.p>
          )}
        </Surface>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {NEWSLETTER_TRUST.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <li
                key={item}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
