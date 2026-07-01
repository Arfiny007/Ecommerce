"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import {
  formatPhone,
  formatZip,
  validateShippingForm,
  type FieldError,
} from "@/lib/form-utils";
import { MOCK_SAVED_ADDRESSES } from "@/constants/checkout";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp } from "@/lib/animations";
import type { ShippingFormData } from "@/types/cart";

const EMPTY_FORM: ShippingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
};

interface CheckoutShippingFormProps {
  data: ShippingFormData;
  onChange: (data: ShippingFormData) => void;
  onValid?: (valid: boolean) => void;
}

export function CheckoutShippingForm({
  data,
  onChange,
  onValid,
}: CheckoutShippingFormProps) {
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const reducedMotion = useReducedMotion();

  const getError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  const update = (field: keyof ShippingFormData, value: string) => {
    const next = { ...data, [field]: value };
    onChange(next);
    if (touched.has(field)) {
      const fieldErrors = validateShippingForm({
        firstName: next.firstName,
        lastName: next.lastName,
        email: next.email,
        phone: next.phone,
        address: next.address,
        city: next.city,
        state: next.state,
        zip: next.zip,
      });
      setErrors(fieldErrors);
      onValid?.(fieldErrors.length === 0);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => new Set(prev).add(field));
    const fieldErrors = validateShippingForm({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
    });
    setErrors(fieldErrors);
    onValid?.(fieldErrors.length === 0);
  };

  const applySavedAddress = (addr: (typeof MOCK_SAVED_ADDRESSES)[number]) => {
    const [firstName, ...rest] = addr.name.split(" ");
    const lastName = rest.join(" ") || firstName;
    onChange({
      firstName,
      lastName,
      email: "alexandra@example.com",
      phone: addr.phone,
      address: addr.line1,
      apartment: addr.line2 ?? "",
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
    });
    setErrors([]);
    onValid?.(true);
  };

  return (
    <motion.div
      variants={reducedMotion ? undefined : fadeInUp}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      className="space-y-6"
    >
      <div>
        <p className="label-caps-muted mb-3">
          Saved addresses
        </p>
        <div className="flex flex-wrap gap-2">
          {MOCK_SAVED_ADDRESSES.map((addr) => (
            <button
              key={addr.id}
              type="button"
              onClick={() => applySavedAddress(addr)}
              className="rounded-[var(--radius-full)] border border-border-subtle px-4 py-2 text-xs transition-luxury hover:border-foreground"
            >
              {addr.label}
              {addr.isDefault && (
                <span className="ml-1.5 text-muted-foreground">· Default</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FloatingLabelInput
          label="First name"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          onBlur={() => handleBlur("firstName")}
          error={getError("firstName")}
          success={touched.has("firstName") && !getError("firstName") && Boolean(data.firstName)}
          autoComplete="given-name"
        />
        <FloatingLabelInput
          label="Last name"
          value={data.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          onBlur={() => handleBlur("lastName")}
          error={getError("lastName")}
          success={touched.has("lastName") && !getError("lastName") && Boolean(data.lastName)}
          autoComplete="family-name"
        />
      </div>

      <FloatingLabelInput
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => update("email", e.target.value)}
        onBlur={() => handleBlur("email")}
        error={getError("email")}
        success={touched.has("email") && !getError("email") && Boolean(data.email)}
        autoComplete="email"
      />

      <FloatingLabelInput
        label="Phone"
        type="tel"
        value={data.phone}
        onChange={(e) => update("phone", formatPhone(e.target.value))}
        onBlur={() => handleBlur("phone")}
        error={getError("phone")}
        success={touched.has("phone") && !getError("phone") && data.phone.replace(/\D/g, "").length >= 10}
        autoComplete="tel"
      />

      <FloatingLabelInput
        label="Address"
        value={data.address}
        onChange={(e) => update("address", e.target.value)}
        onBlur={() => handleBlur("address")}
        error={getError("address")}
        autoComplete="street-address"
      />

      <FloatingLabelInput
        label="Apartment, suite, etc. (optional)"
        value={data.apartment}
        onChange={(e) => update("apartment", e.target.value)}
        autoComplete="address-line2"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <FloatingLabelInput
          label="City"
          value={data.city}
          onChange={(e) => update("city", e.target.value)}
          onBlur={() => handleBlur("city")}
          error={getError("city")}
          autoComplete="address-level2"
        />
        <FloatingLabelInput
          label="State"
          value={data.state}
          onChange={(e) => update("state", e.target.value)}
          onBlur={() => handleBlur("state")}
          error={getError("state")}
          autoComplete="address-level1"
        />
        <FloatingLabelInput
          label="ZIP code"
          value={data.zip}
          onChange={(e) => update("zip", formatZip(e.target.value))}
          onBlur={() => handleBlur("zip")}
          error={getError("zip")}
          autoComplete="postal-code"
          inputMode="numeric"
        />
      </div>
    </motion.div>
  );
}

export { EMPTY_FORM as EMPTY_SHIPPING_FORM };
