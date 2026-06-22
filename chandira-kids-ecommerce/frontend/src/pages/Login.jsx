import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="page-shell max-w-6xl">
      <SEO title="Login | Chandira Kids" />
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-brand-blush lg:grid-cols-[1fr_0.9fr]">
        <div className="hidden bg-gradient-to-br from-brand-rose via-brand-deep to-brand-pink p-8 text-white lg:flex lg:flex-col lg:justify-end">
          <p className="badge-tag bg-white/15 text-white">Welcome back</p>
          <h2 className="mt-4 font-display text-3xl font-bold">Style starts here</h2>
          <p className="mt-4 max-w-sm text-body leading-relaxed text-white/90">Sign in to track orders, save favourites, and continue shopping.</p>
        </div>
        <form className="grid gap-5 p-8 md:p-10" onSubmit={submit}>
          <h1 className="font-display text-3xl font-bold text-ink">Login</h1>
          {error && <p className="rounded-2xl bg-red-50 p-4 text-body-sm font-medium text-red-700">{error}</p>}
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn-primary">Login</button>
          <div className="flex justify-between text-body-sm font-bold text-brand-rose">
            <Link to="/register">Create an account</Link>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
