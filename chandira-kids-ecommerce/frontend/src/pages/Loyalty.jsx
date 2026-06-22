import { useState, useEffect } from 'react';
import { FiLoader, FiGift, FiStar, FiTrendingUp, FiAward, FiCheckCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import api from '../api/client';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Loyalty() {
  const { user } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);

  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
    }
  }, [user]);

  const fetchLoyaltyData = async () => {
    try {
      const { data } = await api.get('/loyalty/status');
      setLoyaltyData(data);
    } catch (error) {
      console.error('Failed to fetch loyalty data:', error);
      toast.error('Failed to load loyalty data');
    } finally {
      setLoading(false);
    }
  };

  const redeemReward = async (rewardId) => {
    setRedeeming(rewardId);
    try {
      await api.post('/loyalty/redeem', { rewardId });
      toast.success('Reward redeemed successfully!');
      fetchLoyaltyData();
    } catch (error) {
      console.error('Failed to redeem reward:', error);
      toast.error(error.response?.data?.message || 'Failed to redeem reward');
    } finally {
      setRedeeming(null);
    }
  };

  if (!user) {
    return (
      <section className="page-shell">
        <SEO title="Loyalty Program | Chandira Kids" />
        <div className="text-center py-20">
          <FiGift className="mx-auto h-16 w-16 text-brand-rose" />
          <h2 className="mt-4 text-2xl font-bold text-ink dark:text-white">Join Our Loyalty Program</h2>
          <p className="mt-2 text-muted">Sign in to earn points and unlock exclusive rewards!</p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="page-shell">
        <div className="flex items-center justify-center py-20">
          <FiLoader className="h-8 w-8 animate-spin text-brand-rose" />
        </div>
      </section>
    );
  }

  const { points, tier, tierProgress, rewards, history } = loyaltyData || {};

  return (
    <section className="page-shell">
      <SEO title="Loyalty Program | Chandira Kids" description="Earn points and unlock exclusive rewards" />
      
      <div className="page-hero mb-8 text-center">
        <p className="section-label">Loyalty Program</p>
        <h1 className="section-title mt-2">Rewards & Benefits</h1>
        <p className="mx-auto mt-3 max-w-lg text-base text-ink/65">Earn points with every purchase and unlock exclusive rewards</p>
      </div>

      {/* Points Card */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-rose p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Your Points</p>
            <p className="text-5xl font-bold">{points || 0}</p>
            <p className="mt-2 text-sm opacity-90">Current Tier: {tier || 'Bronze'}</p>
          </div>
          <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
            <FiStar className="h-12 w-12" />
          </div>
        </div>
        
        {tierProgress && (
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress to {tierProgress.nextTier}</span>
              <span>{tierProgress.currentPoints} / {tierProgress.requiredPoints} points</span>
            </div>
            <div className="h-2 rounded-full bg-white/30">
              <div 
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${(tierProgress.currentPoints / tierProgress.requiredPoints) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Ways to Earn */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-ink dark:text-white">Ways to Earn Points</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: FiTrendingUp, title: 'Make a Purchase', points: '1 point per LKR 10' },
            { icon: FiAward, title: 'Write a Review', points: '50 points per review' },
            { icon: FiCheckCircle, title: 'Complete Profile', points: '100 points' },
            { icon: FiGift, title: 'Birthday Bonus', points: '200 points' },
            { icon: FiStar, title: 'Refer a Friend', points: '500 points' },
            { icon: FiAward, title: 'Social Share', points: '25 points per share' }
          ].map((item, index) => (
            <div key={index} className="rounded-xl bg-white p-4 shadow-card dark:bg-gray-800">
              <item.icon className="h-6 w-6 text-brand-rose" />
              <h3 className="mt-2 font-semibold text-ink dark:text-white">{item.title}</h3>
              <p className="text-sm text-muted">{item.points}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Rewards */}
      {rewards && rewards.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-ink dark:text-white">Available Rewards</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => (
              <div 
                key={reward._id}
                className={`rounded-xl bg-white p-6 shadow-card dark:bg-gray-800 ${
                  points < reward.pointsRequired ? 'opacity-60' : ''
                }`}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blush">
                  <FiGift className="h-8 w-8 text-brand-rose" />
                </div>
                <h3 className="font-semibold text-ink dark:text-white">{reward.name}</h3>
                <p className="mb-4 text-sm text-muted">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-rose">{reward.pointsRequired} points</span>
                  <button
                    onClick={() => redeemReward(reward._id)}
                    disabled={points < reward.pointsRequired || redeeming === reward._id}
                    className="btn-primary !py-2 !text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {redeeming === reward._id ? 'Redeeming...' : points >= reward.pointsRequired ? 'Redeem' : 'Not Enough Points'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Points History */}
      {history && history.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-ink dark:text-white">Points History</h2>
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-card dark:bg-gray-800">
                <div>
                  <p className="font-semibold text-ink dark:text-white">{item.description}</p>
                  <p className="text-sm text-muted">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`font-bold ${item.type === 'earned' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {item.type === 'earned' ? '+' : '-'}{item.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
