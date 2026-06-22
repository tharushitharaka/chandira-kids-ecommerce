import { useState, useEffect } from 'react';
import { FiX, FiShoppingBag } from 'react-icons/fi';

const recentPurchases = [
  { product: 'Floral Bow Dress', location: 'Colombo', time: '2 minutes ago' },
  { product: 'Bunny Gingham Set', location: 'Kandy', time: '5 minutes ago' },
  { product: 'Pastel Party Dress', location: 'Galle', time: '8 minutes ago' },
  { product: 'Cotton Casual Set', location: 'Negombo', time: '12 minutes ago' },
  { product: 'Hairband Collection', location: 'Kurunegala', time: '15 minutes ago' }
];

export default function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState(null);

  useEffect(() => {
    // Show first notification after 5 seconds
    const timer = setTimeout(() => {
      showNotification();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const showNotification = () => {
    const randomPurchase = recentPurchases[Math.floor(Math.random() * recentPurchases.length)];
    setCurrentPurchase(randomPurchase);
    setVisible(true);

    // Hide after 5 seconds and show next one after delay
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        showNotification();
      }, 30000); // Show next one after 30 seconds
    }, 5000);
  };

  if (!visible || !currentPurchase) return null;

  return (
    <div className="fixed bottom-24 left-4 z-40 max-w-sm animate-slide-up">
      <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-lg border border-brand-blush">
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 text-muted hover:text-ink"
        >
          <FiX className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pink text-white">
            <FiShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold text-ink">
              Someone from {currentPurchase.location}
            </p>
            <p className="text-xs text-muted">
              purchased {currentPurchase.product}
            </p>
            <p className="text-[10px] text-muted">{currentPurchase.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
