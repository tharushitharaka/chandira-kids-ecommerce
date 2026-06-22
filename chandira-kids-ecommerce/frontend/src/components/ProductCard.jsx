import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiColumns, FiEye, FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import { getDisplayPrice, getDiscountPercent, getProductStock } from '../utils/productLabels';
import { mediaUrl } from '../utils/media';
import ProductLabels from './ProductLabels';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const { addToCompare, items: compareItems } = useCompare();
  const [quickView, setQuickView] = useState(false);
  const firstVariant = product.variants?.[0];
  const stock = getProductStock(product);
  const { price, original, onSale } = getDisplayPrice(product);
  const hasPrice = price > 0;
  const colors = [...new Set(product.variants?.map((v) => v.color).filter(Boolean))].slice(0, 4);
  const sizes = [...new Set(product.variants?.map((v) => v.size).filter(Boolean))].slice(0, 4);
  const inCompare = compareItems?.some((p) => p._id === product._id);

  const addWishlist = async () => {
    if (!user) {
      toast.error('Please login to save wishlist items');
      return;
    }
    await api.post(`/users/wishlist/${product._id}`);
    toast.success('Added to wishlist');
  };

  const handleCompare = () => {
    const added = addToCompare(product);
    if (added) toast.success('Added to compare');
    else toast.error(inCompare ? 'Already in compare' : 'Compare limit reached (4)');
  };

  return (
    <>
      <article className="group overflow-hidden rounded-3xl border border-brand-blush/80 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand-pink hover:shadow-card dark:border-gray-700 dark:bg-gray-900">
        <div className="relative block overflow-hidden">
          <Link to={`/products/${product.slug}`}>
            <img
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
              src={mediaUrl(product.images?.[0]?.url)}
              alt={product.images?.[0]?.alt || product.name}
              loading="lazy"
            />
          </Link>
          <ProductLabels product={product} className="absolute left-3 top-3" />
          {onSale && (
            <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-extrabold text-white">
              -{getDiscountPercent(original, price)}%
            </span>
          )}
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
            <button className="rounded-full bg-white/95 p-2.5 shadow-soft hover:bg-brand-blush" onClick={() => setQuickView(true)} aria-label="Quick view">
              <FiEye className="h-4 w-4 text-brand-rose" />
            </button>
            <button className="rounded-full bg-white/95 p-2.5 shadow-soft hover:bg-brand-blush" onClick={handleCompare} aria-label="Compare">
              <FiColumns className="h-4 w-4 text-brand-rose" />
            </button>
          </div>
        </div>
        <div className="space-y-3 p-5">
          <div>
            <Link to={`/products/${product.slug}`} className="block text-lg font-bold leading-snug text-ink transition hover:text-brand-rose dark:text-white">
              {product.name}
            </Link>
            <p className="mt-1.5 text-body-sm font-medium text-muted">{product.ageRange}</p>
            {(colors.length || sizes.length) && (
              <div className="mt-2 flex flex-wrap gap-2">
                {colors.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-muted">Colors:</span>
                    <div className="flex gap-1">
                      {colors.map((c) => (
                        <span key={c} className="rounded-full bg-brand-blush/60 px-2 py-0.5 text-[10px] font-bold text-brand-rose dark:bg-gray-700">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
                {sizes.length > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-semibold text-muted">Sizes:</span>
                    <div className="flex gap-1">
                      {sizes.map((s) => (
                        <span key={s} className="rounded-full border border-brand-blush px-2 py-0.5 text-[10px] font-bold text-muted dark:border-gray-600">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {stock > 0 && stock <= 5 && (
            <p className="text-xs font-bold text-amber-600">Only {stock} left!</p>
          )}
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xl font-extrabold text-brand-rose">
                {hasPrice ? `LKR ${price.toLocaleString()}` : 'Contact for price'}
              </p>
              {onSale && <p className="text-body-sm text-muted line-through">LKR {original.toLocaleString()}</p>}
              <p className="mt-0.5 text-body-sm text-muted">
                {product.wholesalePrice > 0 ? `Wholesale LKR ${product.wholesalePrice.toLocaleString()}` : 'Wholesale on request'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-blush px-3 py-1.5 text-body-sm font-bold text-brand-rose dark:bg-gray-800">
              <FiStar className="h-4 w-4 fill-brand-rose text-brand-rose" />
              {product.averageRating?.toFixed?.(1) || '0.0'}
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2 pt-1">
            <button className="btn-primary py-3 text-body-sm" disabled={!firstVariant || !hasPrice || stock === 0} onClick={() => addItem(product, firstVariant)}>
              <FiShoppingBag className="h-4 w-4" /> {stock === 0 ? 'Out of stock' : hasPrice ? 'Add to cart' : 'Ask price'}
            </button>
            <button className="btn-secondary px-4 py-3" onClick={addWishlist} aria-label="Add to wishlist">
              <FiHeart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </article>
      {quickView && <QuickViewModal product={product} onClose={() => setQuickView(false)} />}
    </>
  );
}
