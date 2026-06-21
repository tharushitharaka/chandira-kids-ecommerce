import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';

export function SpecialOffers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SEO title="Special Offers | Chandira Kids" />
      <h1 className="text-3xl font-black">Special Offers</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {['Discount coupons', 'Flash sales', 'Featured products'].map((item) => <div className="soft-card" key={item}><h2 className="font-black">{item}</h2><p className="text-sm text-stone-600">Managed from the admin promotions system.</p></div>)}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <SEO title="About Us | Chandira Kids" />
      <h1 className="text-3xl font-black">About Chandira Kids</h1>
      <p className="mt-4 text-stone-600">Chandira Kids offers beautiful baby girls and girls fashion from newborns to 15 years, with retail shopping and wholesale support for boutiques.</p>
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
    <section className="mx-auto max-w-3xl px-4 py-12">
      <SEO title="Contact Us | Chandira Kids" />
      <form className="panel grid gap-3" onSubmit={submit}>
        <h1 className="text-3xl font-black">Contact Us</h1>
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
