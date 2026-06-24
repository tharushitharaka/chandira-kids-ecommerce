import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import { getEstimatedDeliveryDate } from '../utils/delivery';
import { mediaUrl } from '../utils/media';

export default function Cart() {
  const { items, subtotal, shippingEstimate, updateQty, toggleWholesale, removeItem } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponLabel, setCouponLabel] = useState('');
  const deliveryDate = getEstimatedDeliveryDate();

  const applyCoupon = async () => {
    if (!coupon.trim()) {
      toast.error('Enter a coupon code');
      return;
    }
    try {
      const { data } = await api.post('/orders/quote', {
        items: items.map((item) => ({ product: item.product, quantity: item.quantity, wholesale: item.wholesale })),
        couponCode: coupon
      });
      setDiscount(data.discount || 0);
      setCouponLabel(coupon.toUpperCase());
      toast.success(data.discount > 0 ? 'Coupon applied!' : 'Coupon not valid for this order');
    } catch {
      toast.error('Could not validate coupon');
    }
  };

  useEffect(() => {
    if (!coupon) {
      setDiscount(0);
      setCouponLabel('');
    }
  }, [items, coupon]);

  const total = subtotal - discount + shippingEstimate;

  return (
    <section className="page-shell max-w-6xl">
      <SEO title="Cart | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">Bag</p>
        <h1 className="mt-2 text-3xl font-black text-ink dark:text-white">Cart</h1>
        <p className="mt-2 muted-text">Review your selected pieces before checkout</p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-4">
          {!items.length && (
            <div className="surface-card text-center">
              <p className="text-muted">Your cart is empty.</p>
              <Link className="btn-primary mt-4 inline-flex" to="/shop">Shop now</Link>
            </div>
          )}
          {items.map((item) => (
            <div key={item.key} className="panel grid gap-4 md:grid-cols-[96px_1fr_auto_auto] md:items-center dark:bg-gray-900">
              <img className="h-24 w-24 rounded-2xl object-cover" src={mediaUrl(item.image)} alt={item.name} loading="lazy" />
              <div>
                <Link className="font-bold text-ink hover:text-brand-rose dark:text-white" to={`/products/${item.slug}`}>{item.name}</Link>
                <p className="text-sm text-muted">{item.size} / {item.color} / {item.sku}</p>
                <p className="mt-1 text-sm text-muted">{item.wholesale ? 'Wholesale' : 'Retail'} • LKR {(item.price || 0).toLocaleString()}</p>
                <label className="mt-2 flex items-center gap-2 text-body-sm font-semibold text-muted">
                  <input type="checkbox" checked={item.wholesale} onChange={() => toggleWholesale(item.key)} /> Wholesale pricing
                </label>
              </div>
              <input className="w-24" type="number" min="1" value={item.quantity} onChange={(e) => updateQty(item.key, e.target.value)} />
              <button className="btn-secondary px-3" onClick={() => removeItem(item.key)} aria-label="Remove item"><FiTrash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        <aside className="panel h-fit space-y-3 dark:bg-gray-900">
          <h2 className="text-xl font-black text-ink dark:text-white">Order summary</h2>
          <div className="flex gap-2">
            <input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button className="btn-secondary shrink-0 px-4" onClick={applyCoupon}>Apply</button>
          </div>
          {couponLabel && discount > 0 && <p className="text-body-sm font-semibold text-emerald-600">{couponLabel} applied (−LKR {discount.toLocaleString()})</p>}
          <div className="rounded-2xl bg-brand-cream p-3 text-body-sm text-muted dark:bg-gray-800">
            <strong className="text-ink dark:text-white">Estimated delivery:</strong> {deliveryDate}
          </div>
          <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><strong className="text-ink dark:text-white">LKR {subtotal.toLocaleString()}</strong></div>
          {discount > 0 && <div className="flex justify-between text-sm"><span className="text-muted">Discount</span><strong className="text-emerald-600">−LKR {discount.toLocaleString()}</strong></div>}
          <div className="flex justify-between text-sm"><span className="text-muted">Shipping estimate</span><strong className="text-ink dark:text-white">{shippingEstimate ? `LKR ${shippingEstimate.toLocaleString()}` : 'Free'}</strong></div>
          <div className="flex justify-between border-t border-brand-blush pt-3 text-base font-bold text-ink dark:border-gray-700 dark:text-white"><span>Total</span><strong>LKR {total.toLocaleString()}</strong></div>
          <Link className="btn-primary w-full" to="/checkout">Checkout</Link>
          <p className="text-center text-xs text-muted">Guest checkout available — no account required</p>
        </aside>
      </div>
    </section>
  );
}
