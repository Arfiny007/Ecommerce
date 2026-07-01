"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-media-query";
import { storageKeys } from "@/constants/branding";
import type { CheckoutPreferences } from "@/types/cart";

const DEFAULT_PREFS: CheckoutPreferences = {
  couponCode: null,
  giftWrapping: false,
  shippingMethodId: "standard",
  paymentMethodId: "card",
};

export function useCheckoutPreferences() {
  const [prefs, setPrefs] = useLocalStorage<CheckoutPreferences>(
    storageKeys.checkoutPrefs,
    DEFAULT_PREFS
  );

  const setCouponCode = useCallback(
    (code: string | null) => {
      setPrefs((prev) => ({ ...prev, couponCode: code }));
    },
    [setPrefs]
  );

  const setGiftWrapping = useCallback(
    (giftWrapping: boolean) => {
      setPrefs((prev) => ({ ...prev, giftWrapping }));
    },
    [setPrefs]
  );

  const setShippingMethod = useCallback(
    (shippingMethodId: CheckoutPreferences["shippingMethodId"]) => {
      setPrefs((prev) => ({ ...prev, shippingMethodId }));
    },
    [setPrefs]
  );

  const setPaymentMethod = useCallback(
    (paymentMethodId: CheckoutPreferences["paymentMethodId"]) => {
      setPrefs((prev) => ({ ...prev, paymentMethodId }));
    },
    [setPrefs]
  );

  const resetPrefs = useCallback(() => {
    setPrefs(DEFAULT_PREFS);
  }, [setPrefs]);

  return {
    ...prefs,
    setCouponCode,
    setGiftWrapping,
    setShippingMethod,
    setPaymentMethod,
    resetPrefs,
  };
}
