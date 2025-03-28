import React, { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../types/Book"; // Adjust if needed

// Define the CartItem type
type CartItem = {
  book: Book;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  toast: { show: boolean; message: string }; // Toast state
  setToast: React.Dispatch<React.SetStateAction<{ show: boolean; message: string }>>; // Function to update toast state
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Update state to use CartItem[] instead of Book[]
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      // Check if book is already in the cart
      const existingItem = prevCart.find(item => item.book.bookID === book.bookID);
      
      if (existingItem) {
        // If the book is already in the cart, just update the quantity
        return prevCart.map(item =>
          item.book.bookID === book.bookID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the book is not in the cart, add it with quantity 1
        return [...prevCart, { book, quantity: 1 }];
      }
    });
    setToast({ show: true, message: `${book.title} added to cart!` }); // Set the toast for adding to cart
  };

  const removeFromCart = (bookId: number) => {
    const removedBook = cart.find((item) => item.book.bookID === bookId);
    if (removedBook) {
      setCart((prevCart) => prevCart.filter((item) => item.book.bookID !== bookId));
      setToast({ show: true, message: `${removedBook.book.title} removed from cart.` }); // Set the toast for removing from cart
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, toast, setToast }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
