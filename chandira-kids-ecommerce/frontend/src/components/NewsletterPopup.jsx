import { useState, useEffect } from 'react';
import { FiX, FiMail, FiGift } from 'react-icons/fi';
import { validateEmail } from '../utils/validation';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or subscribed
    const hasDismissed = localStorage.getItem('newsletterDismissed');
    const hasSubscribed = localStorage.getItem('newsletterSubscribed');
    
    if (hasDismissed || hasSubscribed) {
      setDismissed(true);
      return;
    }

    // Show popup after 30 seconds or on exit intent
    const timer = setTimeout(() => {
      setVisible(true);
    }, 30000);

    const handleExitIntent = (e) => {
      if (e.clientY <= 0 && !dismissed && !visible) {
        setVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleExitIntent);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, [dismissed, visible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await api.post('/newsletter/subscribe', { email });
      setSubscribed(true);
      localStorage.setItem('newsletterSubscribed', 'true');
      toast.success('Thank you for subscribing!');
      
      // Hide popup after success
      setTimeout(() => {
        setVisible(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('newsletterDismissed', 'true');
    setDismissed(true);
  };

  if (!visible || dismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-brand-blush"
        >
          <FiX className="h-5 w-5" />
        </button>

        {!subscribed ? (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-pink to-brand-rose text-white">
                <FiGift className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-brand-rose">Get 10% Off Your First Order!</h2>
              <p className="mt-2 text-body text-muted">
                Subscribe to our newsletter for exclusive offers, new arrivals, and styling tips.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  className="w-full"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                className="btn-primary w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Get My 10% Off'}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-muted">
              By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
              <FiMail className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-600">You're Subscribed!</h2>
            <p className="mt-2 text-body text-muted">
              Check your email for your 10% discount code.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
