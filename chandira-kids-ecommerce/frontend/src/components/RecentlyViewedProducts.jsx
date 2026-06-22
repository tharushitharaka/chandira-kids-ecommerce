import ProductCard from './ProductCard';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';

export default function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="page-shell py-12">
      <p className="section-label">Continue browsing</p>
      <h2 className="section-title mt-2 mb-8">Recently Viewed</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recentlyViewed.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
