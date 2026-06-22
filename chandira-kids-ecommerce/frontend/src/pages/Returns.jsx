import { FiRefreshCw, FiClock, FiCheckCircle, FiXCircle, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const returnPolicy = [
  {
    icon: FiClock,
    title: '7-Day Return Window',
    text: 'Returns accepted within 7 days of delivery'
  },
  {
    icon: FiCheckCircle,
    title: 'Original Condition',
    text: 'Items must be unworn, unwashed, and with original tags'
  },
  {
    icon: FiRefreshCw,
    title: 'Exchange or Refund',
    text: 'Choose between exchange for different size or refund'
  },
  {
    icon: FiXCircle,
    title: 'Non-Returnable Items',
    text: 'Sale items, accessories, and personalized items cannot be returned'
  }
];

const returnProcess = [
  {
    step: '1',
    title: 'Contact Us',
    description: 'Reach out via WhatsApp or email within 7 days of delivery'
  },
  {
    step: '2',
    title: 'Provide Details',
    description: 'Share your order number and reason for return'
  },
  {
    step: '3',
    title: 'Get Approval',
    description: 'We\'ll review and approve your return request'
  },
  {
    step: '4',
    title: 'Ship Back',
    description: 'Send the item back using our return shipping label'
  },
  {
    step: '5',
    title: 'Process',
    description: 'We\'ll inspect and process your exchange or refund'
  }
];

const nonReturnableItems = [
  'Items marked as "Final Sale"',
  'Accessories (hairbands, bows, etc.)',
  'Personalized or custom items',
  'Items without original tags and packaging',
  'Items that have been worn, washed, or altered',
  'Items with signs of damage or stains'
];

export default function Returns() {
  return (
    <section className="page-shell max-w-5xl">
      <SEO title="Returns & Refunds | Chandira Kids" description="Our return and refund policy. Easy returns within 7 days for unworn items with original tags." />
      
      <div className="page-hero mb-10 text-center">
        <p className="section-label">Customer Service</p>
        <h1 className="section-title mt-2">Returns & Refunds</h1>
        <p className="mx-auto mt-3 max-w-2xl text-body text-muted">
          We want you to be completely satisfied with your purchase. Learn about our hassle-free return policy and process.
        </p>
      </div>

      <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {returnPolicy.map((policy, index) => (
          <div key={index} className="soft-card text-center">
            <policy.icon className="mx-auto h-8 w-8 text-brand-pink" />
            <h3 className="mt-3 font-bold text-ink">{policy.title}</h3>
            <p className="mt-1 text-body-sm text-muted">{policy.text}</p>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="section-title mb-6">Return Process</h2>
        <div className="grid gap-6 md:grid-cols-5">
          {returnProcess.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink text-xl font-extrabold text-white shadow-soft">
                {step.step}
              </div>
              <h3 className="mt-4 font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-body-sm text-muted">{step.description}</p>
              {index < returnProcess.length - 1 && (
                <div className="absolute left-7 top-14 hidden h-full w-0.5 bg-brand-blush md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <div className="soft-card">
          <h2 className="text-xl font-bold text-brand-rose mb-4">Return Guidelines</h2>
          <ul className="space-y-3 text-body-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Returns must be initiated within 7 days of delivery
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Items must be in original condition with tags attached
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Original packaging must be included
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Proof of purchase (order number) required
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
              Return shipping costs are covered by customer unless item is defective
            </li>
          </ul>
        </div>

        <div className="soft-card">
          <h2 className="text-xl font-bold text-brand-rose mb-4">Non-Returnable Items</h2>
          <ul className="space-y-2 text-body-sm text-muted">
            {nonReturnableItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <FiXCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-12 soft-card">
        <h2 className="text-xl font-bold text-brand-rose mb-4">Refund Policy</h2>
        <div className="space-y-4 text-body-sm text-muted">
          <p>
            <strong className="text-ink">Refund Method:</strong> Refunds are processed to the original payment method within 5-7 business days of receiving and inspecting the returned item.
          </p>
          <p>
            <strong className="text-ink">Exchange Policy:</strong> Exchanges are subject to product availability. If your preferred size is unavailable, we'll offer a refund or store credit.
          </p>
          <p>
            <strong className="text-ink">Defective Items:</strong> If you receive a defective or incorrect item, please contact us immediately. We'll cover return shipping and provide a full refund or exchange.
          </p>
          <p>
            <strong className="text-ink">Store Credit:</strong> You can choose to receive store credit instead of a refund, which never expires and can be used on any future purchase.
          </p>
        </div>
      </div>

      <div className="mb-12 rounded-3xl bg-gradient-to-br from-brand-blush to-brand-cream p-8">
        <h2 className="text-2xl font-bold text-brand-rose mb-4 text-center">Need to Initiate a Return?</h2>
        <p className="mb-6 text-center text-body text-muted">
          Contact us via WhatsApp for quick assistance with your return or exchange
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            className="btn-primary flex items-center justify-center gap-2"
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent('Hello Chandira Kids,\n\nI would like to return an item.\n\nOrder Number:\nReason:')}`}
            target="_blank"
            rel="noreferrer"
          >
            <FiPhone className="h-5 w-5" />
            Contact via WhatsApp
          </a>
          <Link className="btn-secondary flex items-center justify-center" to="/contact">
            Contact Form
          </Link>
        </div>
      </div>

      <div className="rounded-3xl bg-brand-rose p-8 text-white text-center">
        <h2 className="text-2xl font-bold">Questions About Returns?</h2>
        <p className="mt-2 text-white/90">
          Our customer service team is here to help. Reach out anytime via WhatsApp for immediate assistance.
        </p>
      </div>
    </section>
  );
}
