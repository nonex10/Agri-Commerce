'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <div className="relative group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      
      {/* Wishlist Button */}
      <button
        type="button"
        onClick={handleWishlistToggle}
        className="absolute top-3 left-3 z-10 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:bg-background hover:scale-110"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            wishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
          }`}
        />
      </button>

      <Link href={`/products/${product.id}`} className="flex flex-col grow">
        {/* Image */}
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
        <div className="p-4 flex flex-col grow">
          <h3 className="font-semibold text-card-foreground text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground mb-3">
            {product.farmer}
          </p>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 grow">
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

          {/* Price + Cart */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-2xl font-bold text-primary">
              Rs. {product.price.toLocaleString('en-NP')}
            </span>

            <Button
              type="button"
              onClick={handleAddToCart}
              size="icon"
              variant={isAdded ? 'default' : 'outline'}
              className={isAdded ? 'bg-green-600 hover:bg-green-700' : ''}
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}