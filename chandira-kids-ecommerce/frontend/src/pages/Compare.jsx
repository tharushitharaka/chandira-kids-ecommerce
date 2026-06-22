import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import SEO from '../components/SEO';
import { useCompare } from '../context/CompareContext';
import { mediaUrl } from '../utils/media';

export default function Compare() {
  const { items, removeFromCompare } = useCompare();

  return (
    <section className="page-shell">
      <SEO title="Compare Products | Chandira Kids" />
      <div className="page-hero mb-8">
        <p className="badge-tag">Compare</p>
        <h1 className="section-title mt-2">Product comparison</h1>
        <p className="mt-2 text-body text-muted">Compare up to 4 products side by side.</p>
      </div>

      {!items.length ? (
        <div className="surface-card text-center">
          <p className="text-muted">No products to compare yet.</p>
          <Link className="btn-primary mt-4 inline-flex" to="/shop">Browse shop</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-body-sm">
            <thead>
              <tr>
                <th className="p-3 font-bold text-muted">Product</th>
                {items.map((p) => (
                  <th key={p._id} className="p-3">
                    <div className="flex flex-col items-center gap-2">
                      <img className="h-24 w-24 rounded-xl object-cover" src={mediaUrl(p.images?.[0]?.url)} alt="" />
                      <button onClick={() => removeFromCompare(p._id)} aria-label="Remove"><FiTrash2 className="text-muted" /></button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-brand-blush dark:border-gray-700">
                <td className="p-3 font-bold">Name</td>
                {items.map((p) => <td key={p._id} className="p-3"><Link className="font-semibold text-brand-rose hover:underline" to={`/products/${p.slug}`}>{p.name}</Link></td>)}
              </tr>
              <tr className="border-t border-brand-blush dark:border-gray-700">
                <td className="p-3 font-bold">Retail price</td>
                {items.map((p) => <td key={p._id} className="p-3">LKR {p.price?.toLocaleString()}</td>)}
              </tr>
              <tr className="border-t border-brand-blush dark:border-gray-700">
                <td className="p-3 font-bold">Wholesale</td>
                {items.map((p) => <td key={p._id} className="p-3">LKR {p.wholesalePrice?.toLocaleString()}</td>)}
              </tr>
              <tr className="border-t border-brand-blush dark:border-gray-700">
                <td className="p-3 font-bold">Age</td>
                {items.map((p) => <td key={p._id} className="p-3">{p.ageRange}</td>)}
              </tr>
              <tr className="border-t border-brand-blush dark:border-gray-700">
                <td className="p-3 font-bold">Category</td>
                {items.map((p) => <td key={p._id} className="p-3">{p.category}</td>)}
              </tr>
              <tr className="border-t border-brand-blush dark:border-gray-700">
                <td className="p-3 font-bold">Rating</td>
                {items.map((p) => <td key={p._id} className="p-3">{p.averageRating?.toFixed(1) || '—'}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
