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
    <section className="mx-auto max-w-md px-4 py-12">
      <SEO title="Register | Chandira Kids" />
      <form className="panel grid gap-4" onSubmit={submit}>
        <h1 className="text-2xl font-black">Create account</h1>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input type="password" placeholder="Password" minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn-primary">Register</button>
      </form>
    </section>
  );
}
