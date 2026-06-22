import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';

export function SpecialOffers() {
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  const copyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    toast.success(`Coupon ${code} copied!`);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  return (
    <section className="page-shell">
      <SEO title="Special Offers | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">Offers</p>
        <h1 className="mt-2 text-3xl font-black text-ink">Special Offers</h1>
      </div>

      {/* Coupon Codes Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-black text-ink mb-4">Coupon Codes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { code: 'WELCOME10', discount: '10% off', desc: 'First order discount' },
            { code: 'SUMMER20', discount: '20% off', desc: 'Summer collection' },
            { code: 'FREESHIP', discount: 'Free shipping', desc: 'Orders over LKR 2,000' }
          ].map((coupon) => (
            <div className="soft-card" key={coupon.code}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-black text-brand-rose">{coupon.code}</span>
                <span className="text-sm font-semibold text-ink">{coupon.discount}</span>
              </div>
              <p className="text-sm text-muted mb-3">{coupon.desc}</p>
              <button
                onClick={() => copyCoupon(coupon.code)}
                className="btn-primary w-full"
                disabled={copiedCoupon === coupon.code}
              >
                {copiedCoupon === coupon.code ? 'Copied!' : 'Copy Coupon'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-ink">Featured Products</h2>
          <Link to="/shop?sort=discount_desc" className="text-sm font-semibold text-brand-rose hover:underline">
            View All
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Bunny Gingham Dress Set', price: 4500, slug: 'bunny-gingham-dress-set' },
            { name: 'Elegant Floral Bow Dress', price: 5500, slug: 'elegant-floral-bow-dress-set' }
          ].map((product) => (
            <div className="soft-card" key={product.slug}>
              <h3 className="font-black text-ink mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-brand-rose mb-3">LKR {product.price.toLocaleString()}</p>
              <Link to={`/products/${product.slug}`} className="btn-primary block text-center">
                Shop Now
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers Info */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {[
          { title: 'Wholesale Pricing', desc: 'Bulk discounts for boutique owners. Minimum 6 items per order.' },
          { title: 'Free Shipping', desc: 'Free delivery on orders over LKR 2,000 across Sri Lanka.' }
        ].map(({ title, desc }) => (
          <div className="soft-card" key={title}>
            <h3 className="font-black text-ink">{title}</h3>
            <p className="mt-2 text-sm text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="page-shell max-w-5xl">
      <SEO title="About Us | Chandira Kids" />
      <div className="surface-card">
        <p className="badge-tag">Our story</p>
        <h1 className="mt-2 text-3xl font-black text-ink">About Chandira Kids</h1>
        <p className="mt-4 text-muted">Chandira Kids offers beautiful baby girls and girls fashion from newborns to 15 years, with retail shopping and wholesale support for boutiques.</p>
      </div>
    </section>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const submit = async (event) => {
    event.preventDefault();
    await api.post('/public/contact', form);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    toast.success('Message sent');
  };
  return (
    <section className="page-shell max-w-3xl">
      <SEO title="Contact Us | Chandira Kids" />
      <form className="panel grid gap-3" onSubmit={submit}>
        <p className="badge-tag">Contact</p>
        <h1 className="text-3xl font-black text-ink">Contact Us</h1>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
        <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <button className="btn-primary">Send message</button>
      </form>
    </section>
  );
}

function InfoPage({ title, seoTitle, children }) {
  return (
    <section className="page-shell max-w-3xl">
      <SEO title={seoTitle} />
      <div className="surface-card prose prose-sm max-w-none dark:prose-invert">
        <p className="badge-tag">Help</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink dark:text-white">{title}</h1>
        <div className="mt-6 space-y-4 text-body text-muted">{children}</div>
      </div>
    </section>
  );
}

export function SizeGuide() {
  return (
    <InfoPage title="Size guide" seoTitle="Size Guide | Chandira Kids">
      <p>Measure your child before ordering. Sizes may vary slightly by style.</p>
      <table className="w-full text-left text-body-sm">
        <thead><tr className="border-b border-brand-blush"><th className="py-2">Age</th><th className="py-2">Chest (cm)</th><th className="py-2">Height (cm)</th></tr></thead>
        <tbody>
          {[
            ['0–12 months', '46–50', '68–74'],
            ['1–3 years', '52–56', '86–98'],
            ['4–7 years', '58–64', '104–122'],
            ['8–12 years', '66–74', '128–152'],
            ['13–15 years', '76–84', '158–168']
          ].map(([age, chest, height]) => (
            <tr key={age} className="border-b border-brand-blush/50"><td className="py-2">{age}</td><td>{chest}</td><td>{height}</td></tr>
          ))}
        </tbody>
      </table>
      <p>Between sizes? We recommend sizing up for a comfortable fit.</p>
    </InfoPage>
  );
}

export function Returns() {
  return (
    <InfoPage title="Returns & refund policy" seoTitle="Returns Policy | Chandira Kids">
      <p>We want you to love every purchase. If something isn&apos;t right, contact us within 7 days of delivery.</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>Items must be unworn, unwashed, and with original tags.</li>
        <li>Refunds are processed within 5–7 business days after inspection.</li>
        <li>Exchanges are available for size issues when stock permits.</li>
        <li>Wholesale orders may have different terms — contact us for details.</li>
      </ul>
    </InfoPage>
  );
}

export function Shipping() {
  return (
    <InfoPage title="Shipping information" seoTitle="Shipping | Chandira Kids">
      <p>We deliver island-wide across Sri Lanka.</p>
      <ul className="list-disc space-y-2 pl-5">
        <li><strong>Standard delivery:</strong> 2–4 business days</li>
        <li><strong>Shipping fee:</strong> LKR 650 (free on orders over LKR 15,000)</li>
        <li><strong>Cash on delivery</strong> available nationwide</li>
        <li>Bank transfer orders ship after payment confirmation</li>
      </ul>
      <p>Track your order from your account dashboard or with your order number.</p>
    </InfoPage>
  );
}

export function FAQ() {
  const faqs = [
    { q: 'How do I order via WhatsApp?', a: 'Tap the WhatsApp button on any page and send us product details and quantity.' },
    { q: 'What is the minimum wholesale order?', a: 'Wholesale minimum is typically 6 items per style. Contact us for boutique partnerships.' },
    { q: 'Can I return an item?', a: 'Yes, within 7 days if unworn with tags. See our returns policy for details.' },
    { q: 'Do you offer gift cards?', a: 'Yes! Visit our gift cards page or message us on WhatsApp.' },
    { q: 'How do I apply a coupon?', a: 'Enter your code at cart or checkout. Valid codes are shown on Special Offers.' }
  ];
  return (
    <section className="page-shell max-w-3xl">
      <SEO title="FAQ | Chandira Kids" />
      <div className="surface-card">
        <p className="badge-tag">FAQ</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink dark:text-white">Frequently asked questions</h1>
        <div className="mt-6 space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl bg-brand-cream/60 p-4 dark:bg-gray-800">
              <h2 className="font-bold text-ink dark:text-white">{item.q}</h2>
              <p className="mt-2 text-body-sm text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
