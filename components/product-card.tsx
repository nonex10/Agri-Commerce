'use client';

import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 bg-muted overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-semibold text-card-foreground text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Farmer */}
          <p className="text-sm text-muted-foreground mb-3">
            {product.farmer}
          </p>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'text-muted'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              onClick={handleAddToCart}
              size="icon"
              variant={isAdded ? 'default' : 'outline'}
              className={isAdded ? 'bg-green-600' : ''}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
