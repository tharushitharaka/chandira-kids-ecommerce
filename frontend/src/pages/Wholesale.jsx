import { useState } from 'react';
import api from '../api/client';
import SEO from '../components/SEO';

export default function Wholesale() {
  const [form, setForm] = useState({ businessName: '', ownerName: '', email: '', phone: '', businessType: '', monthlyVolume: '', websiteOrSocial: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/wholesale/apply', form);
    setSent(true);
  };

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[0.8fr_1fr]">
      <SEO title="Wholesale Application | Chandira Kids" description="Apply for Chandira Kids wholesale pricing for boutiques, resellers, and children's clothing shops." />
      <div>
        <h1 className="text-3xl font-black">Wholesale application</h1>
        <p className="mt-3 text-stone-600">Approved wholesale customers get special pricing, minimum quantity rules, inventory support, and priority access to new girls clothing collections.</p>
      </div>
      <form className="panel grid gap-3" onSubmit={submit}>
        {sent && <p className="rounded-md bg-mint p-3 font-bold text-mulberry">Application submitted. We will contact you soon.</p>}
        <input placeholder="Business name" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} required />
        <input placeholder="Owner name" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} required />
        <div className="grid gap-3 md:grid-cols-2">
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        </div>
        <input placeholder="Business type" value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })} required />
        <input placeholder="Expected monthly volume" value={form.monthlyVolume} onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })} />
        <input placeholder="Website or social page" value={form.websiteOrSocial} onChange={(e) => setForm({ ...form, websiteOrSocial: e.target.value })} />
        <textarea placeholder="Tell us about your shop" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button className="btn-primary">Submit application</button>
      </form>
    </section>
  );
}
