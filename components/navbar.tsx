'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { useWishlist } from '@/context/wishlist-context';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X, Heart, User, LogOut, Package } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const { getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const itemCount = getItemCount();
  const wishlistCount = getWishlistCount();
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    setIsOpen(false);
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center overflow-hidden">
              <Image src="/logo.jpg" alt="AgriFresh Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">AgriFresh</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">Products</Link>
            <Link href="/orders" className="text-foreground hover:text-primary transition-colors">Orders</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Wishlist */}
            <Button size="icon" variant="ghost" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Cart */}
            <Button size="icon" variant="ghost" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Auth section — wait for session check to finish */}
            {!isLoading && (
              isAuthenticated && user ? (
                <div className="relative hidden sm:block" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-medium"
                  >
                    <User className="w-4 h-4 text-primary" />
                    <span className="max-w-25 truncate">{user.name}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <Package className="w-4 h-4" /> Order History
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              )
            )}

            {/* Mobile menu toggle */}
            <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-1">
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/products" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>Products</Link>
            <Link href="/orders" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>Orders</Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link href="/wishlist" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
            {isAuthenticated && user ? (
              <>
                <div className="px-4 py-2 border-t border-border">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-destructive hover:bg-secondary rounded">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="block px-4 py-2 text-foreground hover:bg-secondary rounded" onClick={() => setIsOpen(false)}>Sign In</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
