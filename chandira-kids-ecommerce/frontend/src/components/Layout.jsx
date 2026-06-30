import { FiHeart, FiLogOut, FiMenu, FiShoppingBag, FiShield, FiUser, FiX } from 'react-icons/fi';
import { FaCcVisa, FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import BackToTop from './BackToTop';
import CompareBar from './CompareBar';
import LiveChat from './LiveChat';
import NewsletterPopup from './NewsletterPopup';
import SocialProof from './SocialProof';

const navLinkClass = ({ isActive }) =>
  `nav-link rounded-full px-4 py-2 hover:bg-brand-blush/40 ${isActive ? 'nav-link-active' : ''}`;

const mobileNavClass = ({ isActive }) =>
  `nav-link rounded-xl px-4 py-3 hover:bg-brand-blush/40 ${isActive ? 'nav-link-active' : ''}`;

const primaryLinks = [
  ['/', 'Home'],
  ['/shop', 'Shop'],
  ['/shop?sort=newest', 'New Arrivals'],
  ['/shop?sort=popular', 'Best Sellers']
];

const secondaryLinks = [
  ['/wholesale', 'Wholesale'],
  ['/special-offers', 'Special Offers'],
  ['/about', 'About Us'],
  ['/contact', 'Contact Us']
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const whatsappMessage = encodeURIComponent('Hello Chandira Kids,\n\nI would like to place an order.\n\nProduct:\nQuantity:\nCustomer Name:');

  return (
    <div className="min-h-screen bg-brand-champagne dark:bg-gray-950">
      <header className="sticky top-0 z-40 border-b border-brand-blush/70 bg-white/90 backdrop-blur-xl shadow-soft dark:border-gray-800 dark:bg-gray-900/90">
        <div className="border-b border-brand-blush/40 bg-gradient-to-r from-brand-blush/30 via-white to-brand-blush/20">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-2 text-center text-body-sm font-semibold text-brand-raspberry sm:px-6">
            Island-wide delivery · WhatsApp ordering · Retail & wholesale
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="Chandira Kids Logo"
              className="h-12 w-12 rounded-2xl object-cover shadow-soft transition hover:scale-105"
            />
            <div className="hidden leading-tight sm:block">
              <span className="heading-serif text-lg font-bold text-brand-raspberry">Chandira Kids</span>
              <span className="mt-0.5 block text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">Girls fashion 0–15</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <NavLink className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-raspberry px-3 py-2.5 text-body-sm font-bold text-white shadow-soft transition hover:shadow-glow sm:px-4" to="/cart">
              <FiShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-extrabold text-brand-raspberry">
                  {count}
                </span>
              )}
            </NavLink>
            <NavLink className="hidden rounded-full border-2 border-brand-blush px-3 py-2.5 text-body-sm font-bold text-brand-raspberry transition hover:border-brand-primary hover:bg-brand-blush/40 lg:inline-flex xl:px-4" to={user ? '/dashboard' : '/login'}>
              <FiUser className="mr-1.5 h-4 w-4" />
              <span className="hidden xl:inline">{user ? 'Account' : 'Sign in'}</span>
            </NavLink>
            {user && (
              <button className="hidden rounded-full border-2 border-brand-blush px-3 py-2.5 text-body-sm font-bold text-brand-raspberry transition hover:border-brand-primary hover:bg-brand-blush/40 lg:inline-flex xl:px-4 items-center gap-2" onClick={logout}>
                <FiLogOut className="h-4 w-4" />
                <span className="hidden xl:inline">Logout</span>
              </button>
            )}
            <button
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-text-dark transition hover:bg-brand-blush/50 lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle menu"
            >
              {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <nav className="hidden border-t border-brand-blush/40 lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-4 py-2 sm:px-6">
            {primaryLinks.concat(secondaryLinks).map(([to, label]) => (
              <NavLink key={label} className={navLinkClass} to={to}>
                {label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink className={navLinkClass} to="/admin">
                Admin
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-text-dark/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close menu" />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-card">
            <div className="flex items-center justify-between border-b border-brand-blush p-4">
              <span className="heading-serif text-lg font-bold text-brand-raspberry">Menu</span>
              <button className="rounded-xl p-2 hover:bg-brand-blush/50" onClick={() => setOpen(false)} aria-label="Close">
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="grid gap-1">
                {primaryLinks.concat(secondaryLinks).map(([to, label]) => (
                  <NavLink key={label} className={mobileNavClass} to={to} onClick={() => setOpen(false)}>
                    {label}
                  </NavLink>
                ))}
                <NavLink className={mobileNavClass} to="/wishlist" onClick={() => setOpen(false)}>
                  <FiHeart className="mr-2 inline h-4 w-4" /> Wishlist
                </NavLink>
                {isAdmin && (
                  <NavLink className={mobileNavClass} to="/admin" onClick={() => setOpen(false)}>
                    Admin
                  </NavLink>
                )}
              </div>
            </nav>
            <div className="border-t border-brand-blush p-4">
              {user ? (
                <div className="grid gap-2">
                  <NavLink className="btn-secondary w-full" to="/dashboard" onClick={() => setOpen(false)}>My account</NavLink>
                  <button className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-body-sm font-bold text-brand-raspberry" onClick={() => { logout(); setOpen(false); }}>
                    <FiLogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              ) : (
                <NavLink className="btn-primary w-full" to="/login" onClick={() => setOpen(false)}>
                  <FiUser className="h-4 w-4" /> Sign in
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>
      <BackToTop />
      <LiveChat />
      <CompareBar />
      <SocialProof />
      <NewsletterPopup />

      <a
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-brand-primary to-brand-raspberry text-2xl text-white shadow-card transition hover:-translate-y-1 hover:shadow-glow"
        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      <footer className="mt-20 border-t border-brand-blush bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Chandira Kids Logo"
                className="h-10 w-10 rounded-xl object-cover shadow-soft"
              />
              <strong className="heading-serif text-lg font-bold text-brand-raspberry">Chandira Kids</strong>
            </div>
            <p className="mt-4 text-body-sm leading-relaxed text-muted">Beautiful girls clothing for ages 0 to 15. Retail shopping and wholesale support for boutiques across the island.</p>
            <div className="mt-4 flex gap-3">
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blush text-brand-raspberry transition hover:bg-brand-primary hover:text-white dark:bg-gray-800" href="https://facebook.com/chandirakids" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blush text-brand-raspberry transition hover:bg-brand-primary hover:text-white dark:bg-gray-800" href="https://instagram.com/chandirakids" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blush text-brand-raspberry transition hover:bg-brand-primary hover:text-white dark:bg-gray-800" href="https://tiktok.com/@chandirakids" target="_blank" rel="noreferrer" aria-label="TikTok"><FaTiktok /></a>
              <a className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blush text-brand-raspberry transition hover:bg-brand-primary hover:text-white dark:bg-gray-800" href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </div>
          <div>
            <strong className="text-body-sm font-bold uppercase tracking-wide text-brand-raspberry">Help</strong>
            <div className="mt-3 grid gap-2 text-body-sm font-semibold">
              <Link className="text-muted transition hover:text-brand-raspberry" to="/size-guide">Size guide</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/shipping">Shipping info</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/returns">Returns & refunds</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/faq">FAQ</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/blog">Blog</Link>
            </div>
          </div>
          <div>
            <strong className="text-body-sm font-bold uppercase tracking-wide text-brand-raspberry">Store</strong>
            <div className="mt-3 grid gap-2 text-body-sm font-semibold">
              <Link className="text-muted transition hover:text-brand-raspberry" to="/shop">Shop all</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/gift-cards">Gift cards</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/wholesale">Wholesale</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/special-offers">Special offers</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/compare">Compare products</Link>
            </div>
          </div>
          <div>
            <strong className="text-body-sm font-bold uppercase tracking-wide text-brand-raspberry">Account</strong>
            <div className="mt-3 grid gap-2 text-body-sm font-semibold">
              <Link className="text-muted transition hover:text-brand-raspberry" to="/dashboard">My account</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/wishlist">Wishlist</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/loyalty">Loyalty rewards</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/track-order">Track order</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/contact">Contact us</Link>
              <Link className="text-muted transition hover:text-brand-raspberry" to="/newsletter/unsubscribe">Unsubscribe</Link>
            </div>
            <p className="mt-4 text-body-sm text-muted">Mon–Sat, 9 AM – 6 PM</p>
          </div>
        </div>
        <div className="border-t border-brand-blush/60 py-6 text-center text-body-sm text-muted dark:border-gray-800">
          <div className="mb-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs">
              <FiShield className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs">Accepted Payments:</span>
              <FaCcVisa className="h-6 w-8 text-brand-rose" />
              <span className="text-xs font-bold">Cash on Delivery</span>
              <span className="text-xs font-bold">Bank Transfer</span>
            </div>
          </div>
          © {new Date().getFullYear()} Chandira Kids · Currency: LKR (Sri Lankan Rupee)
        </div>
      </footer>
    </div>
  );
}
