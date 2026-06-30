"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, Star, Truck, RotateCcw, Shield } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { getRelatedProducts } from "@/constants/products";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Heading, Eyebrow, Body } from "@/components/common/typography";
import { ProductCard } from "@/components/home/featured-products";
import { MotionStagger } from "@/components/common/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.available) || product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedSize, quantity);
  };

  return (
    <>
      <div className="pt-20 md:pt-24">
        <Container>
          <nav className="py-6 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative col-span-2 aspect-[4/5] overflow-hidden rounded-3xl md:col-span-1 md:row-span-2">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {product.images.slice(1, 3).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index + 1)}
                    className="relative aspect-square overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 2}`}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="25vw"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-8">
                <div>
                  <div className="flex gap-2">
                    {product.new && <Badge variant="champagne">New</Badge>}
                    {product.bestseller && <Badge variant="secondary">Bestseller</Badge>}
                  </div>
                  <Heading as="h1" className="mt-4 text-3xl md:text-4xl">
                    {product.name}
                  </Heading>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xl">{formatPrice(product.price)}</span>
                    {product.compareAtPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < Math.floor(product.rating)
                              ? "fill-foreground text-foreground"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <Body>{product.description}</Body>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em]">
                    Color — {selectedColor.name}
                  </p>
                  <div className="mt-3 flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "h-8 w-8 rounded-full border-2 transition-all",
                          selectedColor.name === color.name
                            ? "border-foreground scale-110"
                            : "border-transparent"
                        )}
                        style={{ backgroundColor: color.hex }}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em]">
                    Size
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => size.available && setSelectedSize(size)}
                        disabled={!size.available}
                        className={cn(
                          "flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm transition-all",
                          selectedSize.label === size.label
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground",
                          !size.available && "opacity-30 line-through cursor-not-allowed"
                        )}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em]">
                    Quantity
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="luxury"
                    size="xl"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={!selectedSize.available}
                  >
                    Add to Bag — {formatPrice(product.price * quantity)}
                  </Button>
                </motion.div>

                <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                  {[
                    { icon: Truck, label: "Free Shipping" },
                    { icon: RotateCcw, label: "30-Day Returns" },
                    { icon: Shield, label: "Authenticity" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 text-center">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="details">
                    <AccordionTrigger>Product Details</AccordionTrigger>
                    <AccordionContent>
                      Crafted with exceptional attention to detail. Made from premium
                      materials sourced from the finest suppliers. Each piece undergoes
                      rigorous quality control before reaching you.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping">
                    <AccordionTrigger>Shipping &amp; Delivery</AccordionTrigger>
                    <AccordionContent>
                      Complimentary standard shipping on orders over $250. Express
                      delivery available at checkout. International shipping to select
                      countries.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="returns">
                    <AccordionTrigger>Returns &amp; Exchanges</AccordionTrigger>
                    <AccordionContent>
                      Returns accepted within 30 days of delivery. Items must be unworn
                      with original tags attached. Exchanges processed within 5-7
                      business days.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section className="border-t border-border">
        <Eyebrow>You May Also Like</Eyebrow>
        <Heading className="mt-3">Related Products</Heading>
        <MotionStagger className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </MotionStagger>
      </Section>
    </>
  );
}
