import { getProductLabels } from '../utils/productLabels';

export default function ProductLabels({ product, className = '' }) {
  const labels = getProductLabels(product);
  if (!labels.length) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {labels.map((label) => (
        <span key={label.key} className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${label.className}`}>
          {label.text}
        </span>
      ))}
    </div>
  );
}
