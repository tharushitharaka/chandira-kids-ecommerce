import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('ck_cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('ck_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, variant, quantity = 1, wholesale = false) => {
    setItems((current) => {
      const key = `${product._id}-${variant.sku}-${wholesale}`;
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...current,
        {
          key,
          product: product._id,
          slug: product.slug,
          name: product.name,
          image: product.images?.[0]?.url,
          sku: variant.sku,
          size: variant.size,
          color: variant.color,
          price: wholesale ? product.wholesalePrice : product.price,
          retailPrice: product.price,
          wholesalePrice: product.wholesalePrice,
          quantity,
          wholesale
        }
      ];
    });
  };

  const updateQty = (key, quantity) => {
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity: Math.max(1, Number(quantity)) } : item))
    );
  };

  const removeItem = (key) => setItems((current) => current.filter((item) => item.key !== key));
  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingEstimate = subtotal > 15000 || subtotal === 0 ? 0 : 650;
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items, addItem, updateQty, removeItem, clearCart, subtotal, shippingEstimate, count }),
    [items, subtotal, shippingEstimate, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
