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
      <div className="grid overflow-hidden rounded-[32px] bg-white shadow-sm ring-1 ring-[#ece3cf] lg:grid-cols-[1fr_0.9fr]">
        <div className="hidden bg-gradient-to-br from-[#1f1f1f] via-[#3a2d1e] to-[#c9a56d] p-8 text-white lg:flex lg:flex-col lg:justify-end">
          <p className="badge-tag bg-white/10 text-white">Welcome back</p>
          <h2 className="mt-3 text-3xl font-black">Style starts here</h2>
          <p className="mt-3 max-w-sm text-white/80">Sign in to track orders, save favourites, and continue shopping.</p>
        </div>
        <form className="grid gap-4 p-8" onSubmit={submit}>
          <h1 className="text-3xl font-black text-[#171717]">Login</h1>
          {error && <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn-primary">Login</button>
          <div className="flex justify-between text-sm font-semibold text-[#b38a50]">
            <Link to="/register">Create an account</Link>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </form>
      </div>
    </section>
  );
}
