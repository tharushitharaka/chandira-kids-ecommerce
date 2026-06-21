import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [form, setForm] = useState({ fullName: '', line1: '', line2: '', city: '', state: '', district: '', postalCode: '', country: 'Sri Lanka', phone: '', email: user?.email || '', notes: '', paymentMethod: 'cod' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/public/payment-methods').then(({ data }) => setPaymentMethods(data));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
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
    setMessage(`Order ${data.order.orderNumber} placed successfully.`);
    setTimeout(() => navigate('/shop'), 1600);
  };

  return (
    <section className="page-shell max-w-6xl">
      <SEO title="Checkout | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">Checkout</p>
        <h1 className="mt-2 text-3xl font-black text-[#171717]">Checkout</h1>
        <p className="mt-2 muted-text">Complete your order securely</p>
      </div>
      {message && <p className="mb-4 mt-6 rounded-2xl bg-emerald-50 p-3 font-bold text-emerald-700">{message}</p>}
      <form className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" onSubmit={submit}>
        <div className="panel grid gap-3">
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
          <textarea placeholder="Order notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
            {paymentMethods.map((method) => <option key={method.id} value={method.id}>{method.label}</option>)}
          </select>
        </div>
        <aside className="panel h-fit space-y-3">
          <h2 className="text-xl font-black text-[#171717]">Order summary</h2>
          {items.map((item) => <div key={item.key} className="flex justify-between text-sm"><span className="text-[#5c5144]">{item.name} x {item.quantity}</span><strong className="text-[#171717]">LKR {(item.price * item.quantity).toLocaleString()}</strong></div>)}
          <input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
          <button className="btn-primary w-full" disabled={!items.length}>Place order</button>
        </aside>
      </form>
    </section>
  );
}
