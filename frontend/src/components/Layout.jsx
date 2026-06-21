import { FiHeart, FiLogOut, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLink = ({ isActive }) =>
  `text-sm font-semibold ${isActive ? 'text-mulberry' : 'text-stone-700 hover:text-mulberry'}`;

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();

  useEffect(() => {
    const handle = setTimeout(() => {
      if (search.trim().length < 2) return setSuggestions([]);
      api.get('/products/suggestions/list', { params: { search } }).then(({ data }) => setSuggestions(data));
    }, 250);
    return () => clearTimeout(handle);
  }, [search]);

  const links = [
    ['/', 'Home'],
    ['/shop', 'Shop'],
    ['/shop?sort=newest', 'New Arrivals'],
    ['/shop?sort=popular', 'Best Sellers'],
    ['/wholesale', 'Wholesale'],
    ['/special-offers', 'Special Offers'],
    ['/about', 'About Us'],
    ['/contact', 'Contact Us']
  ];

  const whatsappMessage = encodeURIComponent('Hello Chandira Kids,\n\nI would like to place an order.\n\nProduct:\nQuantity:\nCustomer Name:');

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-linen/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-xl font-black tracking-wide text-mulberry">Chandira Kids</Link>
          <div className="relative hidden flex-1 md:block">
            <FiSearch className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <input className="w-full pl-9" placeholder="Search dresses, ages, colors" value={search} onChange={(e) => setSearch(e.target.value)} />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-12 z-50 rounded-lg border border-stone-200 bg-white p-2 shadow-xl">
                {suggestions.map((item) => (
                  <Link key={item._id} className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-linen" to={`/products/${item.slug}`} onClick={() => { setSearch(''); setSuggestions([]); }}>
                    <img className="h-10 w-10 rounded-md object-cover" src={item.images?.[0]?.url} alt={item.name} />
                    <span>{item.code} - {item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
          <nav className={`${open ? 'absolute left-0 right-0 top-16 grid bg-linen p-4 shadow' : 'hidden'} gap-4 md:flex md:items-center md:static md:bg-transparent md:p-0 md:shadow-none`}>
            {links.map(([to, label]) => <NavLink key={label} className={navLink} to={to}>{label}</NavLink>)}
            <NavLink className={navLink} to="/wishlist"><FiHeart className="inline h-4 w-4" /> Wishlist</NavLink>
            {isAdmin && <NavLink className={navLink} to="/admin">Admin</NavLink>}
            <NavLink className={navLink} to="/cart"><FiShoppingBag className="inline h-4 w-4" /> Cart ({count})</NavLink>
            {user ? (
              <>
                <NavLink className={navLink} to="/dashboard">Account</NavLink>
                <button className="flex items-center gap-1 text-sm font-semibold" onClick={logout}><FiLogOut className="h-4 w-4" /> Logout</button>
              </>
            ) : (
              <NavLink className={navLink} to="/login"><FiUser className="inline h-4 w-4" /> Account</NavLink>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <a
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal text-2xl text-white shadow-xl transition hover:-translate-y-1"
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <footer className="mt-16 border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-stone-600 md:grid-cols-4">
          <div><strong className="text-ink">Chandira Kids</strong><p>Retail and wholesale girls clothing for ages 0 to 15.</p></div>
          <div><strong className="text-ink">Customer care</strong><p>Island-wide delivery, COD, bank transfer, and WhatsApp ordering.</p></div>
          <div><strong className="text-ink">Store hours</strong><p>Monday to Saturday, 9.00 AM to 6.00 PM.</p></div>
          <div><strong className="text-ink">Newsletter</strong><p>New arrivals, offers, and wholesale updates.</p></div>
        </div>
      </footer>
    </div>
  );
}
