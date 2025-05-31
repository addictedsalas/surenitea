'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { createCart, addLinesToCart } from '@/lib/shopify';

interface CartItem {
  id: string;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  quantity: number;
  price: number;
  currencyCode: string;
  image?: {
    url: string;
    altText: string | null;
  };
}

interface CartState {
  id: string | null;
  items: CartItem[];
  checkoutUrl: string | null;
  isLoading: boolean;
}

type CartAction =
  | { type: 'SET_CART'; payload: { id: string; checkoutUrl: string } }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { id: string; quantity: number } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET' };

const initialState: CartState = {
  id: null,
  items: [],
  checkoutUrl: null,
  isLoading: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        id: action.payload.id,
        checkoutUrl: action.payload.checkoutUrl,
      };
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.variantId === action.payload.variantId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.variantId === action.payload.variantId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  checkout: () => void;
  resetCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('surenitea-cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.id && parsedCart.checkoutUrl) {
        dispatch({ type: 'SET_CART', payload: parsedCart });
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (state.id) {
      localStorage.setItem('surenitea-cart', JSON.stringify({
        id: state.id,
        checkoutUrl: state.checkoutUrl,
        items: state.items,
      }));
    }
  }, [state]);

  const addToCart = async (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      let cartId = state.id;
      let checkoutUrl = state.checkoutUrl;

      // Create cart if it doesn't exist
      if (!cartId) {
        const cart = await createCart();
        cartId = cart.id;
        checkoutUrl = cart.checkoutUrl;
        dispatch({ type: 'SET_CART', payload: { id: cartId, checkoutUrl: checkoutUrl! } });
      }

      // Add item to Shopify cart
      await addLinesToCart(cartId!, [{
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }]);

      // Add item to local state
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          ...item,
          id: `${item.variantId}-${Date.now()}`,
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You might want to show a toast notification here
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
    }
  };

  const checkout = () => {
    if (state.checkoutUrl) {
      window.location.assign(state.checkoutUrl);
    }
  };

  const resetCart = () => {
    localStorage.removeItem('surenitea-cart');
    dispatch({ type: 'RESET' });
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      checkout,
      resetCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
