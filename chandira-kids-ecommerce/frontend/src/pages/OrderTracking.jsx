import { useState } from 'react';
import { FiSearch, FiTruck, FiPackage, FiCheckCircle, FiClock, FiMapPin, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import api from '../api/client';
import toast from 'react-hot-toast';

const orderStatuses = {
  pending: { icon: FiClock, color: 'text-amber-600', label: 'Order Placed', description: 'Your order has been received and is being processed' },
  processing: { icon: FiPackage, color: 'text-blue-600', label: 'Processing', description: 'Your order is being prepared for shipping' },
  shipped: { icon: FiTruck, color: 'text-purple-600', label: 'Shipped', description: 'Your order has been shipped and is on its way' },
  delivered: { icon: FiCheckCircle, color: 'text-emerald-600', label: 'Delivered', description: 'Your order has been delivered successfully' }
};

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async (e) => {
    e.preventDefault();
    if (!orderId || !email) {
      toast.error('Please enter both order ID and email');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get(`/public/orders/${orderId}/track`, { params: { email } });
      setOrder(data);
      toast.success('Order found!');
    } catch (error) {
      toast.error('Order not found. Please check your details and try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    return steps.indexOf(status);
  };

  return (
    <section className="page-shell max-w-4xl">
      <SEO title="Order Tracking | Chandira Kids" description="Track your order status and delivery progress." />
      
      <div className="page-hero mb-10 text-center">
        <p className="section-label">Order Support</p>
        <h1 className="section-title mt-2">Track Your Order</h1>
        <p className="mx-auto mt-3 max-w-2xl text-body text-muted">
          Enter your order ID and email address to track your order status and delivery progress.
        </p>
      </div>

      <div className="mb-8 soft-card">
        <form onSubmit={trackOrder} className="grid gap-4 md:grid-cols-3">
          <input
            className="w-full"
            type="text"
            placeholder="Order ID (e.g., CK-12345)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
            required
          />
          <input
            className="w-full"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn-primary flex items-center justify-center gap-2" type="submit" disabled={loading}>
            <FiSearch className="h-5 w-5" />
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
      </div>

      {order && (
        <div className="space-y-6">
          <div className="soft-card">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-brand-rose">Order #{order.orderId}</h2>
                <p className="text-body-sm text-muted">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-ink">LKR {order.total.toLocaleString()}</p>
                <p className="text-body-sm text-muted">{order.items.length} items</p>
              </div>
            </div>
          </div>

          <div className="soft-card">
            <h3 className="text-lg font-bold text-ink mb-6">Order Status</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-brand-blush" />
              <div className="space-y-8">
                {Object.entries(orderStatuses).map(([status, { icon: Icon, color, label, description }]) => {
                  const currentStep = getStatusStep(order.status);
                  const step = getStatusStep(status);
                  const isCompleted = step <= currentStep;
                  const isCurrent = step === currentStep;

                  return (
                    <div key={status} className="relative flex items-start gap-4">
                      <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                        isCompleted ? 'bg-brand-pink text-white' : 'bg-brand-blush text-muted'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className={`flex-1 ${isCurrent ? 'font-bold' : ''}`}>
                        <p className={`text-ink ${isCurrent ? 'text-lg' : ''}`}>{label}</p>
                        <p className="text-body-sm text-muted">{description}</p>
                        {isCurrent && order.trackingNumber && (
                          <p className="mt-2 text-body-sm font-semibold text-brand-rose">
                            Tracking: {order.trackingNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="soft-card">
            <h3 className="text-lg font-bold text-ink mb-4">Shipping Address</h3>
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-1 h-5 w-5 text-brand-pink" />
              <div>
                <p className="font-semibold text-ink">{order.shippingAddress.name}</p>
                <p className="text-body-sm text-muted">{order.shippingAddress.address}</p>
                <p className="text-body-sm text-muted">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p className="text-body-sm text-muted">{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          <div className="soft-card">
            <h3 className="text-lg font-bold text-ink mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b border-brand-blush/50 pb-4 last:border-0">
                  <img
                    className="h-16 w-16 rounded-xl object-cover"
                    src={item.product.images?.[0]?.url || '/placeholder.jpg'}
                    alt={item.product.name}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{item.product.name}</p>
                    <p className="text-body-sm text-muted">
                      {item.variant?.size} / {item.variant?.color} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold text-ink">LKR {item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!order && (
        <div className="rounded-3xl bg-gradient-to-br from-brand-blush to-brand-cream p-8 text-center">
          <h2 className="text-xl font-bold text-brand-rose mb-2">Need Help With Your Order?</h2>
          <p className="mb-4 text-body text-muted">
            Can't find your order or have questions? Contact us via WhatsApp for immediate assistance.
          </p>
          <a
            className="btn-primary inline-flex items-center gap-2"
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent('Hello Chandira Kids,\n\nI need help with my order.\n\nOrder ID:\nEmail:')}`}
            target="_blank"
            rel="noreferrer"
          >
            <FiPhone className="h-5 w-5" />
            Contact via WhatsApp
          </a>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-rose hover:underline" to="/shop">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
