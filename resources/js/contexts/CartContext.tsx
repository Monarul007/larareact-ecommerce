import React, { createContext, useContext, useReducer } from 'react';
import { cartService } from '@/services/cartService';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    name: string;
    image: string | null;
    slug: string;
  };
  variation: {
    price: number;
    attributes: Record<string, string>;
    stock: number;
  };
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.variation.price * item.quantity, 0);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        total: calculateTotal(action.payload),
      };

    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }

      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { state, dispatch } = context;

  const fetchCart = async () => {
    const response = await cartService.getCart();
    dispatch({ type: 'SET_CART', payload: Object.values(response.cart) });
  };

  return {
    items: state.items,
    total: state.total,
    isLoading: false,
    error: null,
    addItem: async (variationId: number, quantity: number) => {
      await cartService.addToCart({ variation_id: variationId, quantity });
      await fetchCart();
    },
    removeItem: async (id: number) => {
      await cartService.removeFromCart(id);
      await fetchCart();
    },
    updateQuantity: async (id: number, quantity: number) => {
      await cartService.updateCartItem(id, quantity);
      await fetchCart();
    },
    clearCart: async () => {
      await cartService.clearCart();
      dispatch({ type: 'CLEAR_CART' });
    },
    fetchCart,
  };
}