import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [track, setTrack] = useState('');
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/orders/mine/list'),
      api.get('/users/wishlist'),
      api.get('/users/addresses'),
      api.get('/users/notifications')
    ]).then(([orderRes, wishRes, addressRes, notificationRes]) => {
      setOrders(orderRes.data);
      setWishlist(wishRes.data);
      setAddresses(addressRes.data);
      setNotifications(notificationRes.data);
    });
  }, []);

  const saveProfile = async (event) => {
    event.preventDefault();
    await api.put('/users/profile', profile);
    toast.success('Profile updated');
  };

  const trackOrder = async (event) => {
    event.preventDefault();
    // Extract order number from full URL if needed
    const orderNumber = track.includes('/') ? track.split('/').pop() : track;
    const { data } = await api.get(`/orders/track/${orderNumber}`);
    setTracking(data);
  };

  return (
    <section className="page-shell">
      <SEO title="Account Dashboard | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">My account</p>
        <h1 className="mt-2 text-3xl font-black text-ink dark:text-white">Welcome back, {user?.name || 'there'}</h1>
        <p className="mt-2 muted-text">Loyalty points: <strong className="text-brand-rose">{orders.length * 10}</strong> (10 pts per order)</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form className="panel grid gap-3" onSubmit={saveProfile}>
          <h2 className="text-xl font-black text-ink">Profile</h2>
          <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input placeholder="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          <button className="btn-primary">Edit Profile</button>
        </form>

        <form className="panel grid gap-3" onSubmit={trackOrder}>
          <h2 className="text-xl font-black text-ink">Order Tracking</h2>
          <input placeholder="Order number" value={track} onChange={(e) => setTrack(e.target.value)} />
          <button className="btn-secondary">Track</button>
          {tracking && <p className="font-bold text-ink">{tracking.orderNumber}: {tracking.status}</p>}
        </form>

        <div className="panel">
          <h2 className="text-xl font-black text-ink">Notifications</h2>
          {notifications.length ? notifications.map((item) => <p className="mt-2 text-sm text-muted" key={item._id}>{item.title}: {item.message}</p>) : <p className="text-sm text-muted">No notifications yet.</p>}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="panel">
          <h2 className="text-xl font-black text-ink dark:text-white">My Orders</h2>
          {orders.map((order) => (
            <Link className="mt-2 block text-sm text-muted hover:text-brand-rose" key={order._id} to={`/orders/${order.orderNumber}`}>
              {order.orderNumber} — {order.status} — LKR {order.total.toLocaleString()}
            </Link>
          ))}
        </div>
        <div className="panel">
          <h2 className="text-xl font-black text-ink">Wishlist</h2>
          {wishlist.map((product) => <p className="mt-2 text-sm text-muted" key={product._id}>{product.name}</p>)}
        </div>
        <div className="panel">
          <h2 className="text-xl font-black text-ink">Saved Addresses</h2>
          {addresses.map((address) => <p className="mt-2 text-sm text-muted" key={address._id}>{address.label}: {address.city}</p>)}
        </div>
      </div>
    </section>
  );
}
