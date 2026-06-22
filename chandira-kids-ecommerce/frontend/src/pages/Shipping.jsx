import { FiTruck, FiClock, FiMapPin, FiPhone, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const shippingZones = [
  {
    zone: 'Colombo & Suburbs',
    areas: 'Colombo, Dehiwala, Mount Lavinia, Moratuwa, Panadura, Kalutara, Gampaha, Negombo, Kandy',
    deliveryTime: '1-2 business days',
    cost: 'LKR 250'
  },
  {
    zone: 'Major Cities',
    areas: 'Galle, Matara, Hambantota, Jaffna, Kurunegala, Anuradhapura, Polonnaruwa, Ratnapura, Badulla',
    deliveryTime: '2-3 business days',
    cost: 'LKR 350'
  },
  {
    zone: 'Island-wide',
    areas: 'All other locations across Sri Lanka',
    deliveryTime: '3-5 business days',
    cost: 'LKR 450'
  }
];

const shippingInfo = [
  {
    icon: FiTruck,
    title: 'Free Shipping',
    text: 'Free shipping on orders over LKR 10,000'
  },
  {
    icon: FiClock,
    title: 'Fast Delivery',
    text: 'Orders processed within 24 hours'
  },
  {
    icon: FiMapPin,
    title: 'Island-wide Coverage',
    text: 'We deliver to all locations in Sri Lanka'
  },
  {
    icon: FiPhone,
    title: 'Track Your Order',
    text: 'Real-time tracking updates via WhatsApp'
  }
];

const processSteps = [
  {
    step: '1',
    title: 'Order Confirmation',
    description: 'You\'ll receive an order confirmation via email and WhatsApp'
  },
  {
    step: '2',
    title: 'Processing',
    description: 'Your order is processed and prepared for shipping within 24 hours'
  },
  {
    step: '3',
    title: 'Shipping',
    description: 'Your order is handed over to our delivery partner'
  },
  {
    step: '4',
    title: 'Delivery',
    description: 'Your order is delivered to your doorstep'
  }
];

export default function Shipping() {
  return (
    <section className="page-shell max-w-5xl">
      <SEO title="Shipping Info | Chandira Kids" description="Learn about our shipping policies, delivery times, and coverage across Sri Lanka." />
      
      <div className="page-hero mb-10 text-center">
        <p className="section-label">Delivery Information</p>
        <h1 className="section-title mt-2">Shipping & Delivery</h1>
        <p className="mx-auto mt-3 max-w-2xl text-body text-muted">
          We deliver island-wide with reliable shipping partners. Get your orders delivered to your doorstep quickly and safely.
        </p>
      </div>

      <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {shippingInfo.map((info, index) => (
          <div key={index} className="soft-card text-center">
            <info.icon className="mx-auto h-8 w-8 text-brand-pink" />
            <h3 className="mt-3 font-bold text-ink">{info.title}</h3>
            <p className="mt-1 text-body-sm text-muted">{info.text}</p>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="section-title mb-6">Shipping Zones & Rates</h2>
        <div className="grid gap-4">
          {shippingZones.map((zone, index) => (
            <div key={index} className="soft-card">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-rose">{zone.zone}</h3>
                  <p className="text-body-sm text-muted">{zone.areas}</p>
                </div>
                <div className="flex gap-6 sm:text-right">
                  <div>
                    <p className="text-xs font-semibold text-muted">Delivery Time</p>
                    <p className="font-bold text-ink">{zone.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted">Cost</p>
                    <p className="font-bold text-ink">{zone.cost}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="section-title mb-6">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink text-2xl font-extrabold text-white shadow-soft">
                {step.step}
              </div>
              <h3 className="mt-4 font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-body-sm text-muted">{step.description}</p>
              {index < processSteps.length - 1 && (
                <div className="absolute left-8 top-16 hidden h-full w-0.5 bg-brand-blush md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <div className="soft-card">
          <h2 className="text-xl font-bold text-brand-rose mb-4">
            <FiCheckCircle className="inline h-5 w-5 mr-2" />
            Shipping Guidelines
          </h2>
          <ul className="space-y-3 text-body-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Orders are processed Monday to Saturday, excluding public holidays
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Delivery times may vary during peak seasons and promotions
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Someone must be available to receive the delivery
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              We recommend providing a contact number for delivery coordination
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              For wholesale orders, special delivery arrangements can be made
            </li>
          </ul>
        </div>

        <div className="soft-card">
          <h2 className="text-xl font-bold text-brand-rose mb-4">
            <FiPhone className="inline h-5 w-5 mr-2" />
            Need Help?
          </h2>
          <p className="mb-4 text-body-sm text-muted">
            Have questions about shipping or need to arrange special delivery? Contact us via WhatsApp for immediate assistance.
          </p>
          <a
            className="btn-primary w-full"
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent('Hello Chandira Kids,\n\nI have a question about shipping.')}`}
            target="_blank"
            rel="noreferrer"
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-brand-blush to-brand-cream p-8 text-center">
        <h2 className="text-2xl font-bold text-brand-rose">Free Shipping on Orders Over LKR 10,000</h2>
        <p className="mt-2 text-body text-muted">
          Shop now and enjoy free delivery to your doorstep
        </p>
        <Link className="btn-primary mt-4 inline-flex" to="/shop">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
