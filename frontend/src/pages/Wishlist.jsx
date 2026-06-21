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
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SEO title="Wishlist | Chandira Kids" />
      <h1 className="mb-6 text-3xl font-black">Wishlist</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
}
