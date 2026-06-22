import { FiCheckCircle, FiPackage, FiTruck } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/client';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { getEstimatedDeliveryDate } from '../utils/delivery';

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const orderNumber = params.get('order');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderNumber) return;
    api.get(`/orders/track/${orderNumber}`)
      .then(({ data }) => setOrder(data))
      .catch(() => setError('Could not load order details.'));
  }, [orderNumber]);

  const deliveryDate = getEstimatedDeliveryDate();

  return (
    <section className="page-shell max-w-3xl">
      <SEO title="Order Confirmed | Chandira Kids" />
      <div className="surface-card text-center md:p-10">
        <FiCheckCircle className="mx-auto h-16 w-16 text-emerald-500" />
        <h1 className="mt-4 font-display text-3xl font-bold text-ink dark:text-white">Thank you for your order!</h1>
        {orderNumber && (
          <p className="mt-2 text-body text-muted">Order number: <strong className="text-brand-rose">{orderNumber}</strong></p>
        )}
        <p className="mt-4 text-body text-muted">We&apos;ve sent a confirmation email with your order details.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-brand-cream p-4 dark:bg-gray-800">
            <FiPackage className="mx-auto h-6 w-6 text-brand-rose" />
            <p className="mt-2 text-body-sm font-bold text-ink dark:text-white">Status</p>
            <p className="text-body-sm text-muted">{order?.status || 'Processing'}</p>
          </div>
          <div className="rounded-2xl bg-brand-cream p-4 dark:bg-gray-800">
            <FiTruck className="mx-auto h-6 w-6 text-brand-rose" />
            <p className="mt-2 text-body-sm font-bold text-ink dark:text-white">Estimated delivery</p>
            <p className="text-body-sm text-muted">{deliveryDate}</p>
          </div>
        </div>

        {error && <p className="mt-4 text-body-sm text-red-600">{error}</p>}
        {!order && orderNumber && !error && <LoadingSpinner label="Loading order…" />}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {orderNumber && (
            <Link className="btn-secondary" to={`/orders/${orderNumber}`}>View order details</Link>
          )}
          <Link className="btn-primary" to="/shop">Continue shopping</Link>
        </div>
      </div>
    </section>
  );
}
