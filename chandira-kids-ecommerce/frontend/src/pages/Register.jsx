import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });

  const submit = async (event) => {
    event.preventDefault();
    await register(form);
    navigate('/');
  };

  return (
    <section className="page-shell max-w-6xl">
      <SEO title="Register | Chandira Kids" />
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-blush lg:grid-cols-[1fr_0.9fr]">
        <div className="hidden bg-gradient-to-br from-brand-blush via-brand-cream to-brand-gold/50 p-8 lg:flex lg:flex-col lg:justify-center">
          <p className="badge-tag">Join us</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-ink">Create your account</h2>
          <p className="mt-4 max-w-sm text-body leading-relaxed text-muted">Shop faster, save favourite outfits, and get exclusive updates.</p>
        </div>
        <form className="grid gap-5 p-8 md:p-10" onSubmit={submit}>
          <h1 className="font-display text-3xl font-bold text-ink">Create account</h1>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input type="password" placeholder="Password" minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn-primary">Register</button>
        </form>
      </div>
    </section>
  );
}
