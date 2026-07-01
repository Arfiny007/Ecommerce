"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { useCheckoutPreferences } from "@/hooks/use-checkout-preferences";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import {
  CheckoutShippingForm,
  EMPTY_SHIPPING_FORM,
} from "@/components/checkout/checkout-shipping-form";
import { CheckoutDeliveryForm } from "@/components/checkout/checkout-delivery-form";
import { CheckoutPaymentForm } from "@/components/checkout/checkout-payment-form";
import { CheckoutReview } from "@/components/checkout/checkout-review";
import { CheckoutSuccess } from "@/components/checkout/checkout-success";
import { OrderSummary } from "@/components/checkout/order-summary";
import { calculateCartTotals, generateOrderNumber } from "@/lib/cart-calculations";
import { validateShippingForm } from "@/lib/form-utils";
import { checkoutCopy } from "@/constants/checkout";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import type { ShippingFormData } from "@/types/cart";
import type { CheckoutStepId } from "@/constants/checkout";

export function CheckoutPageContent() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const {
    shippingMethodId,
    setShippingMethod,
    couponCode,
    giftWrapping,
  } = useCheckoutPreferences();

  const [step, setStep] = useState<CheckoutStepId>("shipping");
  const [shipping, setShipping] = useState<ShippingFormData>(EMPTY_SHIPPING_FORM);
  const [orderNumber, setOrderNumber] = useState("");
  const [completedTotal, setCompletedTotal] = useState(0);
  const [completedItems, setCompletedItems] = useState(items);

  const totals = calculateCartTotals({
    subtotal,
    couponCode,
    giftWrapping,
    shippingMethodId,
  });

  const goNext = useCallback(() => {
    const steps: CheckoutStepId[] = ["shipping", "delivery", "payment", "review", "success"];
    const idx = steps.indexOf(step);
    if (step === "shipping") {
      const errors = validateShippingForm({
        firstName: shipping.firstName,
        lastName: shipping.lastName,
        email: shipping.email,
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
      });
      if (errors.length > 0) return;
    }
    if (step === "review") {
      const num = generateOrderNumber();
      setOrderNumber(num);
      setCompletedTotal(totals.total);
      setCompletedItems([...items]);
      clearCart();
      setStep("success");
      return;
    }
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1] as CheckoutStepId);
    }
  }, [step, shipping, totals.total, items, clearCart]);

  const goBack = () => {
    const steps: CheckoutStepId[] = ["shipping", "delivery", "payment", "review"];
    const idx = steps.indexOf(step as CheckoutStepId);
    if (idx > 0) setStep(steps[idx - 1] as CheckoutStepId);
    else router.push("/cart");
  };

  if (items.length === 0 && step !== "success") {
    return (
      <Container className="section-empty flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-light">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Add items to your bag before checking out.
        </p>
        <Magnetic className="mt-8">
          <Button variant="luxury" size="xl" asChild>
            <Link href="/shop">{checkoutCopy.continueShopping}</Link>
          </Button>
        </Magnetic>
      </Container>
    );
  }

  if (step === "success") {
    return (
      <Container className="py-28 md:py-32">
        <CheckoutSuccess
          orderNumber={orderNumber}
          total={completedTotal}
          items={completedItems}
        />
      </Container>
    );
  }

  const stepTitles: Record<string, string> = {
    shipping: "Shipping Information",
    delivery: "Delivery Method",
    payment: "Payment",
    review: "Review Order",
  };

  return (
    <Container className="pb-24 pt-28 md:pt-32">
      <Button variant="ghost" size="sm" className="mb-6 gap-2" onClick={goBack}>
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back
      </Button>

      <h1 className="font-display text-4xl font-light md:text-5xl">
        {checkoutCopy.checkoutTitle}
      </h1>

      <CheckoutSteps current={step} className="mt-10 max-w-2xl" />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="mb-6 font-display text-2xl font-light">
            {stepTitles[step]}
          </h2>

          {step === "shipping" && (
            <CheckoutShippingForm data={shipping} onChange={setShipping} />
          )}
          {step === "delivery" && (
            <CheckoutDeliveryForm
              subtotal={subtotal}
              selected={shippingMethodId}
              onSelect={setShippingMethod}
            />
          )}
          {step === "payment" && <CheckoutPaymentForm />}
          {step === "review" && (
            <CheckoutReview items={items} subtotal={subtotal} shipping={shipping} />
          )}

          <div className="mt-10 flex gap-3">
            <Magnetic>
              <Button variant="cta" size="xl" onClick={goNext}>
                {step === "review" ? checkoutCopy.placeOrder : "Continue"}
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="lg:col-span-5">
          <OrderSummary
            subtotal={subtotal}
            items={items}
            showItems
            collapsible
          />
          <div className="hidden lg:block">
            <OrderSummary subtotal={subtotal} items={items} showItems />
          </div>
        </div>
      </div>
    </Container>
  );
}
