import { FiHeart, FiLogOut, FiMenu, FiShoppingBag, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLink = ({ isActive }) =>
  `text-sm font-semibold ${isActive ? 'text-mulberry' : 'text-stone-700 hover:text-mulberry'}`;

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-linen/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-black tracking-wide text-mulberry">Chandira Kids</Link>
          <button className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            <FiMenu />
          </button>
          <nav className={`${open ? 'absolute left-0 right-0 top-16 grid bg-linen p-4 shadow' : 'hidden'} gap-4 md:flex md:items-center md:static md:bg-transparent md:p-0 md:shadow-none`}>
            <NavLink className={navLink} to="/shop">Shop</NavLink>
            <NavLink className={navLink} to="/wholesale">Wholesale</NavLink>
            <NavLink className={navLink} to="/wishlist"><FiHeart className="inline h-4 w-4" /> Wishlist</NavLink>
            {isAdmin && <NavLink className={navLink} to="/admin">Admin</NavLink>}
            <NavLink className={navLink} to="/cart"><FiShoppingBag className="inline h-4 w-4" /> Cart ({count})</NavLink>
            {user ? (
              <button className="flex items-center gap-1 text-sm font-semibold" onClick={logout}><FiLogOut className="h-4 w-4" /> Logout</button>
            ) : (
              <NavLink className={navLink} to="/login"><FiUser className="inline h-4 w-4" /> Login</NavLink>
            )}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-stone-600 md:grid-cols-3">
          <div><strong className="text-ink">Chandira Kids</strong><p>Retail and wholesale girls clothing for ages 0 to 15.</p></div>
          <div><strong className="text-ink">Customer care</strong><p>Island-wide delivery, COD, bank transfer, and WhatsApp ordering.</p></div>
          <div><strong className="text-ink">Store hours</strong><p>Monday to Saturday, 9.00 AM to 6.00 PM.</p></div>
        </div>
      </footer>
    </div>
  );
}
