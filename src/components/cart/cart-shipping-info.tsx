"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BOUTIQUE_ADDRESS } from "@/constants/checkout";
import { supportEmail } from "@/constants/branding";
import { SHIPPING_POLICY, RETURNS_POLICY } from "@/constants/content/policies";
import { FREE_SHIPPING_THRESHOLD } from "@/constants/site";
import { formatPrice } from "@/lib/utils";

export function CartShippingInfo() {
  return (
    <section aria-labelledby="shipping-info-heading" className="mt-12">
      <h2
        id="shipping-info-heading"
        className="mb-4 font-display text-xl font-light"
      >
        Shipping Information
      </h2>
      <Accordion type="single" collapsible className="rounded-[var(--radius-xl)] border border-border-subtle px-4">
        <AccordionItem value="delivery">
          <AccordionTrigger>Delivery &amp; Returns</AccordionTrigger>
          <AccordionContent>
            {SHIPPING_POLICY.sections[0].body}{" "}
            {RETURNS_POLICY.sections[0].body}{" "}
            <Link href="/shipping" className="underline underline-offset-4 hover:text-foreground">
              Full shipping policy
            </Link>
            {" · "}
            <Link href="/returns" className="underline underline-offset-4 hover:text-foreground">
              Returns policy
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="boutique">
          <AccordionTrigger>Boutique Pickup</AccordionTrigger>
          <AccordionContent>
            Collect your order from our flagship at {BOUTIQUE_ADDRESS}. You will
            receive a notification when your pieces are ready — typically within
            24 hours.{" "}
            <Link href="/stores" className="underline underline-offset-4 hover:text-foreground">
              View all boutiques
            </Link>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="threshold">
          <AccordionTrigger>Complimentary Shipping</AccordionTrigger>
          <AccordionContent>
            Complimentary standard shipping on orders over{" "}
            {formatPrice(FREE_SHIPPING_THRESHOLD)}. Express delivery available
            at checkout.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="contact">
          <AccordionTrigger>Need assistance?</AccordionTrigger>
          <AccordionContent>
            Our client advisors are available at{" "}
            <a
              href={`mailto:${supportEmail}`}
              className="underline underline-offset-4 transition-luxury hover:text-foreground"
            >
              {supportEmail}
            </a>
            .{" "}
            <Link href="/support" className="underline underline-offset-4 hover:text-foreground">
              Client Services
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
