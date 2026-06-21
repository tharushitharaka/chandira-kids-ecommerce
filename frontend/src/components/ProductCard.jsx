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
    <article className="group overflow-hidden rounded-[28px] border border-[#ece3cf] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product.slug}`} className="block overflow-hidden">
        <img className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" src={mediaUrl(product.images?.[0]?.url)} alt={product.images?.[0]?.alt || product.name} />
      </Link>
      <div className="space-y-3 p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b38a50]">{product.category}</p>
          <Link to={`/products/${product.slug}`} className="mt-1 block text-base font-black text-[#171717] hover:text-[#b38a50]">
            {product.name}
          </Link>
          <p className="mt-1 text-sm text-[#6a5f50]">{product.ageRange}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-black text-[#171717]">{hasPrice ? `LKR ${product.price.toLocaleString()}` : 'Contact for price'}</p>
            <p className="text-xs text-[#6a5f50]">
              {product.wholesalePrice > 0 ? `Wholesale LKR ${product.wholesalePrice.toLocaleString()}` : 'Wholesale price on request'}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#fffaf1] px-3 py-1 text-sm font-semibold text-[#b38a50]">
            <FiStar className="h-4 w-4" /> {product.averageRating?.toFixed?.(1) || '0.0'}
          </span>
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
