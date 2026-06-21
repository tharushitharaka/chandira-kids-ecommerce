import toast from 'react-hot-toast';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { mediaUrl } from '../utils/media';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const firstVariant = product.variants?.[0];
  const hasPrice = product.price > 0;

  const addWishlist = async () => {
    if (!user) {
      toast.error('Please login to save wishlist items');
      return;
    }
    await api.post(`/users/wishlist/${product._id}`);
    toast.success('Added to wishlist');
  };

  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white">
      <Link to={`/products/${product.slug}`}>
        <img className="aspect-[4/5] w-full object-cover" src={mediaUrl(product.images?.[0]?.url)} alt={product.images?.[0]?.alt || product.name} />
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-bold uppercase text-petal">{product.category}</p>
          <Link to={`/products/${product.slug}`} className="font-bold hover:text-mulberry">{product.name}</Link>
          <p className="text-sm text-stone-500">{product.ageRange}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black">{hasPrice ? `LKR ${product.price.toLocaleString()}` : 'Contact for price'}</p>
            <p className="text-xs text-stone-500">
              {product.wholesalePrice > 0 ? `Wholesale LKR ${product.wholesalePrice.toLocaleString()}` : 'Wholesale price on request'}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm"><FiStar className="h-4 w-4 text-petal" /> {product.averageRating?.toFixed?.(1) || '0.0'}</span>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <button className="btn-primary" disabled={!firstVariant || !hasPrice} onClick={() => addItem(product, firstVariant)}>
            <FiShoppingBag className="h-4 w-4" /> {hasPrice ? 'Add' : 'Ask price'}
          </button>
          <button className="btn-secondary px-3" onClick={addWishlist} aria-label="Add to wishlist"><FiHeart className="h-4 w-4" /></button>
        </div>
      </div>
    </article>
  );
}
