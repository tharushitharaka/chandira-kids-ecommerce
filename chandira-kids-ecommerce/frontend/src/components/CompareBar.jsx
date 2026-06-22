import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { useCompare } from '../context/CompareContext';
import { mediaUrl } from '../utils/media';

export default function CompareBar() {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (!items.length) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-brand-blush bg-white/95 px-4 py-3 shadow-card backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-body-sm font-bold text-ink dark:text-white">Compare ({items.length}/4)</span>
          {items.map((product) => (
            <div key={product._id} className="flex items-center gap-2 rounded-xl bg-brand-blush/40 px-2 py-1 dark:bg-gray-800">
              <img className="h-8 w-8 rounded-lg object-cover" src={mediaUrl(product.images?.[0]?.url)} alt="" />
              <span className="text-xs font-semibold text-ink dark:text-white">{product.name}</span>
              <button onClick={() => removeFromCompare(product._id)} aria-label="Remove">
                <FiX className="h-4 w-4 text-muted" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary py-2 text-body-sm" onClick={clearCompare}>Clear</button>
          <Link className="btn-primary py-2 text-body-sm" to="/compare">Compare now</Link>
        </div>
      </div>
    </div>
  );
}
