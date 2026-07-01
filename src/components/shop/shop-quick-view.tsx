"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PremiumImage } from "@/components/common/premium-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { isProductInStock } from "@/constants/products";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ShopQuickViewProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShopQuickView({ product, open, onOpenChange }: ShopQuickViewProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes.find((s) => s.available) ?? product?.sizes[0]
  );

  useEffect(() => {
    if (!product) return;
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes.find((s) => s.available) ?? product.sizes[0]);
  }, [product]);

  if (!product) return null;

  const inStock = isProductInStock(product);
  const defaultColor = product.colors[0];
  const color = selectedColor ?? defaultColor;
  const size = selectedSize ?? product.sizes[0];

  const handleAddToCart = () => {
    if (!inStock || !size.available) return;
    addItem(product, color, size, 1);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <PremiumImage
              src={product.images[0]}
              alt={product.name}
              aspectRatio="portrait"
              containerClassName="rounded-none"
              zoomOnHover={false}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <DialogHeader className="text-left">
              <div className="mb-2 flex flex-wrap gap-2">
                {product.new && <Badge variant="champagne">New</Badge>}
                {product.bestseller && <Badge variant="muted">Bestseller</Badge>}
              </div>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
              <DialogDescription className="sr-only">
                Quick view for {product.name}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
              <span>{product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-xl">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {product.colors.length > 1 && (
              <div className="mt-6">
                <p className="label-caps-muted">
                  Color — {color.name}
                </p>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      aria-label={c.name}
                      aria-pressed={color.name === c.name}
                      className={cn(
                        "h-7 w-7 rounded-[var(--radius-full)] border-2 transition-luxury",
                        color.name === c.name
                          ? "border-foreground"
                          : "border-border hover:scale-105"
                      )}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 1 && (
              <div className="mt-6">
                <p className="label-caps-muted">
                  Size
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      disabled={!s.available}
                      onClick={() => setSelectedSize(s)}
                      aria-pressed={size.label === s.label}
                      className={cn(
                        "min-w-[2.5rem] rounded-[var(--radius-lg)] border px-3 py-1.5 text-xs transition-luxury",
                        size.label === s.label
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground",
                        !s.available && "cursor-not-allowed opacity-40 line-through"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Button
                variant="luxury"
                onClick={handleAddToCart}
                disabled={!inStock || !size.available}
              >
                {inStock ? "Add to Bag" : "Sold Out"}
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/product/${product.slug}`}>View Full Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
