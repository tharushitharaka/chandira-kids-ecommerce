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
    const { data } = await api.get(`/orders/track/${track}`);
    setTracking(data);
  };

  return (
    <section className="page-shell">
      <SEO title="Account Dashboard | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">My account</p>
        <h1 className="mt-2 text-3xl font-black text-[#171717]">Welcome back, {user?.name || 'there'}</h1>
        <p className="mt-2 muted-text">Manage your profile, orders, wishlist, and saved details here.</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form className="panel grid gap-3" onSubmit={saveProfile}>
          <h2 className="text-xl font-black text-[#171717]">Profile</h2>
          <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input placeholder="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          <button className="btn-primary">Edit Profile</button>
        </form>

        <form className="panel grid gap-3" onSubmit={trackOrder}>
          <h2 className="text-xl font-black text-[#171717]">Order Tracking</h2>
          <input placeholder="Order number" value={track} onChange={(e) => setTrack(e.target.value)} />
          <button className="btn-secondary">Track</button>
          {tracking && <p className="font-bold text-[#171717]">{tracking.orderNumber}: {tracking.status}</p>}
        </form>

        <div className="panel">
          <h2 className="text-xl font-black text-[#171717]">Notifications</h2>
          {notifications.length ? notifications.map((item) => <p className="mt-2 text-sm text-[#5c5144]" key={item._id}>{item.title}: {item.message}</p>) : <p className="text-sm text-[#6a5f50]">No notifications yet.</p>}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="panel">
          <h2 className="text-xl font-black text-[#171717]">My Orders</h2>
          {orders.map((order) => <p className="mt-2 text-sm text-[#5c5144]" key={order._id}>{order.orderNumber} - {order.status} - LKR {order.total.toLocaleString()}</p>)}
        </div>
        <div className="panel">
          <h2 className="text-xl font-black text-[#171717]">Wishlist</h2>
          {wishlist.map((product) => <p className="mt-2 text-sm text-[#5c5144]" key={product._id}>{product.name}</p>)}
        </div>
        <div className="panel">
          <h2 className="text-xl font-black text-[#171717]">Saved Addresses</h2>
          {addresses.map((address) => <p className="mt-2 text-sm text-[#5c5144]" key={address._id}>{address.label}: {address.city}</p>)}
        </div>
      </div>
    </section>
  );
}
