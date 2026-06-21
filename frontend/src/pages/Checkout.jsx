import { useState } from 'react';
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
  const [form, setForm] = useState({ fullName: '', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'Sri Lanka', phone: '', email: user?.email || '' });
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      items: items.map((item) => ({ product: item.product, sku: item.sku, quantity: item.quantity, wholesale: item.wholesale })),
      shippingAddress: form,
      guestEmail: form.email,
      couponCode,
      paymentMethod: 'cod'
    };
    const { data } = await api.post('/orders', payload);
    clearCart();
    setMessage(`Order ${data.orderNumber} placed successfully.`);
    setTimeout(() => navigate('/shop'), 1600);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <SEO title="Checkout | Chandira Kids" />
      <h1 className="mb-6 text-3xl font-black">Checkout</h1>
      {message && <p className="mb-4 rounded-md bg-mint p-3 font-bold text-mulberry">{message}</p>}
      <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={submit}>
        <div className="panel grid gap-3">
          <input placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <input placeholder="Address line 1" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} required />
          <input placeholder="Address line 2" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} />
          <div className="grid gap-3 md:grid-cols-3">
            <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
            <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
            <input placeholder="Postal code" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
          </div>
        </div>
        <aside className="panel h-fit space-y-3">
          <h2 className="font-black">Order summary</h2>
          {items.map((item) => <div key={item.key} className="flex justify-between text-sm"><span>{item.name} x {item.quantity}</span><strong>LKR {(item.price * item.quantity).toLocaleString()}</strong></div>)}
          <input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
          <button className="btn-primary w-full" disabled={!items.length}>Place order</button>
        </aside>
      </form>
    </section>
  );
}
