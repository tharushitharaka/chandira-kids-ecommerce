import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import BlogDetail from './pages/BlogDetail';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Compare from './pages/Compare';
import Dashboard from './pages/Dashboard';
import Faq from './pages/Faq';
import ForgotPassword from './pages/ForgotPassword';
import GiftCards from './pages/GiftCards';
import Home from './pages/Home';
import Loyalty from './pages/Loyalty';
import Login from './pages/Login';
import NewsletterUnsubscribe from './pages/NewsletterUnsubscribe';
import NotFound from './pages/NotFound';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetail from './pages/OrderDetail';
import OrderTracking from './pages/OrderTracking';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';
import Returns from './pages/Returns';
import ResetPassword from './pages/ResetPassword';
import Shipping from './pages/Shipping';
import Shop from './pages/Shop';
import SizeGuide from './pages/SizeGuide';
import { About, Contact, SpecialOffers } from './pages/StaticPage';
import Wholesale from './pages/Wholesale';
import Wishlist from './pages/Wishlist';
import { useAuth } from './context/AuthContext';

const Protected = ({ children, admin = false }) => {
  const { user, isAdmin } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (admin && !isAdmin) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="/wholesale" element={<Wholesale />} />
        <Route path="/special-offers" element={<SpecialOffers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
        <Route path="/wishlist" element={<Protected><Wishlist /></Protected>} />
        <Route path="/loyalty" element={<Protected><Loyalty /></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin" element={<Protected admin><AdminDashboard /></Protected>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
