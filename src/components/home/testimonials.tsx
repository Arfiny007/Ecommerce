"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { newsletter } from "@/constants/branding";
import { Section } from "@/components/common/section";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";
import { Surface } from "@/components/common/surface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TESTIMONIALS = [
  {
    quote:
      "The quality is extraordinary. Every piece feels like it was made specifically for me.",
    author: "Elena M.",
    location: "Milan",
  },
  {
    quote:
      "Finally, a brand that understands that true luxury lies in simplicity and craft.",
    author: "James R.",
    location: "London",
  },
  {
    quote:
      "My wardrobe has been transformed. These are investment pieces I'll cherish for decades.",
    author: "Sofia L.",
    location: "New York",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <Section eyebrow="Testimonials" title="What Our Clients Say">
      <MotionStagger className="grid gap-[var(--grid-gap)] md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <MotionItem key={index}>
            <button
              onClick={() => setActive(index)}
              className="w-full text-left"
            >
              <Surface
                variant={active === index ? "elevated" : "bordered"}
                rounded="2xl"
                padding="lg"
                className={
                  active === index
                    ? "border-foreground shadow-elevated"
                    : "hover:border-foreground/20"
                }
              >
                <p className="font-display text-lg font-light leading-[var(--leading-relaxed)] italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </Surface>
            </button>
          </MotionItem>
        ))}
      </MotionStagger>
    </Section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Section
      className="border-t border-border-subtle"
      headerAlign="center"
      eyebrow="Stay Connected"
      title={newsletter.heading}
      description={newsletter.description}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (email.trim()) {
            setSubscribed(true);
            setEmail("");
          }
        }}
        className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={newsletter.placeholder}
          required
          className="flex-1"
        />
        <Button type="submit" variant="cta" size="lg">
          Subscribe
        </Button>
      </form>
      {subscribed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          {newsletter.successMessage}
        </motion.p>
      )}
    </Section>
  );
}
