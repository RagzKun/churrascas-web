import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export interface ProductExtra {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  extras?: ProductExtra[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedExtras: ProductExtra[];
  notes?: string;
}

// Cart context type
interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getItemById: (productId: string) => CartItem | undefined;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      // Check if the item is already in the cart with the exact same extras
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.product.id === newItem.product.id && 
          JSON.stringify(item.selectedExtras) === JSON.stringify(newItem.selectedExtras)
      );

      if (existingItemIndex >= 0) {
        // If item with same extras exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      } else {
        // Otherwise add new item
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.product.id === productId ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0) // Remove if quantity becomes 0
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      // Calculate product price + extras
      const itemExtrasTotal = item.selectedExtras.reduce(
        (sum, extra) => sum + extra.price, 
        0
      );
      
      return total + (item.product.price + itemExtrasTotal) * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const getItemById = (productId: string) => {
    return items.find(item => item.product.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        getItemById
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
