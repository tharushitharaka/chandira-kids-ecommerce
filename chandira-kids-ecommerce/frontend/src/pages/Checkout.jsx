import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiShield, FiTruck, FiCheckCircle } from 'react-icons/fi';
import api from '../api/client';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { getEstimatedDeliveryDate } from '../utils/delivery';

export default function Checkout() {
  const { items, subtotal, shippingEstimate, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', line1: '', line2: '', city: '', state: '', district: '', postalCode: '',
    country: 'Sri Lanka', phone: '', email: user?.email || '', notes: '', paymentMethod: 'cod'
  });
  const deliveryDate = getEstimatedDeliveryDate();

  useEffect(() => {
    api.get('/public/payment-methods').then(({ data }) => setPaymentMethods(data));
  }, []);

  useEffect(() => {
    if (!items.length) return;
    api.post('/orders/quote', {
      items: items.map((item) => ({ product: item.product, sku: item.sku, quantity: item.quantity, wholesale: item.wholesale })),
      couponCode
    }).then(({ data }) => setDiscount(data.discount || 0)).catch(() => setDiscount(0));
  }, [items, couponCode]);

  const applyCoupon = async () => {
    const { data } = await api.post('/orders/quote', {
      items: items.map((item) => ({ product: item.product, sku: item.sku, quantity: item.quantity, wholesale: item.wholesale })),
      couponCode
    });
    setDiscount(data.discount || 0);
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = {
        items: items.map((item) => ({ product: item.product, sku: item.sku, quantity: item.quantity, wholesale: item.wholesale })),
        shippingAddress: form,
        guestEmail: form.email,
        couponCode,
        paymentMethod: form.paymentMethod,
        notes: form.notes
      };
      const { data } = await api.post('/orders', payload);
      clearCart();
      navigate(`/order-confirmation?order=${data.order.orderNumber}`);
    } finally {
      setLoading(false);
    }
  };

  const total = subtotal - discount + shippingEstimate;

  return (
    <section className="page-shell max-w-6xl">
      <SEO title="Checkout | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">Checkout</p>
        <h1 className="mt-2 text-3xl font-black text-ink dark:text-white">Checkout</h1>
        <p className="mt-2 muted-text">Complete your order securely — guest checkout welcome</p>
      </div>
      <form className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" onSubmit={submit}>
        <div className="panel grid gap-3 dark:bg-gray-900">
          <input placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <input placeholder="Address" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} required />
          <input placeholder="Address line 2" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} />
          <div className="grid gap-3 md:grid-cols-3">
            <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            <input placeholder="District" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} required />
            <input placeholder="Postal code" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-body-sm font-bold text-ink dark:text-white">Order notes (delivery instructions, gift message, etc.)</label>
            <textarea className="min-h-[100px]" placeholder="Add any special instructions for your order…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
          <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
            {paymentMethods.map((method) => <option key={method.id} value={method.id}>{method.label}</option>)}
          </select>
        </div>
        <aside className="panel h-fit space-y-3 dark:bg-gray-900">
          <h2 className="text-xl font-black text-ink dark:text-white">Order summary</h2>
          {items.map((item) => <div key={item.key} className="flex justify-between text-sm"><span className="text-muted">{item.name} x {item.quantity}</span><strong className="text-ink dark:text-white">LKR {(item.price * item.quantity).toLocaleString()}</strong></div>)}
          <div className="flex gap-2">
            <input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
            <button type="button" className="btn-secondary shrink-0 px-4" onClick={applyCoupon}>Apply</button>
          </div>
          <div className="rounded-2xl bg-brand-cream p-3 text-body-sm dark:bg-gray-800">
            <strong className="text-ink dark:text-white">Est. delivery:</strong> {deliveryDate}
          </div>
          <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><strong>LKR {subtotal.toLocaleString()}</strong></div>
          {discount > 0 && <div className="flex justify-between text-sm"><span className="text-muted">Discount</span><strong className="text-emerald-600">−LKR {discount.toLocaleString()}</strong></div>}
          <div className="flex justify-between text-sm"><span className="text-muted">Shipping</span><strong>{shippingEstimate ? `LKR ${shippingEstimate.toLocaleString()}` : 'Free'}</strong></div>
          <div className="flex justify-between border-t border-brand-blush pt-3 font-bold dark:border-gray-700"><span>Total</span><strong className="text-brand-rose">LKR {total.toLocaleString()}</strong></div>
          <button className="btn-primary w-full" disabled={!items.length || loading}>{loading ? 'Placing order…' : 'Place order'}</button>

          <div className="mt-4 rounded-2xl bg-brand-cream p-4 dark:bg-gray-800">
            <h3 className="mb-3 text-sm font-bold text-ink dark:text-white">Trust & security</h3>
            <div className="grid gap-2">
              {[
                { icon: FiLock, text: 'SSL encrypted checkout' },
                { icon: FiShield, text: 'Secure payment processing' },
                { icon: FiTruck, text: 'Island-wide delivery' },
                { icon: FiCheckCircle, text: 'Quality guaranteed' }
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-muted">
                  <Icon className="h-4 w-4 text-brand-rose" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-brand-blush p-4 dark:border-gray-700">
            <h3 className="mb-2 text-sm font-bold text-ink dark:text-white">Accepted payments</h3>
            <div className="flex flex-wrap gap-2 text-xs text-muted">
              <span className="rounded-full bg-white px-3 py-1.5 font-semibold shadow-soft dark:bg-gray-700 dark:text-white">Cash on Delivery</span>
              <span className="rounded-full bg-white px-3 py-1.5 font-semibold shadow-soft dark:bg-gray-700 dark:text-white">Bank Transfer</span>
              <span className="rounded-full bg-white px-3 py-1.5 font-semibold shadow-soft dark:bg-gray-700 dark:text-white">Card</span>
              <span className="rounded-full bg-white px-3 py-1.5 font-semibold shadow-soft dark:bg-gray-700 dark:text-white">WhatsApp Pay</span>
            </div>
          </div>
        </aside>
      </form>
    </section>
  );
}
