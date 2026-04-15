export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  farmer: string;
  farmerId: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'farmer';
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  email: string;
  farm: string;
  location: string;
  description: string;
  avatar: string;
  products: string[];
  rating: number;
  reviews: number;
}
