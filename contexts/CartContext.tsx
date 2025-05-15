import { getCartFromStorage, saveCartToStorage } from '@/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Interface of a single cart item
export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: any) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeFromCart: (id: number) => void;
    total: number;
}

// cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Context Provider for Cart 
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // On first mount, load cart data from async storage 
    useEffect(() => {
        (async () => {
            const storedCart = await getCartFromStorage();
            setCart(storedCart);
        })();
    }, []);

    // Whenever cart state changes, save it to persistent storage
    useEffect(() => {
        saveCartToStorage(cart);
    }, [cart]);

    // Add to cart func. 
    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(crt => crt?.id === item?.id);
            if (existing) {
                return prev.map(crt =>
                    crt?.id === item?.id ? { ...crt, quantity: crt?.quantity + 1 } : crt
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    // Remove from cart by item id func. 
    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    // Func. to update the quantity of an item stored
    const updateQuantity = (id: number, quantity: number) => {
        setCart(prev =>
            prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
        );
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, total }}>
            {children}
        </CartContext.Provider>
    );
};


// Custom hook to use cart context inside components
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
