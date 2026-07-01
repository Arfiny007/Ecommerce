"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, CreditCard, Package } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import {
  checkoutCopy,
  MOCK_SAVED_ADDRESSES,
  MOCK_SAVED_CARDS,
  MOCK_ORDER_HISTORY,
} from "@/constants/checkout";
import { getProductsByIds } from "@/constants/products";
import { formatPrice } from "@/lib/utils";
import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionWrapper } from "@/components/common/motion-wrapper";

export function ProfilePageContent() {
  const { wishlist } = useWishlist();
  const wishlistProducts = getProductsByIds(wishlist).slice(0, 4);

  return (
    <Container className="pb-24 pt-28 md:pt-32">
      <MotionWrapper>
        <h1 className="font-display text-4xl font-light md:text-5xl">
          {checkoutCopy.profileTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your addresses, payments, and orders.
        </p>
      </MotionWrapper>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Card variant="elevated" rounded="2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-4 w-4" aria-hidden />
              {checkoutCopy.profileAddresses}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_SAVED_ADDRESSES.map((addr) => (
              <div
                key={addr.id}
                className="rounded-[var(--radius-xl)] border border-border-subtle p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{addr.label}</span>
                  {addr.isDefault && <Badge variant="muted">Default</Badge>}
                </div>
                <address className="mt-2 not-italic text-sm text-muted-foreground">
                  {addr.name}
                  <br />
                  {addr.line1}
                  {addr.line2 && (
                    <>
                      <br />
                      {addr.line2}
                    </>
                  )}
                  <br />
                  {addr.city}, {addr.state} {addr.zip}
                </address>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Add new address
            </Button>
          </CardContent>
        </Card>

        <Card variant="elevated" rounded="2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-4 w-4" aria-hidden />
              {checkoutCopy.profilePayments}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_SAVED_CARDS.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between rounded-[var(--radius-xl)] border border-border-subtle p-4"
              >
                <div>
                  <p className="text-sm font-medium">
                    {card.brand} ···· {card.last4}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires {card.expiry}
                  </p>
                </div>
                {card.isDefault && <Badge variant="muted">Default</Badge>}
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Add payment method
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="mt-12" aria-labelledby="wishlist-heading">
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="wishlist-heading"
            className="flex items-center gap-2 font-display text-2xl font-light"
          >
            <Heart className="h-5 w-5" aria-hidden />
            {checkoutCopy.profileWishlist}
          </h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/shop">Browse shop</Link>
          </Button>
        </div>
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {wishlistProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] bg-surface-muted">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-luxury group-hover:scale-105"
                    sizes="200px"
                  />
                </div>
                <p className="mt-2 text-sm font-medium">{product.name}</p>
                <p className="text-xs tabular-nums text-muted-foreground">
                  {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Your wishlist is empty. Save pieces you love while browsing.
          </p>
        )}
      </section>

      <section className="mt-16" aria-labelledby="orders-heading">
        <h2
          id="orders-heading"
          className="mb-6 flex items-center gap-2 font-display text-2xl font-light"
        >
          <Package className="h-5 w-5" aria-hidden />
          {checkoutCopy.profileOrders}
        </h2>
        <div className="space-y-4">
          {MOCK_ORDER_HISTORY.map((order) => (
            <Card key={order.id} variant="default" rounded="xl" interactive>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src={order.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      · {order.items} item{order.items !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="champagne">{order.status}</Badge>
                    <span className="text-sm font-medium tabular-nums">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Container>
  );
}
