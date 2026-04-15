'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS } from '@/lib/constants';
import Link from 'next/link';
import { Edit, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function DashboardPage() {
  const [products, setProducts] = useState(MOCK_PRODUCTS.filter(p => p.farmerId === 'f1'));

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const totalRevenue = products.reduce((sum, p) => sum + p.price * 100, 0);
  const totalOrders = products.length * 15; // Mock data

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground">Farmer Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and sales</p>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Total Products</p>
                <p className="text-4xl font-bold text-foreground">{products.length}</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
                <p className="text-4xl font-bold text-primary">{totalOrders}</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Revenue</p>
                <p className="text-4xl font-bold text-accent">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Your Products</h2>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products yet</p>
                  <Button>Add Your First Product</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Product
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Category
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Price
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Stock
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Rating
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex gap-3 items-center">
                              <div className="relative w-10 h-10 bg-muted rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-medium text-foreground">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {product.category}
                          </td>
                          <td className="py-4 px-4 text-foreground font-semibold">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.inStock
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-foreground">
                            {product.rating.toFixed(1)} ⭐
                          </td>
                          <td className="py-4 px-4 text-right space-x-2">
                            <button className="inline-flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-primary transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="inline-flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
