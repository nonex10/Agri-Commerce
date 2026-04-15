'use client';

import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">AgriFresh</span>
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
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Link href="/auth/login" className="flex gap-2 items-center">
                Sign In
              </Link>
            </Button>

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
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-secondary rounded">
              Home
            </Link>
            <Link href="/products" className="block px-4 py-2 text-foreground hover:bg-secondary rounded">
              Products
            </Link>
            <Link href="/farmers" className="block px-4 py-2 text-foreground hover:bg-secondary rounded">
              Farmers
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-secondary rounded">
              About
            </Link>
            <Link href="/auth/login" className="block px-4 py-2 text-foreground hover:bg-secondary rounded">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
