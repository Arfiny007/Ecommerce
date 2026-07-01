"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BOUTIQUE_ADDRESS } from "@/constants/checkout";
import { supportEmail } from "@/constants/branding";
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
            Complimentary standard shipping on orders over{" "}
            {formatPrice(FREE_SHIPPING_THRESHOLD)}. Express and overnight options
            available at checkout. 30-day returns on unworn items with original
            tags.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="boutique">
          <AccordionTrigger>Boutique Pickup</AccordionTrigger>
          <AccordionContent>
            Collect your order from our flagship at {BOUTIQUE_ADDRESS}. You will
            receive a notification when your pieces are ready.
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
            .
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
