import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import { mediaUrl } from '../utils/media';

export default function Cart() {
  const { items, subtotal, shippingEstimate, updateQty, removeItem } = useCart();
  const [coupon, setCoupon] = useState('');

  return (
    <section className="page-shell max-w-6xl">
      <SEO title="Cart | Chandira Kids" />
      <div className="page-hero">
        <p className="badge-tag">Bag</p>
        <h1 className="mt-2 text-3xl font-black text-[#171717]">Cart</h1>
        <p className="mt-2 muted-text">Review your selected pieces before checkout</p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.key} className="panel grid gap-4 md:grid-cols-[96px_1fr_auto_auto] md:items-center">
              <img className="h-24 w-24 rounded-2xl object-cover" src={mediaUrl(item.image)} alt={item.name} />
              <div>
                <Link className="font-bold text-[#171717] hover:text-[#b38a50]" to={`/products/${item.slug}`}>{item.name}</Link>
                <p className="text-sm text-[#6a5f50]">{item.size} / {item.color} / {item.sku}</p>
                <p className="mt-1 text-sm text-[#5c5144]">{item.wholesale ? 'Wholesale' : 'Retail'} • LKR {item.price.toLocaleString()}</p>
              </div>
              <input className="w-24" type="number" min="1" value={item.quantity} onChange={(e) => updateQty(item.key, e.target.value)} />
              <button className="btn-secondary px-3" onClick={() => removeItem(item.key)} aria-label="Remove item"><FiTrash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
        <aside className="panel h-fit space-y-3">
          <h2 className="text-xl font-black text-[#171717]">Order summary</h2>
          <input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
          <button className="btn-secondary w-full" onClick={() => toast.success(coupon ? 'Coupon will be applied at checkout' : 'Enter a coupon code')}>Apply coupon</button>
          <div className="flex justify-between text-sm"><span className="text-[#5c5144]">Subtotal</span><strong className="text-[#171717]">LKR {subtotal.toLocaleString()}</strong></div>
          <div className="flex justify-between text-sm"><span className="text-[#5c5144]">Shipping estimate</span><strong className="text-[#171717]">{shippingEstimate ? `LKR ${shippingEstimate.toLocaleString()}` : 'Free'}</strong></div>
          <div className="flex justify-between border-t border-[#ece3cf] pt-3 text-base font-bold text-[#171717]"><span>Total</span><strong>LKR {(subtotal + shippingEstimate).toLocaleString()}</strong></div>
          <Link className="btn-primary w-full" to="/checkout">Checkout</Link>
        </aside>
      </div>
    </section>
  );
}
