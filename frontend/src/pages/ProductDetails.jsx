import toast from 'react-hot-toast';
import { FiHeart, FiMessageCircle, FiStar } from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { mediaUrl } from '../utils/media';

export default function ProductDetails() {
  const { slug } = useParams();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [payload, setPayload] = useState(null);
  const [variantSku, setVariantSku] = useState('');
  const [qty, setQty] = useState(1);
  const [wholesale, setWholesale] = useState(false);
  const [review, setReview] = useState({ rating: 5, title: '', comment: '' });

  useEffect(() => {
    api.get(`/products/${slug}`).then(({ data }) => {
      setPayload(data);
      setVariantSku(data.product.variants?.[0]?.sku || '');
    });
  }, [slug]);

  const product = payload?.product;
  const selectedVariant = useMemo(() => product?.variants?.find((variant) => variant.sku === variantSku), [product, variantSku]);

  if (!product) return <div className="mx-auto max-w-7xl px-4 py-12">Loading product...</div>;
  const hasPrice = product.price > 0;

  const submitReview = async (event) => {
    event.preventDefault();
    await api.post(`/reviews/${product._id}`, review);
    const { data } = await api.get(`/products/${slug}`);
    setPayload(data);
    setReview({ rating: 5, title: '', comment: '' });
  };

  const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent(`Hi Chandira Kids, I want to order ${product.name} (${selectedVariant?.sku || ''})`)}`;

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2">
      <SEO title={product.seoTitle || `${product.name} | Chandira Kids`} description={product.seoDescription || product.description} />
      <div className="grid gap-3 sm:grid-cols-2">
        {product.images.map((image) => (
          <img key={image.url} className="aspect-[4/5] w-full rounded-lg object-cover" src={mediaUrl(image.url)} alt={image.alt || product.name} />
        ))}
      </div>
      <div className="space-y-6">
        <div>
          <p className="font-bold uppercase text-petal">{product.category}</p>
          <h1 className="text-4xl font-black">{product.name}</h1>
          <p className="mt-2 text-stone-600">{product.description}</p>
        </div>
        <div className="panel grid gap-3 sm:grid-cols-2">
          <div><p className="text-sm text-stone-500">Retail price</p><p className="text-2xl font-black">{hasPrice ? `LKR ${product.price.toLocaleString()}` : 'Contact for price'}</p></div>
          <div><p className="text-sm text-stone-500">Wholesale price</p><p className="text-2xl font-black">{product.wholesalePrice > 0 ? `LKR ${product.wholesalePrice.toLocaleString()}` : 'On request'}</p><p className="text-xs">Minimum {product.wholesaleMinQty} pieces</p></div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <select value={variantSku} onChange={(e) => setVariantSku(e.target.value)}>
            {product.variants.map((variant) => <option key={variant.sku} value={variant.sku}>{variant.size} / {variant.color}</option>)}
          </select>
          <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
          <label className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3">
            <input type="checkbox" checked={wholesale} onChange={(e) => setWholesale(e.target.checked)} /> Wholesale
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="btn-primary" disabled={!hasPrice} onClick={() => addItem(product, selectedVariant, Number(qty), wholesale)}>{hasPrice ? 'Add to cart' : 'Price pending'}</button>
          <a className="btn-secondary" href={whatsappUrl} target="_blank" rel="noreferrer"><FiMessageCircle className="h-4 w-4" /> WhatsApp order</a>
          {user && <button className="btn-secondary" onClick={async () => { await api.post(`/users/wishlist/${product._id}`); toast.success('Added to wishlist'); }}><FiHeart className="h-4 w-4" /> Save</button>}
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-black">Reviews</h2>
          {payload.reviews.map((item) => (
            <div key={item._id} className="panel">
              <div className="flex items-center gap-1 text-petal">{Array.from({ length: item.rating }, (_, i) => <FiStar key={i} className="h-4 w-4" />)}</div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-stone-600">{item.comment}</p>
            </div>
          ))}
          {user && (
            <form className="panel grid gap-3" onSubmit={submitReview}>
              <select value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}
              </select>
              <input placeholder="Review title" value={review.title} onChange={(e) => setReview({ ...review, title: e.target.value })} required />
              <textarea placeholder="Your review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required />
              <button className="btn-primary">Submit review</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
