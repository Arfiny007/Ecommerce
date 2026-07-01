"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const SUBJECTS = [
  "Order Inquiry",
  "Returns & Exchanges",
  "Styling Appointment",
  "Press & Partnerships",
  "General",
] as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[var(--radius-2xl)] border border-border-subtle bg-surface-elevated p-8 text-center"
      >
        <p className="font-display text-xl font-light">Message Received</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you for reaching out. A client advisor will respond within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-xs font-medium uppercase tracking-editorial">
            First Name
          </label>
          <Input id="firstName" required />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-xs font-medium uppercase tracking-editorial">
            Last Name
          </label>
          <Input id="lastName" required />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-editorial">
          Email
        </label>
        <Input id="email" type="email" required />
      </div>
      <div>
        <label htmlFor="subject" className="mb-2 block text-xs font-medium uppercase tracking-editorial">
          Subject
        </label>
        <select
          id="subject"
          required
          className="flex h-11 w-full rounded-[var(--radius-xl)] border border-input bg-surface px-4 text-sm shadow-subtle transition-luxury hover:border-border focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-editorial">
          Message
        </label>
        <Textarea id="message" rows={5} required />
      </div>
      <Button type="submit" variant="luxury">
        Send Message
      </Button>
    </form>
  );
}
