import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    await api.post('/auth/forgot-password', { email });
    toast.success('If the email exists, a reset link was sent');
  };
  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <SEO title="Forgot Password | Chandira Kids" />
      <form className="panel grid gap-3" onSubmit={submit}>
        <h1 className="text-2xl font-black">Forgot Password</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="btn-primary">Send reset link</button>
      </form>
    </section>
  );
}
