import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const item = localStorage.getItem('planthub_wishlist');
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.warn("Failed to load wishlist from local storage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('planthub_wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.warn("Failed to save wishlist to local storage", error);
    }
  }, [wishlist]);

  const addToWishlist = (product) => {
    const existing = wishlist.find(item => item.id === product.id);
    if (!existing) {
      setWishlist([...wishlist, { ...product }]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => setWishlist([]);

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const value = {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export default WishlistContext;
