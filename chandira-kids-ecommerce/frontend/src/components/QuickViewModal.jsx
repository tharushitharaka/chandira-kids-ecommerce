import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiHeart, FiShoppingBag, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getDisplayPrice, getProductStock } from '../utils/productLabels';
import { mediaUrl } from '../utils/media';
import ProductLabels from './ProductLabels';

export default function QuickViewModal({ product, onClose }) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const [variantSku, setVariantSku] = useState(product?.variants?.[0]?.sku || '');
  const [qty, setQty] = useState(1);
  const [wholesale, setWholesale] = useState(false);

  if (!product) return null;

  const variant = product.variants?.find((v) => v.sku === variantSku) || product.variants?.[0];
  const stock = getProductStock(product);
  const { price, original, onSale } = getDisplayPrice(product);
  const displayPrice = wholesale ? product.wholesalePrice : price;

  const addToCart = () => {
    if (!variant) return;
    addItem(product, variant, Number(qty), wholesale);
    toast.success('Added to cart');
    onClose();
  };

  const addWishlist = async () => {
    if (!user) {
      toast.error('Please login to save wishlist items');
      return;
    }
    await api.post(`/users/wishlist/${product._id}`);
    toast.success('Added to wishlist');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <div className="relative z-10 grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-card md:grid-cols-2">
        <button className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 shadow-soft hover:bg-brand-blush" onClick={onClose} aria-label="Close">
          <FiX className="h-5 w-5" />
        </button>
        <div className="relative p-4">
          <img className="aspect-[4/5] w-full rounded-2xl object-cover" src={mediaUrl(product.images?.[0]?.url)} alt={product.name} loading="lazy" />
          <ProductLabels product={product} className="absolute left-6 top-6" />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-rose">{product.category}</p>
          <h2 className="font-display text-2xl font-bold text-ink">{product.name}</h2>
          <p className="text-body-sm text-muted line-clamp-3">{product.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-brand-rose">LKR {displayPrice.toLocaleString()}</span>
            {onSale && !wholesale && <span className="text-body-sm text-muted line-through">LKR {original.toLocaleString()}</span>}
          </div>
          {stock > 0 && stock <= 5 && (
            <p className="text-body-sm font-bold text-amber-600">Only {stock} left in stock!</p>
          )}
          <select value={variantSku} onChange={(e) => setVariantSku(e.target.value)}>
            {product.variants?.map((v) => (
              <option key={v.sku} value={v.sku}>{v.size} / {v.color} ({v.stock} left)</option>
            ))}
          </select>
          <div className="flex gap-3">
            <input className="w-24" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
            <label className="flex items-center gap-2 text-body-sm font-semibold text-muted">
              <input type="checkbox" checked={wholesale} onChange={(e) => setWholesale(e.target.checked)} /> Wholesale
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary flex-1" disabled={!variant || stock === 0} onClick={addToCart}>
              <FiShoppingBag /> Add to cart
            </button>
            <button className="btn-secondary px-4" onClick={addWishlist} aria-label="Wishlist">
              <FiHeart />
            </button>
          </div>
          <Link className="text-center text-body-sm font-bold text-brand-rose hover:underline" to={`/products/${product.slug}`} onClick={onClose}>
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
}