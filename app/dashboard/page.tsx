'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { dashboardService } from '@/services';
import { Edit, Trash2, Plus, X, Check } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';

type EditableProduct = Omit<Product, 'id' | 'farmerId' | 'rating' | 'reviews'>;
const EMPTY_FORM: EditableProduct = { name: '', description: '', price: 0, category: 'Vegetables', image: '/images/tomatoes.jpg', farmer: '', inStock: true };
const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Organic', 'Seeds'];

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.filter((p) => p.farmerId === 'f1'));
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditableProduct>(EMPTY_FORM);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<EditableProduct>(EMPTY_FORM);

  useEffect(() => {
    dashboardService.getProducts().then(({ data }) => {
      if (data?.length) setProducts(data);
    });
    dashboardService.getStats().then(({ data }) => {
      if (data) setStats(data);
    });
  }, []);

  const localRevenue = products.reduce((sum, p) => sum + p.price * 15, 0);
  const displayRevenue = stats.totalRevenue || localRevenue;
  const displayOrders = stats.totalOrders || products.length * 15;

  const handleEditStart = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, description: product.description, price: product.price, category: product.category, image: product.image, farmer: product.farmer, inStock: product.inStock });
  };

  const handleEditSave = async (id: string) => {
    const payload = { ...editForm, price: Number(editForm.price) };
    const { data } = await dashboardService.updateProduct(id, payload);
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...(data ?? payload) } : p));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await dashboardService.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddSave = async () => {
    const payload = { ...addForm, price: Number(addForm.price) };
    const { data } = await dashboardService.createProduct(payload);
    const newProduct: Product = data ?? { ...payload, id: `p-${Date.now()}`, farmerId: 'f1', rating: 0, reviews: 0 };
    setProducts((prev) => [newProduct, ...prev]);
    setAddForm(EMPTY_FORM);
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-linear-to-br from-primary/10 to-accent/10 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-foreground">Seller Dashboard</h1>
            <p className="text-muted-foreground">Manage your products and sales</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Total Products</p>
                <p className="text-4xl font-bold text-foreground">{products.length}</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Total Orders</p>
                <p className="text-4xl font-bold text-primary">{displayOrders}</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <p className="text-muted-foreground text-sm mb-2">Revenue (NPR)</p>
                <p className="text-4xl font-bold text-accent">Rs. {displayRevenue.toLocaleString('en-NP')}</p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Your Products</h2>
                <Button className="gap-2" onClick={() => { setShowAddForm(true); setEditingId(null); }}>
                  <Plus className="w-4 h-4" />Add Product
                </Button>
              </div>

              {showAddForm && (
                <div className="mb-6 p-6 border border-primary/30 rounded-lg bg-primary/5 space-y-3">
                  <h3 className="font-semibold text-foreground mb-2">New Product</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input placeholder="Product name" value={addForm.name} onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))} />
                    <Input type="number" placeholder="Price (NPR)" value={addForm.price || ''} onChange={(e) => setAddForm((f) => ({ ...f, price: Number(e.target.value) }))} />
                    <Input placeholder="Origin (District, Province)" value={addForm.farmer} onChange={(e) => setAddForm((f) => ({ ...f, farmer: e.target.value }))} />
                    <select value={addForm.category} onChange={(e) => setAddForm((f) => ({ ...f, category: e.target.value }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <Input placeholder="Description" value={addForm.description} onChange={(e) => setAddForm((f) => ({ ...f, description: e.target.value }))} />
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={addForm.inStock} onChange={(e) => setAddForm((f) => ({ ...f, inStock: e.target.checked }))} className="accent-primary" />
                    In Stock
                  </label>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleAddSave} disabled={!addForm.name || !addForm.price} className="gap-2"><Check className="w-4 h-4" />Save Product</Button>
                    <Button variant="outline" onClick={() => { setShowAddForm(false); setAddForm(EMPTY_FORM); }} className="gap-2"><X className="w-4 h-4" />Cancel</Button>
                  </div>
                </div>
              )}

              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products yet</p>
                  <Button onClick={() => setShowAddForm(true)}>Add Your First Product</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Product</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Price (NPR)</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Stock</th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">Rating</th>
                        <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <>
                          <tr key={product.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex gap-3 items-center">
                                <div className="relative w-10 h-10 bg-muted rounded overflow-hidden shrink-0">
                                  <Image src={product.image} alt={product.name} fill className="object-cover" />
                                </div>
                                <span className="font-medium text-foreground">{product.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{product.category}</td>
                            <td className="py-4 px-4 text-foreground font-semibold">Rs. {product.price.toLocaleString('en-NP')}</td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-foreground">{product.rating.toFixed(1)} ⭐</td>
                            <td className="py-4 px-4 text-right space-x-2">
                              <button onClick={() => editingId === product.id ? setEditingId(null) : handleEditStart(product)} className="inline-flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(product.id)} className="inline-flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                          {editingId === product.id && (
                            <tr key={`edit-${product.id}`} className="border-b border-border bg-primary/5">
                              <td colSpan={6} className="px-4 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <Input placeholder="Name" value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
                                  <Input type="number" placeholder="Price (NPR)" value={editForm.price || ''} onChange={(e) => setEditForm((f) => ({ ...f, price: Number(e.target.value) }))} />
                                  <select value={editForm.category} onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                  </select>
                                  <Input placeholder="Description" value={editForm.description} onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))} className="md:col-span-2" />
                                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <input type="checkbox" checked={editForm.inStock} onChange={(e) => setEditForm((f) => ({ ...f, inStock: e.target.checked }))} className="accent-primary" />
                                    In Stock
                                  </label>
                                </div>
                                <div className="flex gap-3 mt-3">
                                  <Button size="sm" onClick={() => handleEditSave(product.id)} className="gap-2"><Check className="w-4 h-4" />Save</Button>
                                  <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="gap-2"><X className="w-4 h-4" />Cancel</Button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
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
