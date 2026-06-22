import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';

export default function NewsletterUnsubscribe() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/public/newsletter/unsubscribe', { email });
    setDone(true);
    toast.success('You have been unsubscribed');
  };

  return (
    <section className="page-shell max-w-md">
      <SEO title="Unsubscribe | Chandira Kids" />
      <form className="surface-card grid gap-4" onSubmit={submit}>
        <p className="badge-tag">Newsletter</p>
        <h1 className="font-display text-2xl font-bold text-ink dark:text-white">Unsubscribe</h1>
        {done ? (
          <p className="text-body text-muted">You won&apos;t receive marketing emails from us anymore.</p>
        ) : (
          <>
            <p className="text-body-sm text-muted">Enter your email to unsubscribe from Chandira Kids updates.</p>
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="btn-primary">Unsubscribe</button>
          </>
        )}
      </form>
    </section>
  );
}
