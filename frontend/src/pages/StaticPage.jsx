import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';

export function SpecialOffers() {
  return (
    <section className="page-shell">
      <SEO title="Special Offers | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">Offers</p>
        <h1 className="mt-2 text-3xl font-black text-[#171717]">Special Offers</h1>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {['Discount coupons', 'Flash sales', 'Featured products'].map((item) => (
          <div className="soft-card" key={item}>
            <h2 className="font-black text-[#171717]">{item}</h2>
            <p className="mt-2 text-sm text-[#5c5144]">Managed from the admin promotions system.</p>
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
        <h1 className="mt-2 text-3xl font-black text-[#171717]">About Chandira Kids</h1>
        <p className="mt-4 text-[#5c5144]">Chandira Kids offers beautiful baby girls and girls fashion from newborns to 15 years, with retail shopping and wholesale support for boutiques.</p>
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
        <h1 className="text-3xl font-black text-[#171717]">Contact Us</h1>
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
