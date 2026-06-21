import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

const categories = ['', 'Baby Frocks', 'Party Dresses', 'Casual Dresses', 'Clothing Sets', 'Tops', 'Skirts', 'T-shirts', 'Leggings', 'Hairbands', 'Accessories', 'Seasonal Collections'];
const ageCategories = ['', 'Infants (0-12 months)', 'Toddlers (1-3 years)', 'Little Girls (4-7 years)', 'Kids (8-12 years)', 'Teen Girls (13-15 years)'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], page: 1, pages: 1 });
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    ageCategory: searchParams.get('ageCategory') || '',
    sort: searchParams.get('sort') || 'newest',
    page: searchParams.get('page') || '1'
  });

  useEffect(() => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
    setSearchParams(params);
    api.get('/products', { params }).then(({ data: response }) => setData(response));
  }, [filters, setSearchParams]);

  const setFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value, page: key === 'page' ? value : '1' }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SEO title="Shop Girls Clothing | Chandira Kids" description="Filter and search Chandira Kids girls clothing by age, category, price, and newest styles." />
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black">Shop girls clothing</h1>
          <p className="text-stone-600">Retail and wholesale pricing available on every product.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          <label className="relative">
            <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input className="pl-9" placeholder="Search" value={filters.search} onChange={(e) => setFilter('search', e.target.value)} />
          </label>
          <select value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>
            {categories.map((category) => <option key={category} value={category}>{category || 'All categories'}</option>)}
          </select>
          <select value={filters.ageCategory} onChange={(e) => setFilter('ageCategory', e.target.value)}>
            {ageCategories.map((category) => <option key={category} value={category}>{category || 'All ages'}</option>)}
          </select>
          <select value={filters.sort} onChange={(e) => setFilter('sort', e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price_asc">Price low to high</option>
            <option value="price_desc">Price high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: data.pages || 1 }, (_, index) => (
          <button key={index + 1} className={Number(filters.page) === index + 1 ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('page', String(index + 1))}>{index + 1}</button>
        ))}
      </div>
    </section>
  );
}
