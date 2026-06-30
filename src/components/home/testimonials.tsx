"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/section";
import { Heading, Eyebrow } from "@/components/common/typography";
import { MotionStagger, MotionItem } from "@/components/common/motion-wrapper";

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
    <Section>
      <Eyebrow>Testimonials</Eyebrow>
      <Heading className="mt-3">What Our Clients Say</Heading>

      <MotionStagger className="mt-12 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <MotionItem key={index}>
            <button
              onClick={() => setActive(index)}
              className={`w-full rounded-2xl border p-8 text-left transition-all duration-300 ${
                active === index
                  ? "border-foreground bg-card shadow-lg"
                  : "border-border hover:border-foreground/30"
              }`}
            >
              <p className="font-display text-lg font-light leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6">
                <p className="text-sm font-medium">{testimonial.author}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              </div>
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
    <Section className="border-t border-border">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Stay Connected</Eyebrow>
        <Heading className="mt-4">Join the MAISON Circle</Heading>
        <p className="mt-4 text-muted-foreground">
          Early access to collections, exclusive events, and curated editorial content.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) {
              setSubscribed(true);
              setEmail("");
            }
          }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="h-12 flex-1 rounded-full border border-input bg-transparent px-6 text-sm focus:outline-none focus:ring-2 focus:ring-ring sm:max-w-sm"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-foreground px-8 text-xs font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
        {subscribed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-muted-foreground"
          >
            Welcome to the circle.
          </motion.p>
        )}
      </div>
    </Section>
  );
}
