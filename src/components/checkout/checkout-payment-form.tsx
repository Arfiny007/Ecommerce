"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { MOCK_SAVED_CARDS } from "@/constants/checkout";
import {
  formatCardNumber,
  formatExpiry,
  isValidCardNumber,
  isValidCvv,
  isValidExpiry,
} from "@/lib/form-utils";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp } from "@/lib/animations";
import type { PaymentMethodId } from "@/constants/checkout";

export function CheckoutPaymentForm() {
  const { paymentMethodId, setPaymentMethod } = useCheckoutPreferences();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    MOCK_SAVED_CARDS.find((c) => c.isDefault)?.id ?? null
  );
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const reducedMotion = useReducedMotion();

  const showCardForm =
    paymentMethodId === "card" && !selectedCardId;

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeInUp}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      className="space-y-6"
    >
      <PaymentMethodSelector
        selected={paymentMethodId}
        onSelect={(id: PaymentMethodId) => {
          setPaymentMethod(id);
          if (id !== "card") setSelectedCardId(null);
        }}
        savedCards={MOCK_SAVED_CARDS}
        selectedCardId={selectedCardId}
        onSelectCard={(id) => {
          setSelectedCardId(id);
          setCardNumber("");
          setExpiry("");
          setCvv("");
        }}
      />

      {paymentMethodId === "card" && (
        <div className="space-y-4 border-t border-border-subtle pt-6">
          {!selectedCardId && (
            <button
              type="button"
              onClick={() => setSelectedCardId(null)}
              className="text-xs uppercase tracking-[0.12em] text-muted-foreground transition-luxury hover:text-foreground"
            >
              Use a new card
            </button>
          )}

          {showCardForm && (
            <div className="space-y-4">
              <FloatingLabelInput
                label="Name on card"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="cc-name"
                success={name.length > 2}
              />
              <FloatingLabelInput
                label="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                inputMode="numeric"
                autoComplete="cc-number"
                success={isValidCardNumber(cardNumber)}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingLabelInput
                  label="Expiry (MM/YY)"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  autoComplete="cc-exp"
                  success={isValidExpiry(expiry)}
                />
                <FloatingLabelInput
                  label="CVV"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  success={isValidCvv(cvv)}
                />
              </div>
            </div>
          )}

          {selectedCardId && (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Paying with saved{" "}
              {MOCK_SAVED_CARDS.find((c) => c.id === selectedCardId)?.brand} card
            </p>
          )}
        </div>
      )}

      {paymentMethodId === "apple-pay" && (
        <p className="rounded-[var(--radius-xl)] border border-border-subtle px-4 py-6 text-center text-sm text-muted-foreground">
          Apple Pay would open here in a production environment.
        </p>
      )}
      {paymentMethodId === "google-pay" && (
        <p className="rounded-[var(--radius-xl)] border border-border-subtle px-4 py-6 text-center text-sm text-muted-foreground">
          Google Pay would open here in a production environment.
        </p>
      )}
      {paymentMethodId === "paypal" && (
        <p className="rounded-[var(--radius-xl)] border border-border-subtle px-4 py-6 text-center text-sm text-muted-foreground">
          You would be redirected to PayPal in a production environment.
        </p>
      )}
      {paymentMethodId === "cod" && (
        <p className="rounded-[var(--radius-xl)] border border-border-subtle px-4 py-6 text-center text-sm text-muted-foreground">
          Pay with cash upon delivery. Available in select metropolitan areas.
        </p>
      )}
    </motion.div>
  );
}
