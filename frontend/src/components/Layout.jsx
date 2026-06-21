import { FiHeart, FiLogOut, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLink = ({ isActive }) =>
  `text-sm font-semibold transition ${isActive ? 'text-[#b38a50]' : 'text-[#5c5144] hover:text-[#b38a50]'}`;

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
    <div className="min-h-screen bg-[#f7f3ea]">
      <header className="sticky top-0 z-40 border-b border-[#ece3cf] bg-[#fffaf1]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#1f1f1f] shadow-sm ring-1 ring-[#ece3cf]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f] via-[#2d241f] to-[#c9a56d]" />
              <span className="relative text-xs font-black tracking-[0.35em] text-[#fffaf1]">CK</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="heading-serif text-base font-semibold tracking-[0.18em] text-[#1f1f1f] md:text-lg">Chandira</span>
              <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.48em] text-[#b38a50]">Kids</span>
            </div>
          </Link>

          <div className="relative hidden flex-1 md:block">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a8575]" />
            <input
              className="w-full rounded-full border border-[#ece3cf] bg-[#fffaf1] pl-10 pr-4 py-3 text-sm shadow-sm focus:border-[#c9a56d]"
              placeholder="Search dresses, ages, colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-14 z-50 rounded-2xl border border-[#ece3cf] bg-white p-2 shadow-2xl">
                {suggestions.map((item) => (
                  <Link
                    key={item._id}
                    className="flex items-center gap-3 rounded-xl p-2 text-sm hover:bg-[#fffaf1]"
                    to={`/products/${item.slug}`}
                    onClick={() => { setSearch(''); setSuggestions([]); }}
                  >
                    <img className="h-10 w-10 rounded-lg object-cover" src={item.images?.[0]?.url} alt={item.name} />
                    <span>{item.code} - {item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button className="inline-flex items-center justify-center rounded-xl p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>

          <nav className={`${open ? 'absolute left-0 right-0 top-16 grid gap-3 bg-white p-4 shadow-lg md:hidden' : 'hidden'} md:flex md:items-center md:gap-3`}>
            {links.map(([to, label]) => <NavLink key={label} className={navLink} to={to}>{label}</NavLink>)}
            <NavLink className={navLink} to="/wishlist"><FiHeart className="inline h-4 w-4" /> Wishlist</NavLink>
            {isAdmin && <NavLink className={navLink} to="/admin">Admin</NavLink>}
            <NavLink className={navLink} to="/cart"><FiShoppingBag className="inline h-4 w-4" /> Cart ({count})</NavLink>
            {user ? (
              <>
                <NavLink className={navLink} to="/dashboard">Account</NavLink>
                <button className="flex items-center gap-1 text-sm font-semibold text-[#5c5144]" onClick={logout}><FiLogOut className="h-4 w-4" /> Logout</button>
              </>
            ) : (
              <NavLink className={navLink} to="/login"><FiUser className="inline h-4 w-4" /> Account</NavLink>
            )}
          </nav>

          <nav className="hidden md:flex md:items-center md:gap-2">
            {links.slice(0, 4).map(([to, label]) => (
              <NavLink key={label} className={navLink} to={to}>{label}</NavLink>
            ))}
            <NavLink className={navLink} to="/wishlist">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fffaf1] px-3 py-2">
                <FiHeart className="h-4 w-4" /> Wishlist
              </span>
            </NavLink>
            <NavLink className={navLink} to="/cart">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#1f1f1f] px-3 py-2 text-white">
                <FiShoppingBag className="h-4 w-4" /> Cart ({count})
              </span>
            </NavLink>
            {user ? (
              <NavLink className={navLink} to="/dashboard">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#eee4d7] bg-white px-3 py-2">Account</span>
              </NavLink>
            ) : (
              <NavLink className={navLink} to="/login">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#eee4d7] bg-white px-3 py-2">Account</span>
              </NavLink>
            )}
            {isAdmin && <NavLink className={navLink} to="/admin">Admin</NavLink>}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <a
        className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#1f1f1f] to-[#c9a56d] text-2xl text-white shadow-2xl transition hover:-translate-y-1"
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
      >
        <FaWhatsapp />
      </a>
      <footer className="mt-16 border-t border-[#ece3cf] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-[#6a5f50] md:grid-cols-4 md:px-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f1f1f] text-xs font-black tracking-[0.3em] text-[#fffaf1]">CK</div>
              <strong className="text-[#1f1f1f]">Chandira Kids</strong>
            </div>
            <p className="mt-2">Retail and wholesale girls clothing for ages 0 to 15.</p>
          </div>
          <div>
            <strong className="text-[#1f1f1f]">Customer care</strong>
            <p className="mt-2">Island-wide delivery, COD, bank transfer, and WhatsApp ordering.</p>
          </div>
          <div>
            <strong className="text-[#1f1f1f]">Store hours</strong>
            <p className="mt-2">Monday to Saturday, 9.00 AM to 6.00 PM.</p>
          </div>
          <div>
            <strong className="text-[#1f1f1f]">Newsletter</strong>
            <p className="mt-2">New arrivals, offers, and wholesale updates.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
