export { apiClient, BASE_URL } from './api-client';
export type { ApiResponse } from './api-client';

export { authService } from './auth.service';
export type { LoginPayload, SignupPayload, AuthResponse } from './auth.service';

export { productsService } from './products.service';
export type { ProductsFilter, ProductsResponse, CreateProductPayload } from './products.service';

export { ordersService } from './orders.service';
export type { Order, OrderStatus, PlaceOrderPayload, OrdersResponse } from './orders.service';

export { cartService } from './cart.service';
export type { CartResponse, AddToCartPayload, UpdateCartPayload } from './cart.service';

export { wishlistService } from './wishlist.service';
export type { WishlistResponse } from './wishlist.service';

export { contactService } from './contact.service';
export type { ContactPayload, ContactResponse } from './contact.service';

export { dashboardService } from './dashboard.service';
export type { DashboardStats, CreateProductPayload as DashboardCreateProductPayload } from './dashboard.service';
