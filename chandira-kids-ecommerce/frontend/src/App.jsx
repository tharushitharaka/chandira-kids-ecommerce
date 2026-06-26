import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';

/* ── Lazy-loaded pages (code splitting — each page is its own chunk) ─── */
const Home               = lazy(() => import('./pages/Home'));
const Shop               = lazy(() => import('./pages/Shop'));
const ProductDetails     = lazy(() => import('./pages/ProductDetails'));
const Cart               = lazy(() => import('./pages/Cart'));
const Checkout           = lazy(() => import('./pages/Checkout'));
const OrderConfirmation  = lazy(() => import('./pages/OrderConfirmation'));
const OrderDetail        = lazy(() => import('./pages/OrderDetail'));
const OrderTracking      = lazy(() => import('./pages/OrderTracking'));
const Wholesale          = lazy(() => import('./pages/Wholesale'));
const Faq                = lazy(() => import('./pages/Faq'));
const Blog               = lazy(() => import('./pages/Blog'));
const BlogDetail         = lazy(() => import('./pages/BlogDetail'));
const GiftCards          = lazy(() => import('./pages/GiftCards'));
const Compare            = lazy(() => import('./pages/Compare'));
const SizeGuide          = lazy(() => import('./pages/SizeGuide'));
const Returns            = lazy(() => import('./pages/Returns'));
const Shipping           = lazy(() => import('./pages/Shipping'));
const Loyalty            = lazy(() => import('./pages/Loyalty'));
const Dashboard          = lazy(() => import('./pages/Dashboard'));
const Wishlist           = lazy(() => import('./pages/Wishlist'));
const Login              = lazy(() => import('./pages/Login'));
const Register           = lazy(() => import('./pages/Register'));
const ForgotPassword     = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword      = lazy(() => import('./pages/ResetPassword'));
const AdminDashboard     = lazy(() => import('./pages/AdminDashboard'));
const NewsletterUnsubscribe = lazy(() => import('./pages/NewsletterUnsubscribe'));
const NotFound           = lazy(() => import('./pages/NotFound'));
const { About, Contact, SpecialOffers } = {
  About:         lazy(() => import('./pages/StaticPage').then(m => ({ default: m.About }))),
  Contact:       lazy(() => import('./pages/StaticPage').then(m => ({ default: m.Contact }))),
  SpecialOffers: lazy(() => import('./pages/StaticPage').then(m => ({ default: m.SpecialOffers }))),
};

/* ── Page-level loading skeleton ──────────────────────────────────── */
function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #FBD9E5', borderTopColor: '#C43670', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ── Route guard ──────────────────────────────────────────────────── */
const Protected = ({ children, admin = false }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (admin && !isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"                       element={<Home />} />
          <Route path="/shop"                   element={<Shop />} />
          <Route path="/products/:slug"         element={<ProductDetails />} />
          <Route path="/cart"                   element={<Cart />} />
          <Route path="/checkout"               element={<Checkout />} />
          <Route path="/order-confirmation"     element={<OrderConfirmation />} />
          <Route path="/orders/:id"             element={<OrderDetail />} />
          <Route path="/track-order"            element={<OrderTracking />} />
          <Route path="/wholesale"              element={<Wholesale />} />
          <Route path="/special-offers"         element={<SpecialOffers />} />
          <Route path="/about"                  element={<About />} />
          <Route path="/contact"                element={<Contact />} />
          <Route path="/size-guide"             element={<SizeGuide />} />
          <Route path="/returns"                element={<Returns />} />
          <Route path="/shipping"               element={<Shipping />} />
          <Route path="/faq"                    element={<Faq />} />
          <Route path="/blog"                   element={<Blog />} />
          <Route path="/blog/:id"               element={<BlogDetail />} />
          <Route path="/gift-cards"             element={<GiftCards />} />
          <Route path="/compare"                element={<Compare />} />
          <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
          <Route path="/wishlist"               element={<Protected><Wishlist /></Protected>} />
          <Route path="/loyalty"                element={<Protected><Loyalty /></Protected>} />
          <Route path="/dashboard"              element={<Protected><Dashboard /></Protected>} />
          <Route path="/login"                  element={<Login />} />
          <Route path="/register"               element={<Register />} />
          <Route path="/forgot-password"        element={<ForgotPassword />} />
          <Route path="/reset-password/:token"  element={<ResetPassword />} />
          <Route path="/admin"                  element={<Protected admin><AdminDashboard /></Protected>} />
          <Route path="*"                       element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
