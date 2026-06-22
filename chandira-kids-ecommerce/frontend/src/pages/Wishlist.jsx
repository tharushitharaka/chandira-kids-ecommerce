import { useEffect, useState } from 'react';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

export default function Wishlist() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/users/wishlist').then(({ data }) => setProducts(data));
  }, []);

  return (
    <section className="page-shell">
      <SEO title="Wishlist | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">Saved items</p>
        <h1 className="mt-2 text-3xl font-black text-ink">Wishlist</h1>
        <p className="mt-2 muted-text">Keep track of your favourite styles for later.</p>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
}
