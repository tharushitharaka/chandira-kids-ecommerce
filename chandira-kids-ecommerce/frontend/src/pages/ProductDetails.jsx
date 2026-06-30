import toast from 'react-hot-toast';
import { FiBell, FiCheckCircle, FiHeart, FiMessageCircle, FiMaximize, FiShare2, FiShoppingBag, FiStar, FiZap } from 'react-icons/fi';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import ImageZoom from '../components/ImageZoom';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductLabels from '../components/ProductLabels';
import SEO, { productJsonLd } from '../components/SEO';
import SizeRecommendation from '../components/SizeRecommendation';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { getDisplayPrice, getProductStock } from '../utils/productLabels';
import { mediaUrl } from '../utils/media';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [variantSku, setVariantSku] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [qty, setQty] = useState(1);
  const [wholesale, setWholesale] = useState(false);
  const [review, setReview] = useState({ rating: 5, title: '', comment: '' });
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notificationSent, setNotificationSent] = useState(false);
  const [showSizeRecommendation, setShowSizeRecommendation] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);

  const product = payload?.product;
  const selectedVariant = useMemo(() => product?.variants?.find((v) => v.sku === variantSku), [product, variantSku]);
  const stock = getProductStock(product);
  const { price, original, onSale } = getDisplayPrice(product || {});

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${slug}`).then(({ data }) => {
      setPayload(data);
      setVariantSku(data.product.variants?.[0]?.sku || '');
      setActiveImage(data.product.images?.[0]?.url || '');
      addToRecentlyViewed(data.product);
    }).catch((error) => {
      console.error('Error loading product:', error);
      toast.error('Failed to load product');
    }).finally(() => setLoading(false));
  }, [slug, addToRecentlyViewed]);

  useEffect(() => {
    if (!product?.category) return;
    api.get('/products', { params: { category: product.category, limit: 4 } }).then(({ data }) => {
      setCategoryProducts(data.products?.filter((p) => p._id !== product._id).slice(0, 4) || []);
    });
  }, [product]);

  if (loading) return <LoadingSpinner label="Loading product…" />;
  if (!product) return <div className="page-shell text-muted">Product not found.</div>;

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

  const notifyMe = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products/notify', {
        productId: product._id,
        email: notifyEmail || user?.email
      });
      setNotificationSent(true);
      toast.success('We\'ll notify you when this item is back in stock!');
    } catch (error) {
      toast.error('Failed to set up notification. Please try again.');
    }
  };

  const whatsappUrl = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent(`Hello Chandira Kids,\n\nI would like to place an order.\n\nProduct: ${product.name}\nQuantity: ${qty}\nCustomer Name:`)}`;
  const jsonLd = productJsonLd(product, mediaUrl(activeImage));

  return (
    <>
      <section className="page-shell grid gap-10 lg:grid-cols-2">
        <SEO
          title={product.seoTitle || `${product.name} | Chandira Kids`}
          description={product.seoDescription || product.description}
          image={mediaUrl(activeImage)}
          type="product"
          jsonLd={jsonLd}
        />
        <div className="space-y-4">
          <div className="relative">
            <ImageZoom src={activeImage} alt={product.name} />
            <ProductLabels product={product} className="absolute left-4 top-4 z-10" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image) => (
              <button className={`overflow-hidden rounded-2xl border ${activeImage === image.url ? 'border-brand-rose' : 'border-brand-blush'} bg-white dark:border-gray-600`} key={image.url} onClick={() => setActiveImage(image.url)}>
                <img className="aspect-square w-full object-cover" src={mediaUrl(image.url)} alt={image.alt || product.name} loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="font-bold uppercase tracking-wide text-brand-rose">{product.category}</p>
            <h1 className="mt-1 font-display text-4xl font-bold text-ink dark:text-white">{product.name}</h1>
            <p className="mt-1 text-sm font-semibold text-muted">Product code: {product.code}</p>
            <p className="mt-3 text-body text-muted">{product.description}</p>
          </div>

          <div className="panel grid gap-3 sm:grid-cols-2 dark:bg-gray-900">
            <div>
              <p className="text-sm text-muted">Retail price</p>
              <p className="text-2xl font-black text-brand-rose">LKR {price?.toLocaleString() || '0'}</p>
              {onSale && <p className="text-sm text-muted line-through">LKR {original?.toLocaleString() || '0'}</p>}
            </div>
            <div><p className="text-sm text-muted">Wholesale price</p><p className="text-2xl font-black text-ink dark:text-white">LKR {product.wholesalePrice?.toLocaleString() || '0'}</p></div>
            <div><p className="text-sm text-muted">Age group</p><strong className="text-ink dark:text-white">{product.ageCategory}</strong><p className="text-muted">{product.ageRange}</p></div>
            <div>
              <p className="text-sm text-muted">Stock</p>
              <strong className={stock > 5 ? 'text-emerald-600' : stock > 0 ? 'text-amber-600' : 'text-red-600'}>
                {stock > 0 ? (stock <= 5 ? `Only ${stock} left!` : `${stock} available`) : 'Out of stock'}
              </strong>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <select value={variantSku} onChange={(e) => setVariantSku(e.target.value)}>
              {product.variants.map((variant) => <option key={variant.sku} value={variant.sku}>{variant.size} / {variant.color} / {variant.stock} left</option>)}
            </select>
            <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
            <label className="flex items-center gap-2 rounded-2xl border border-brand-blush bg-white px-3 text-sm font-semibold text-muted dark:border-gray-600 dark:bg-gray-800">
              <input type="checkbox" checked={wholesale} onChange={(e) => setWholesale(e.target.checked)} /> Wholesale
            </label>
          </div>

          <button
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-brand-blush bg-brand-blush/30 px-4 py-3 text-sm font-semibold text-brand-rose transition hover:border-brand-pink hover:bg-brand-pink/20"
            onClick={() => setShowSizeRecommendation(true)}
          >
            <FiMaximize className="h-4 w-4" />
            Find My Size
          </button>

          <div className="rounded-3xl bg-brand-cream p-5 dark:bg-gray-800">
            <h2 className="font-bold text-ink dark:text-white">Wholesale discount tiers</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                [10, product.wholesalePrice],
                [25, Math.round(product.wholesalePrice * 0.95)],
                [50, Math.round(product.wholesalePrice * 0.9)]
              ].map(([min, tierPrice]) => (
                <div className="rounded-2xl bg-white p-3 dark:bg-gray-900" key={min}>
                  <strong className="text-ink dark:text-white">{min}+ items</strong>
                  <p className="mt-1 text-sm text-muted">LKR {tierPrice?.toLocaleString() || '0'}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="btn-primary" disabled={!selectedVariant || stock === 0} onClick={add}><FiShoppingBag /> Add To Cart</button>
            <button className="btn-secondary" disabled={!selectedVariant || stock === 0} onClick={buyNow}><FiZap /> Buy Now</button>
            {user && <button className="btn-secondary" onClick={async () => { await api.post(`/users/wishlist/${product._id}`); toast.success('Added to wishlist'); }}><FiHeart /> Wishlist</button>}
            <button className="btn-secondary" onClick={share}><FiShare2 /> Share</button>
            <a className="btn-secondary" href={whatsappUrl} target="_blank" rel="noreferrer"><FiMessageCircle /> WhatsApp</a>
          </div>

          {stock === 0 && (
            <div className="rounded-2xl bg-brand-blush/30 p-4">
              {notificationSent ? (
                <div className="flex items-center gap-2 text-emerald-600">
                  <FiCheckCircle className="h-5 w-5" />
                  <span className="font-semibold">We'll notify you when this item is back in stock!</span>
                </div>
              ) : (
                <>
                  <p className="mb-3 text-body-sm font-semibold text-ink">Notify me when back in stock</p>
                  <form onSubmit={notifyMe} className="flex gap-2">
                    <input
                      className="flex-1"
                      type="email"
                      placeholder="Your email address"
                      value={notifyEmail || user?.email || ''}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      required
                    />
                    <button className="btn-primary" type="submit">
                      <FiBell className="mr-2 h-4 w-4" />
                      Notify Me
                    </button>
                  </form>
                </>
              )}
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-xl font-black text-ink dark:text-white">Reviews ({product.reviewCount || 0})</h2>
            {payload.reviews.map((item) => (
              <div key={item._id} className="panel dark:bg-gray-900">
                <div className="flex items-center gap-1 text-brand-gold">{Array.from({ length: item.rating }, (_, i) => <FiStar key={i} className="fill-current" />)}</div>
                <p className="mt-2 font-bold text-ink dark:text-white">{item.title}</p>
                <p className="text-sm text-muted">{item.comment}</p>
              </div>
            ))}
            {user && (
              <form className="panel grid gap-3 dark:bg-gray-900" onSubmit={submitReview}>
                <select value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select>
                <input placeholder="Review title" value={review.title} onChange={(e) => setReview({ ...review, title: e.target.value })} required />
                <textarea placeholder="Your review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required />
                <button className="btn-primary">Submit review</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="page-shell py-10">
        <h2 className="section-title mb-6">You Might Also Like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{categoryProducts.map((item) => <ProductCard key={item._id} product={item} />)}</div>
      </section>

      <section className="page-shell pb-10">
        <h2 className="section-title mb-6">Related products</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{payload.relatedProducts?.map((item) => <ProductCard key={item._id} product={item} />)}</div>
      </section>

      {showSizeRecommendation && (
        <SizeRecommendation
          onClose={() => setShowSizeRecommendation(false)}
          onSelectSize={(size) => {
            const matchingVariant = product.variants.find(v => v.size.includes(size));
            if (matchingVariant) setVariantSku(matchingVariant.sku);
          }}
        />
      )}
    </>
  );
}
