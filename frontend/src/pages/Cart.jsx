import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import { mediaUrl } from '../utils/media';

export default function Cart() {
  const { items, subtotal, updateQty, removeItem } = useCart();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <SEO title="Cart | Chandira Kids" />
      <h1 className="mb-6 text-3xl font-black">Cart</h1>
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.key} className="panel grid gap-4 md:grid-cols-[96px_1fr_auto_auto] md:items-center">
            <img className="h-24 w-24 rounded-md object-cover" src={mediaUrl(item.image)} alt={item.name} />
            <div>
              <Link className="font-bold" to={`/products/${item.slug}`}>{item.name}</Link>
              <p className="text-sm text-stone-500">{item.size} / {item.color} / {item.sku}</p>
              <p className="text-sm">{item.wholesale ? 'Wholesale' : 'Retail'} LKR {item.price.toLocaleString()}</p>
            </div>
            <input className="w-24" type="number" min="1" value={item.quantity} onChange={(e) => updateQty(item.key, e.target.value)} />
            <button className="btn-secondary px-3" onClick={() => removeItem(item.key)} aria-label="Remove item"><FiTrash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      <div className="mt-6 panel ml-auto max-w-sm space-y-3">
        <div className="flex justify-between"><span>Subtotal</span><strong>LKR {subtotal.toLocaleString()}</strong></div>
        <Link className="btn-primary w-full" to="/checkout">Checkout</Link>
      </div>
    </section>
  );
}
