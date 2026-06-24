import { FiSearch, FiSliders } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import LoadingSpinner, { ProductGridSkeleton } from '../components/LoadingSpinner';
import SEO from '../components/SEO';

const categories = ['', 'Baby Frocks', 'Party Dresses', 'Casual Dresses', 'Clothing Sets', 'Tops', 'Skirts', 'T-shirts', 'Leggings', 'Hairbands', 'Accessories', 'Seasonal Collections'];
const ageCategories = ['', 'Infants (0-12 months)', 'Toddlers (1-3 years)', 'Little Girls (4-7 years)', 'Kids (8-12 years)', 'Teen Girls (13-15 years)'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], page: 1, pages: 1, total: 0 });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    ageCategory: searchParams.get('ageCategory') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    priceType: searchParams.get('priceType') || '',
    color: searchParams.get('color') || '',
    size: searchParams.get('size') || '',
    sort: searchParams.get('sort') || 'newest',
    page: searchParams.get('page') || '1'
  });

  useEffect(() => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
    setSearchParams(params);
    setLoading(true);
    api.get('/products', { params }).then(({ data: response }) => setData(response)).finally(() => setLoading(false));
  }, [filters.search, filters.category, filters.ageCategory, filters.minPrice, filters.maxPrice, filters.priceType, filters.color, filters.size, filters.sort, filters.page, setSearchParams]);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (filters.search.length < 2) return setSuggestions([]);
      api.get('/products/suggestions/list', { params: { search: filters.search } }).then(({ data: response }) => setSuggestions(response));
    }, 200);
    return () => clearTimeout(handle);
  }, [filters.search]);

  const setFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value, page: key === 'page' ? value : '1' }));

  return (
    <section className="page-shell">
      <SEO title="Shop Girls Clothing | Chandira Kids" description="Filter Chandira Kids girls clothing by search, category, age, price, retail, wholesale, newest, and popularity." />
      <div className="page-hero mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Collection</p>
            <h1 className="section-title mt-2">Shop girls clothing</h1>
            <p className="mt-3 text-body text-muted">{data.total} products with retail and wholesale options.</p>
          </div>
          <div className="brand-pill">
            <FiSliders /> Smart filters
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-3 rounded-3xl border border-brand-blush/80 bg-white p-4 shadow-soft md:grid-cols-4 lg:grid-cols-8">
        <label className="relative md:col-span-2">
          <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-pink" />
          <input className="w-full pl-11" placeholder="Search products" value={filters.search} onChange={(e) => setFilter('search', e.target.value)} />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-2xl border border-brand-blush bg-white p-2 shadow-card">
              {suggestions.map((item) => <Link className="block rounded-xl p-3 text-body-sm font-medium text-ink hover:bg-brand-blush/50" key={item._id} to={`/products/${item.slug}`}>{item.code} — {item.name}</Link>)}
            </div>
          )}
        </label>
        <select value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>{categories.map((category) => <option key={category} value={category}>{category || 'All categories'}</option>)}</select>
        <select value={filters.ageCategory} onChange={(e) => setFilter('ageCategory', e.target.value)}>{ageCategories.map((category) => <option key={category} value={category}>{category || 'All ages'}</option>)}</select>
        <select value={filters.color} onChange={(e) => setFilter('color', e.target.value)}>
          <option value="">All colors</option>
          <option value="pink">Pink</option>
          <option value="white">White</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="purple">Purple</option>
          <option value="black">Black</option>
          <option value="multi">Multi-color</option>
        </select>
        <select value={filters.size} onChange={(e) => setFilter('size', e.target.value)}>
          <option value="">All sizes</option>
          <option value="0-3m">0-3 months</option>
          <option value="3-6m">3-6 months</option>
          <option value="6-9m">6-9 months</option>
          <option value="9-12m">9-12 months</option>
          <option value="12-18m">12-18 months</option>
          <option value="18-24m">18-24 months</option>
          <option value="2y">2 years</option>
          <option value="3y">3 years</option>
          <option value="4y">4 years</option>
          <option value="5y">5 years</option>
          <option value="6y">6 years</option>
          <option value="7y">7 years</option>
          <option value="8y">8 years</option>
          <option value="10y">10 years</option>
          <option value="12y">12 years</option>
          <option value="14y">14 years</option>
        </select>
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
          <option value="discount_desc">Highest Discount</option>
          <option value="rating_desc">Highest Rated</option>
        </select>
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {Array.from({ length: data.pages || 1 }, (_, index) => (
          <button key={index + 1} className={Number(filters.page) === index + 1 ? 'btn-primary' : 'btn-secondary'} onClick={() => setFilter('page', String(index + 1))}>{index + 1}</button>
        ))}
      </div>
    </section>
  );
}
