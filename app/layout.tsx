import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import { OrderHistoryProvider } from '@/context/order-history-context';
import { AuthProvider } from '@/context/auth-context';
import './globals.css';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AgriFresh - Farm to Table',
  description: 'Connecting farmers with fresh, organic produce directly to your table',
  icons: {
    icon: [
      { url: '/logo.jpg', media: '(prefers-color-scheme: light)' },
      { url: '/logo.jpg', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderHistoryProvider>
                {children}
              </OrderHistoryProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
