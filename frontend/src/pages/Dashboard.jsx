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
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SEO title="Account Dashboard | Chandira Kids" />
      <h1 className="mb-6 text-3xl font-black">My Account</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <form className="panel grid gap-3" onSubmit={saveProfile}>
          <h2 className="font-black">Profile</h2>
          <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          <input placeholder="Phone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          <button className="btn-primary">Edit Profile</button>
        </form>
        <form className="panel grid gap-3" onSubmit={trackOrder}>
          <h2 className="font-black">Order Tracking</h2>
          <input placeholder="Order number" value={track} onChange={(e) => setTrack(e.target.value)} />
          <button className="btn-secondary">Track</button>
          {tracking && <p className="font-bold">{tracking.orderNumber}: {tracking.status}</p>}
        </form>
        <div className="panel">
          <h2 className="font-black">Notifications</h2>
          {notifications.length ? notifications.map((item) => <p className="mt-2 text-sm" key={item._id}>{item.title}: {item.message}</p>) : <p className="text-sm text-stone-500">No notifications yet.</p>}
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="panel"><h2 className="font-black">My Orders</h2>{orders.map((order) => <p className="mt-2 text-sm" key={order._id}>{order.orderNumber} - {order.status} - LKR {order.total.toLocaleString()}</p>)}</div>
        <div className="panel"><h2 className="font-black">Wishlist</h2>{wishlist.map((product) => <p className="mt-2 text-sm" key={product._id}>{product.name}</p>)}</div>
        <div className="panel"><h2 className="font-black">Saved Addresses</h2>{addresses.map((address) => <p className="mt-2 text-sm" key={address._id}>{address.label}: {address.city}</p>)}</div>
      </div>
    </section>
  );
}
