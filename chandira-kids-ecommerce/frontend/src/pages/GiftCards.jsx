import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiGift, FiMail, FiCheckCircle, FiCreditCard, FiCalendar } from 'react-icons/fi';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';
import api from '../api/client';

const tiers = [
  { amount: 2000, label: 'LKR 2,000', desc: 'Perfect for a small treat' },
  { amount: 5000, label: 'LKR 5,000', desc: 'Great for birthdays' },
  { amount: 10000, label: 'LKR 10,000', desc: 'Premium gift option' },
  { amount: 25000, label: 'LKR 25,000', desc: 'Ultimate gift package' }
];

export default function GiftCards() {
  const [selectedAmount, setSelectedAmount] = useState(2000);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkCode, setCheckCode] = useState('');
  const [cardBalance, setCardBalance] = useState(null);
  const [activeTab, setActiveTab] = useState('purchase');

  const purchaseGiftCard = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amount = customAmount || selectedAmount;
      await api.post('/gift-cards/purchase', {
        amount: Number(amount),
        recipientEmail,
        recipientName,
        senderName,
        message
      });
      toast.success('Gift card purchased successfully! Check your email for details.');
      setRecipientEmail('');
      setRecipientName('');
      setSenderName('');
      setMessage('');
      setCustomAmount('');
    } catch (error) {
      toast.error('Failed to purchase gift card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkBalance = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.get(`/gift-cards/${checkCode}/balance`);
      setCardBalance(data);
      toast.success('Balance checked successfully');
    } catch (error) {
      toast.error('Invalid gift card code');
      setCardBalance(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell max-w-5xl">
      <SEO title="Gift Cards | Chandira Kids" description="Purchase Chandira Kids gift cards for friends and family. Digital delivery with personalized messages." />
      
      <div className="page-hero mb-8 text-center">
        <p className="badge-tag">Gifts</p>
        <h1 className="section-title mt-2">Gift Cards</h1>
        <p className="mx-auto mt-3 max-w-2xl text-body text-muted">
          Give the gift of beautiful kidswear. Digital gift cards delivered instantly with personalized messages.
        </p>
      </div>

      <div className="mb-8 flex justify-center gap-4">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'purchase' ? 'bg-brand-pink text-white' : 'bg-brand-blush text-brand-rose'}`}
          onClick={() => setActiveTab('purchase')}
        >
          Purchase Gift Card
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'check' ? 'bg-brand-pink text-white' : 'bg-brand-blush text-brand-rose'}`}
          onClick={() => setActiveTab('check')}
        >
          Check Balance
        </button>
      </div>

      {activeTab === 'purchase' && (
        <>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.amount}
                className={`soft-card cursor-pointer text-center transition ${selectedAmount === tier.amount && !customAmount ? 'ring-2 ring-brand-pink' : ''}`}
                onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(''); }}
              >
                <FiGift className="mx-auto h-10 w-10 text-brand-pink" />
                <h2 className="mt-3 text-2xl font-extrabold text-brand-rose">{tier.label}</h2>
                <p className="mt-2 text-body-sm text-muted">{tier.desc}</p>
              </div>
            ))}
          </div>

          <div className="soft-card mb-8">
            <h3 className="text-lg font-bold text-brand-rose mb-4">Custom Amount</h3>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-ink">LKR</span>
              <input
                type="number"
                className="flex-1 text-2xl font-bold"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                min="1000"
                step="500"
              />
            </div>
          </div>

          <form onSubmit={purchaseGiftCard} className="soft-card">
            <h3 className="text-lg font-bold text-brand-rose mb-6">Gift Card Details</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">Recipient Name</label>
                <input
                  className="w-full"
                  type="text"
                  placeholder="Enter recipient's name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">Recipient Email</label>
                <input
                  className="w-full"
                  type="email"
                  placeholder="Enter recipient's email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">Your Name</label>
                <input
                  className="w-full"
                  type="text"
                  placeholder="Enter your name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-ink">Gift Amount</label>
                <div className="flex items-center gap-2 rounded-2xl border-2 border-brand-blush bg-brand-blush/30 px-4 py-3">
                  <span className="text-xl font-bold text-ink">LKR {(customAmount || selectedAmount).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-semibold text-ink">Personal Message (Optional)</label>
              <textarea
                className="w-full"
                rows="3"
                placeholder="Add a personal message for the recipient"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength="500"
              />
            </div>

            <button className="btn-primary mt-6 w-full" type="submit" disabled={loading}>
              <FiGift className="mr-2 h-5 w-5" />
              {loading ? 'Processing...' : 'Purchase Gift Card'}
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand-blush to-brand-cream p-6">
            <h3 className="font-bold text-brand-rose mb-4">Gift Card Features</h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <FiMail className="h-5 w-5 text-brand-pink" />
                <span className="text-body-sm text-muted">Instant digital delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCalendar className="h-5 w-5 text-brand-pink" />
                <span className="text-body-sm text-muted">Valid for 12 months</span>
              </div>
              <div className="flex items-center gap-3">
                <FiCheckCircle className="h-5 w-5 text-brand-pink" />
                <span className="text-body-sm text-muted">No expiration fees</span>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'check' && (
        <div className="soft-card">
          <h3 className="text-lg font-bold text-brand-rose mb-6">Check Gift Card Balance</h3>
          
          <form onSubmit={checkBalance} className="flex gap-4">
            <input
              className="flex-1"
              type="text"
              placeholder="Enter gift card code (e.g., GC-XXXXX)"
              value={checkCode}
              onChange={(e) => setCheckCode(e.target.value.toUpperCase())}
              required
            />
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Checking...' : 'Check Balance'}
            </button>
          </form>

          {cardBalance && (
            <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-rose to-brand-pink p-6 text-white">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-white/80">Card Balance</p>
                  <p className="text-3xl font-bold">LKR {cardBalance.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-white/80">Status</p>
                  <p className="text-lg font-bold">{cardBalance.status}</p>
                </div>
                <div>
                  <p className="text-sm text-white/80">Expires</p>
                  <p className="text-lg font-bold">{new Date(cardBalance.expiresAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 rounded-2xl bg-brand-blush/30 p-4">
            <h4 className="font-bold text-ink mb-2">How to Redeem</h4>
            <ol className="list-decimal list-inside space-y-1 text-body-sm text-muted">
              <li>Add items to your cart</li>
              <li>Proceed to checkout</li>
              <li>Enter your gift card code in the payment section</li>
              <li>The balance will be automatically applied</li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-body-sm text-muted">
          Need help with gift cards? <Link className="text-brand-rose hover:underline" to="/contact">Contact us</Link> for assistance.
        </p>
      </div>
    </section>
  );
}
