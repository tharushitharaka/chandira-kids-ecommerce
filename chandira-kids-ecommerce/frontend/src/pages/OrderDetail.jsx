import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/client';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { getEstimatedDeliveryDate } from '../utils/delivery';

export default function OrderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (user) {
          const { data } = await api.get(`/orders/${id}`);
          setOrder(data);
          return;
        }
        const { data } = await api.get(`/orders/track/${id}`);
        setOrder(data);
      } catch {
        setError('Order not found or you do not have access.');
      }
    };
    load();
  }, [id, user]);

  if (!order && !error) return <LoadingSpinner label="Loading order…" />;
  if (error) {
    return (
      <section className="page-shell">
        <p className="text-red-600">{error}</p>
        <Link className="btn-primary mt-4 inline-flex" to="/dashboard">Go to account</Link>
      </section>
    );
  }

  const items = order.items || [];
  const deliveryDate = getEstimatedDeliveryDate();

  return (
    <section className="page-shell max-w-4xl">
      <SEO title={`Order ${order.orderNumber || id} | Chandira Kids`} />
      <div className="page-hero mb-8">
        <p className="badge-tag">Order</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink dark:text-white">{order.orderNumber || id}</h1>
        <p className="mt-2 text-body text-muted">Status: <strong className="text-brand-rose">{order.status}</strong></p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-card space-y-4">
          <h2 className="text-lg font-bold text-ink dark:text-white">Items</h2>
          {items.length ? items.map((item, index) => (
            <div key={index} className="flex justify-between gap-4 border-b border-brand-blush pb-3 text-body-sm dark:border-gray-700">
              <span className="text-muted">{item.name} × {item.quantity}</span>
              <strong className="text-ink dark:text-white">LKR {(item.price * item.quantity).toLocaleString()}</strong>
            </div>
          )) : <p className="text-muted">Item details available in your confirmation email.</p>}
          {order.notes && (
            <div className="rounded-2xl bg-brand-cream p-4 dark:bg-gray-800">
              <p className="text-xs font-bold uppercase text-brand-rose">Order notes</p>
              <p className="mt-1 text-body-sm text-muted">{order.notes}</p>
            </div>
          )}
        </div>
        <aside className="surface-card space-y-3">
          <h2 className="text-lg font-bold text-ink dark:text-white">Summary</h2>
          {order.subtotal != null && (
            <>
              <div className="flex justify-between text-body-sm"><span className="text-muted">Subtotal</span><span>LKR {order.subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-body-sm"><span className="text-muted">Discount</span><span>LKR {(order.discount || 0).toLocaleString()}</span></div>
              <div className="flex justify-between text-body-sm"><span className="text-muted">Shipping</span><span>LKR {(order.shippingFee || 0).toLocaleString()}</span></div>
              <div className="flex justify-between border-t border-brand-blush pt-3 font-bold dark:border-gray-700">
                <span>Total</span><span className="text-brand-rose">LKR {order.total?.toLocaleString()}</span>
              </div>
            </>
          )}
          <p className="text-body-sm text-muted">Est. delivery: {deliveryDate}</p>
          {order.shippingAddress && (
            <div className="rounded-2xl bg-brand-cream p-4 text-body-sm dark:bg-gray-800">
              <p className="font-bold text-ink dark:text-white">Shipping address</p>
              <p className="mt-1 text-muted">{order.shippingAddress.fullName}</p>
              <p className="text-muted">{order.shippingAddress.line1}, {order.shippingAddress.city}</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
