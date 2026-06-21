import { FiSearch, FiSliders } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';

const categories = ['', 'Baby Frocks', 'Party Dresses', 'Casual Dresses', 'Clothing Sets', 'Tops', 'Skirts', 'T-shirts', 'Leggings', 'Hairbands', 'Accessories', 'Seasonal Collections'];
const ageCategories = ['', 'Infants (0-12 months)', 'Toddlers (1-3 years)', 'Little Girls (4-7 years)', 'Kids (8-12 years)', 'Teen Girls (13-15 years)'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], page: 1, pages: 1, total: 0 });
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    ageCategory: searchParams.get('ageCategory') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    priceType: searchParams.get('priceType') || '',
    sort: searchParams.get('sort') || 'newest',
    page: searchParams.get('page') || '1'
  });

  useEffect(() => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
    setSearchParams(params);
    api.get('/products', { params }).then(({ data: response }) => setData(response));
  }, [filters, setSearchParams]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (filters.search.length < 2) return setSuggestions([]);
      api.get('/products/suggestions/list', { params: { search: filters.search } }).then(({ data: response }) => setSuggestions(response));
    }, 200);
    return () => clearTimeout(handle);
  }, [filters.search]);

  const setFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value, page: key === 'page' ? value : '1' }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SEO title="Shop Girls Clothing | Chandira Kids" description="Filter Chandira Kids girls clothing by search, category, age, price, retail, wholesale, newest, and popularity." />
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black">Shop girls clothing</h1>
          <p className="text-stone-600">{data.total} products with retail and wholesale options.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-bold text-teal shadow-sm"><FiSliders /> Mobile-first filters</div>
      </div>

      <div className="mb-8 grid gap-3 rounded-lg border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur md:grid-cols-4 lg:grid-cols-7">
        <label className="relative md:col-span-2">
          <FiSearch className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
          <input className="w-full pl-9" placeholder="Search products" value={filters.search} onChange={(e) => setFilter('search', e.target.value)} />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-30 rounded-lg border border-stone-200 bg-white p-2 shadow-xl">
              {suggestions.map((item) => <Link className="block rounded-md p-2 text-sm hover:bg-linen" key={item._id} to={`/products/${item.slug}`}>{item.code} - {item.name}</Link>)}
            </div>
          )}
        </label>
        <select value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>{categories.map((category) => <option key={category} value={category}>{category || 'All categories'}</option>)}</select>
        <select value={filters.ageCategory} onChange={(e) => setFilter('ageCategory', e.target.value)}>{ageCategories.map((category) => <option key={category} value={category}>{category || 'All ages'}</option>)}</select>
        <input type="number" placeholder="Min price" value={filters.minPrice} onChange={(e) => setFilter('minPrice', e.target.value)} />
        <input type="number" placeholder="Max price" value={filters.maxPrice} onChange={(e) => setFilter('maxPrice', e.target.value)} />
        <select value={filters.priceType} onChange={(e) => setFilter('priceType', e.target.value)}>
          <option value="">Retail & wholesale</option>
          <option value="retail">Retail</option>
          <option value="wholesale">Wholesale</option>
        </select>
        <select value={filters.sort} onChange={(e) => setFilter('sort', e.target.value)}>
          <option value="newest">Newest</option>
          <option value="popular">Popularity</option>
          <option value="price_asc">Price Low To High</option>
          <option value="price_desc">Price High To Low</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {Array.from({ length: data.pages || 1 }, (_, index) => (
          <button key={index + 1} className={Number(filters.page) === index + 1 ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('page', String(index + 1))}>{index + 1}</button>
        ))}
      </div>
    </section>
  );
}
