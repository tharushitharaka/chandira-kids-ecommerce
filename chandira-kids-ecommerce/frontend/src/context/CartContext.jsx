import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('ck_cart');
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored);
      // Filter out invalid items and add default price if missing
      return parsed.filter(item => item && item.key).map(item => ({
        ...item,
        price: item.price ?? (item.wholesale ? item.wholesalePrice : item.salePrice ?? item.retailPrice) ?? 0,
        salePrice: item.salePrice ?? item.retailPrice ?? 0,
        retailPrice: item.retailPrice ?? item.salePrice ?? 0,
        wholesalePrice: item.wholesalePrice ?? 0
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ck_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, variant, quantity = 1, wholesale = false) => {
    setItems((current) => {
      const key = `${product._id}-${variant.sku}`;
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: item.quantity + quantity,
                wholesale,
                price: wholesale ? product.wholesalePrice : product.salePrice
              }
            : item
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
          price: wholesale ? product.wholesalePrice : product.salePrice,
          salePrice: product.salePrice,
          retailPrice: product.salePrice,
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

  const toggleWholesale = (key) => {
    setItems((current) =>
      current.map((item) => {
        if (item.key !== key) return item;
        const wholesale = !item.wholesale;
        return {
          ...item,
          wholesale,
          price: wholesale ? item.wholesalePrice : item.salePrice
        };
      })
    );
  };

  const removeItem = (key) => setItems((current) => current.filter((item) => item.key !== key));
  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingEstimate = subtotal > 15000 || subtotal === 0 ? 0 : 650;
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items, addItem, updateQty, toggleWholesale, removeItem, clearCart, subtotal, shippingEstimate, count }),
    [items, subtotal, shippingEstimate, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
