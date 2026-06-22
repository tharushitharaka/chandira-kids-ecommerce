import { Link } from 'react-router-dom';
import { FiHome, FiShoppingBag } from 'react-icons/fi';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <section className="page-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
      <SEO title="Page Not Found | Chandira Kids" description="The page you are looking for does not exist." />
      <p className="text-8xl font-extrabold text-brand-pink">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink dark:text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-body text-muted">Sorry, we couldn&apos;t find that page. Explore our collection or return home.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link className="btn-primary" to="/"><FiHome /> Back to home</Link>
        <Link className="btn-secondary" to="/shop"><FiShoppingBag /> Shop collection</Link>
      </div>
    </section>
  );
}
