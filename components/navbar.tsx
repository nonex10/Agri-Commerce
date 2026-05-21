'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const itemCount = getItemCount();
  const wishlistCount = getWishlistCount();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">AgriFresh</span>
          </Link> */}


<Link href="/" className="flex items-center gap-2">
  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
    
    <Image
      src="/logo.jpg"   
      alt="AgriFresh Logo"
      width={32}
      height={32}
      className="object-contain"
    />

  </div>

  <span className="font-bold text-xl text-foreground hidden sm:inline">
    AgriFresh
  </span>
</Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/farmers" className="text-foreground hover:text-primary transition-colors">
              Farmers
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Link href="/auth/login" className="flex gap-2 items-center">
                Sign In
              </Link>
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button size="icon" variant="ghost" className="relative">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button size="icon" variant="ghost" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link href="/farmers" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Farmers
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/wishlist" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            <Link href="/orders" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Order History
            </Link>
            <Link href="/auth/login" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
