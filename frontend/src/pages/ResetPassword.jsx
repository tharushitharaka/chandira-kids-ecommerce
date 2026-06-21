import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import SEO from '../components/SEO';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const submit = async (event) => {
    event.preventDefault();
    const { data } = await api.post(`/auth/reset-password/${token}`, { password });
    localStorage.setItem('ck_token', data.token);
    navigate('/dashboard');
  };
  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <SEO title="Reset Password | Chandira Kids" />
      <form className="panel grid gap-3" onSubmit={submit}>
        <h1 className="text-2xl font-black">Reset Password</h1>
        <input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn-primary">Reset password</button>
      </form>
    </section>
  );
}
