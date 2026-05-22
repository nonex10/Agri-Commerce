'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { CategoryFilter } from '@/components/category-filter';
import { SearchBar } from '@/components/search-bar';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { productsService } from '@/services';
import { Product } from '@/types';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    const { data } = await productsService.getAll({
      category: selectedCategory || undefined,
      search: searchQuery || undefined,
    });
    if (data?.products?.length) {
      setProducts(data.products);
    } else {
      // Fallback: filter mock data
      setProducts(
        MOCK_PRODUCTS.filter((p) => {
          const matchCat = !selectedCategory || p.category === selectedCategory;
          const q = searchQuery.toLowerCase();
          const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.farmer.toLowerCase().includes(q);
          return matchCat && matchSearch;
        })
      );
    }
    setIsLoading(false);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-linear-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Shop Fresh Produce</h1>
            <p className="text-muted-foreground">Browse fresh products from local farmers across Nepal</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="mb-8">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
                {isLoading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-6">
                      Showing {products.length} product{products.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
