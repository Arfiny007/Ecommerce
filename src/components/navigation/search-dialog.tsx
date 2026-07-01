"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/constants/products";
import { EMPTY_STATE_COPY } from "@/constants/content";
import { SearchEmptyIllustration } from "@/components/illustrations/search-empty-illustration";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const handleSuggestion = (term: string) => {
    setQuery(term);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] max-w-2xl translate-y-0 sm:top-[15%]">
        <DialogHeader>
          <DialogTitle className="sr-only">Search products</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search collections, products, materials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12 pl-10 text-base"
            autoFocus
          />
        </div>
        {results.length > 0 && (
          <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={() => {
                  onOpenChange(false);
                  setQuery("");
                }}
                className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-accent"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {product.category.replace("-", " ")}
                  </p>
                </div>
                <span className="text-sm">{formatPrice(product.price)}</span>
              </Link>
            ))}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div className="py-8 text-center">
            <SearchEmptyIllustration />
            <p className="mt-4 text-sm font-medium">{EMPTY_STATE_COPY.search.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {EMPTY_STATE_COPY.search.body}
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {EMPTY_STATE_COPY.search.suggestions.map((term) => (
                <Button
                  key={term}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestion(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
