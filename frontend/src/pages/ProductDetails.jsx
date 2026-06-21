import toast from 'react-hot-toast';
import { FiHeart, FiMessageCircle, FiShare2, FiShoppingBag, FiStar, FiZap } from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { mediaUrl } from '../utils/media';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [payload, setPayload] = useState(null);
  const [variantSku, setVariantSku] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [qty, setQty] = useState(1);
  const [wholesale, setWholesale] = useState(false);
  const [review, setReview] = useState({ rating: 5, title: '', comment: '' });

  useEffect(() => {
    api.get(`/products/${slug}`).then(({ data }) => {
      setPayload(data);
      setVariantSku(data.product.variants?.[0]?.sku || '');
      setActiveImage(data.product.images?.[0]?.url || '');
    });
  }, [slug]);

  const product = payload?.product;
  const selectedVariant = useMemo(() => product?.variants?.find((variant) => variant.sku === variantSku), [product, variantSku]);
  const stock = product?.variants?.reduce((sum, variant) => sum + variant.stock, 0) || 0;

  if (!product) return <div className="mx-auto max-w-7xl px-4 py-12">Loading product...</div>;

  const submitReview = async (event) => {
    event.preventDefault();
    await api.post(`/reviews/${product._id}`, review);
    const { data } = await api.get(`/products/${slug}`);
    setPayload(data);
    setReview({ rating: 5, title: '', comment: '' });
    toast.success('Review submitted');
  };

  const add = () => {
    addItem(product, selectedVariant, Number(qty), wholesale);
    toast.success('Added to cart');
  };

  const buyNow = () => {
    add();
    navigate('/checkout');
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: product.name, url });
    else {
      await navigator.clipboard.writeText(url);
      toast.success('Product link copied');
    }
  };

  const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent(`Hello Chandira Kids,\n\nI would like to place an order.\n\nProduct: ${product.name}\nQuantity: ${qty}\nCustomer Name:`)}`;

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-2">
        <SEO title={product.seoTitle || `${product.name} | Chandira Kids`} description={product.seoDescription || product.description} />
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <img className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-110" src={mediaUrl(activeImage)} alt={product.name} />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image) => (
              <button className="overflow-hidden rounded-lg border border-stone-200" key={image.url} onClick={() => setActiveImage(image.url)}>
                <img className="aspect-square w-full object-cover" src={mediaUrl(image.url)} alt={image.alt || product.name} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="font-bold uppercase text-petal">{product.category}</p>
            <h1 className="text-4xl font-black">{product.name}</h1>
            <p className="mt-1 text-sm font-bold text-teal">Product code: {product.code}</p>
            <p className="mt-3 text-stone-600">{product.description}</p>
          </div>

          <div className="panel grid gap-3 sm:grid-cols-2">
            <div><p className="text-sm text-stone-500">Retail price</p><p className="text-2xl font-black">LKR {product.price.toLocaleString()}</p></div>
            <div><p className="text-sm text-stone-500">Wholesale price</p><p className="text-2xl font-black">LKR {product.wholesalePrice.toLocaleString()}</p></div>
            <div><p className="text-sm text-stone-500">Age group</p><strong>{product.ageCategory}</strong><p>{product.ageRange}</p></div>
            <div><p className="text-sm text-stone-500">Stock availability</p><strong className={stock > 5 ? 'text-teal' : 'text-primary'}>{stock > 0 ? `${stock} available` : 'Out of stock'}</strong></div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <select value={variantSku} onChange={(e) => setVariantSku(e.target.value)}>
              {product.variants.map((variant) => <option key={variant.sku} value={variant.sku}>{variant.size} / {variant.color} / {variant.stock} left</option>)}
            </select>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
            <label className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3">
              <input type="checkbox" checked={wholesale} onChange={(e) => setWholesale(e.target.checked)} /> Wholesale
            </label>
          </div>

          <div className="rounded-lg bg-cloud p-4">
            <h2 className="font-black">Wholesale discount tiers</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                [10, product.wholesalePrice],
                [25, Math.round(product.wholesalePrice * 0.95)],
                [50, Math.round(product.wholesalePrice * 0.9)]
              ].map(([min, price]) => <div className="rounded-md bg-white p-3" key={min}><strong>{min}+ items</strong><p>LKR {price.toLocaleString()}</p></div>)}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="btn-primary" disabled={!selectedVariant || stock === 0} onClick={add}><FiShoppingBag /> Add To Cart</button>
            <button className="btn-secondary" disabled={!selectedVariant || stock === 0} onClick={buyNow}><FiZap /> Buy Now</button>
            {user && <button className="btn-secondary" onClick={async () => { await api.post(`/users/wishlist/${product._id}`); toast.success('Added to wishlist'); }}><FiHeart /> Add To Wishlist</button>}
            <button className="btn-secondary" onClick={share}><FiShare2 /> Share Product</button>
            <a className="btn-secondary" href={whatsappUrl} target="_blank" rel="noreferrer"><FiMessageCircle /> WhatsApp</a>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-black">Reviews</h2>
            {payload.reviews.map((item) => (
              <div key={item._id} className="panel">
                <div className="flex items-center gap-1 text-gold">{Array.from({ length: item.rating }, (_, i) => <FiStar key={i} />)}</div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-stone-600">{item.comment}</p>
              </div>
            ))}
            {user && (
              <form className="panel grid gap-3" onSubmit={submitReview}>
                <select value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select>
                <input placeholder="Review title" value={review.title} onChange={(e) => setReview({ ...review, title: e.target.value })} required />
                <textarea placeholder="Your review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required />
                <button className="btn-primary">Submit review</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="section-title mb-6">Related products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{payload.relatedProducts?.map((item) => <ProductCard key={item._id} product={item} />)}</div>
      </section>
    </>
  );
}
