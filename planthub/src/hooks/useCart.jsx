// PlantHub — Cart Hook (shared state via context)

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { trackAddToCart, trackRemoveFromCart } from '../services/analytics';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, items:order_items(*)');
      
      if (!error && data) {
        // Map items structure to match what UI expects
        const mappedOrders = data.map(order => ({
          ...order,
          items: order.items || []
        }));
        setOrders(mappedOrders);
      }
    };
    fetchOrders();
  }, []);

  const addToCart = (product, customQty) => {
    const qtyToAdd = customQty || product.qty || 1;
    const size = product.selectedSize || 'Medium';
    const itemKey = `${product.id}-${size}`;

    const existing = cart.find(item => (item.cartKey || item.id) === itemKey || (item.id === product.id && item.selectedSize === size));
    if (existing) {
      setCart(cart.map(item =>
        ((item.cartKey || item.id) === itemKey || (item.id === product.id && item.selectedSize === size))
          ? { ...item, qty: item.qty + qtyToAdd }
          : item
      ));
    } else {
      setCart([...cart, { ...product, selectedSize: size, qty: qtyToAdd, cartKey: itemKey, cartId: Date.now() + Math.random() }]);
    }

    // Fire unified analytics tracking (GA4 + Meta Pixel + Funnel)
    trackAddToCart(product, qtyToAdd, size);
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find(item => item.id === productId);
    if (itemToRemove) {
      trackRemoveFromCart(itemToRemove);
    }
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.id === productId ? { ...item, qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }, [cart]);

  const addOrder = (order) => {
    setOrders(prev => [...prev, order]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
  };

  const value = {
    cart,
    orders,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addOrder,
    updateOrderStatus,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;
