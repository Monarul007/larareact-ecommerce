import { create } from 'zustand';
import { cartService } from '@/services/cartService';
import { AxiosError } from 'axios';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    name: string;
    image: string | null;
    slug: string;
  };
  variation: {
    id: number;
    price: number;
    attributes: Record<string, string>;
    stock: number;
  };
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  total: number;
  addItem: (variationId: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.variation.price * item.quantity), 0);
};

export const useCart = create<CartStore>((set) => ({
  items: [],
  isLoading: false,
  error: null,
  total: 0,

  addItem: async (variationId: number, quantity: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await cartService.addToCart({ variation_id: variationId, quantity });
      const items = Object.values(response.cart) as CartItem[];
      set({ 
        items,
        total: calculateTotal(items),
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Failed to add item', 
        isLoading: false 
      });
      throw error;
    }
  },

  removeItem: async (id: number) => {
    try {
      set({ isLoading: true, error: null });
      const response = await cartService.removeFromCart(id);
      const items = Object.values(response.cart) as CartItem[];
      set({ 
        items,
        total: calculateTotal(items),
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Failed to remove item', 
        isLoading: false 
      });
      throw error;
    }
  },

  updateQuantity: async (id: number, quantity: number) => {
    try {
      if (quantity < 1) {
        throw new Error('Quantity must be greater than 0');
      }

      set({ isLoading: true, error: null });
      const response = await cartService.updateCartItem(id, quantity);
      const items = Object.values(response.cart) as CartItem[];
      set({ 
        items,
        total: calculateTotal(items),
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Failed to update quantity', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearCart: async () => {
    try {
      set({ isLoading: true, error: null });
      await cartService.clearCart();
      set({ 
        items: [], 
        total: 0, 
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Failed to clear cart', 
        isLoading: false 
      });
      throw error;
    }
  },

  fetchCart: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await cartService.getCart();
      const items = Object.values(response.cart) as CartItem[];
      set({ 
        items,
        total: calculateTotal(items),
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Failed to fetch cart', 
        isLoading: false 
      });
      throw error;
    }
  }
}));