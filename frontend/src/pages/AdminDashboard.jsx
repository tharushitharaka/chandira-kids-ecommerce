import { FiBox, FiShoppingCart, FiUsers } from 'react-icons/fi';
import { MdWarehouse } from 'react-icons/md';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import SEO from '../components/SEO';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [overview, setOverview] = useState({ reviews: [], promotions: [], contacts: [], coupons: [], categories: [] });
  const [imageFile, setImageFile] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
      ageRange: 'Sizes S, M, L',
    price: '',
    wholesalePrice: '',
    wholesaleMinQty: 6,
    description: '',
    colors: 'Soft Pink',
    sizes: 'S,M,L',
    stock: 10,
    featured: true
  });

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/orders/admin/all'),
      api.get('/users/admin/all'),
      api.get('/products/admin/all'),
      api.get('/wholesale/admin/all'),
      api.get('/admin/overview')
    ]).then(([statsRes, ordersRes, usersRes, productsRes, appsRes, overviewRes]) => {
      setStats(statsRes.data);
      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
      setApplications(appsRes.data);
      setOverview(overviewRes.data);
    });
  }, []);

  const updateOrder = async (id, status) => {
    const { data } = await api.put(`/orders/${id}/status`, { status });
    setOrders((current) => current.map((order) => (order._id === id ? data : order)));
  };

  const createProduct = async (event) => {
    event.preventDefault();
    let imageUrl = '';

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);
      const { data } = await api.post('/uploads/product-image', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      imageUrl = data.url;
    }

    const colors = productForm.colors.split(',').map((item) => item.trim()).filter(Boolean);
    const sizes = productForm.sizes.split(',').map((item) => item.trim()).filter(Boolean);
    const variants = colors.flatMap((color) =>
      sizes.map((size) => ({
        color,
        size,
        sku: `CK-${Date.now()}-${color.replace(/\s+/g, '').toUpperCase()}-${size}`,
        stock: Number(productForm.stock)
      }))
    );

    const { data } = await api.post('/products', {
      ...productForm,
      price: Number(productForm.price || 0),
      wholesalePrice: Number(productForm.wholesalePrice || 0),
      wholesaleMinQty: Number(productForm.wholesaleMinQty),
      images: imageUrl ? [{ url: imageUrl, alt: productForm.name }] : [],
      variants,
      tags: [productForm.category.toLowerCase(), 'girls clothing'],
      seoTitle: `${productForm.name} | Chandira Kids`,
      seoDescription: productForm.description
    });

    setProducts((current) => [data, ...current]);
    setImageFile(null);
    setProductForm((current) => ({ ...current, name: '', price: '', wholesalePrice: '', description: '' }));
    toast.success('Product created');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SEO title="Admin Dashboard | Chandira Kids" />
      <h1 className="mb-6 text-3xl font-black">Admin dashboard</h1>
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Metric icon={<FiShoppingCart />} label="Orders" value={stats?.orders || 0} />
        <Metric icon={<FiBox />} label="Products" value={stats?.products || 0} />
        <Metric icon={<FiUsers />} label="Users" value={stats?.users || 0} />
        <Metric icon={<MdWarehouse />} label="Revenue" value={`LKR ${(stats?.revenue || 0).toLocaleString()}`} />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="panel">
          <h2 className="font-black">Low stock alerts</h2>
          {(stats?.lowStock || []).map((product) => <p className="mt-2 text-sm" key={product._id}>{product.name} needs restock</p>)}
          {!stats?.lowStock?.length && <p className="text-sm text-stone-500">No low stock alerts.</p>}
        </div>
        <div className="panel">
          <h2 className="font-black">Out of stock alerts</h2>
          {(stats?.outOfStock || []).map((product) => <p className="mt-2 text-sm" key={product._id}>{product.name} is out of stock</p>)}
          {!stats?.outOfStock?.length && <p className="text-sm text-stone-500">No out of stock alerts.</p>}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <form className="panel grid gap-3 xl:col-span-2" onSubmit={createProduct}>
          <h2 className="font-black">Add product</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <input placeholder="Product name" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
            <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
              <option>Baby Frocks</option><option>Party Dresses</option><option>Casual Dresses</option><option>Clothing Sets</option><option>Tops</option><option>Skirts</option><option>T-shirts</option><option>Leggings</option><option>Hairbands</option><option>Accessories</option><option>Seasonal Collections</option>
            </select>
            <select value={productForm.ageCategory} onChange={(e) => setProductForm({ ...productForm, ageCategory: e.target.value })}>
              <option>Infants (0-12 months)</option><option>Toddlers (1-3 years)</option><option>Little Girls (4-7 years)</option><option>Kids (8-12 years)</option><option>Teen Girls (13-15 years)</option>
            </select>
            <input placeholder="Age range / sizes" value={productForm.ageRange} onChange={(e) => setProductForm({ ...productForm, ageRange: e.target.value })} required />
          </div>
          <textarea placeholder="Description" value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} required />
          <div className="grid gap-3 md:grid-cols-4">
            <input type="number" placeholder="Retail price" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
            <input type="number" placeholder="Wholesale price" value={productForm.wholesalePrice} onChange={(e) => setProductForm({ ...productForm, wholesalePrice: e.target.value })} />
            <input placeholder="Colors comma separated" value={productForm.colors} onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })} />
            <input placeholder="Sizes comma separated" value={productForm.sizes} onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })} />
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_160px_160px]">
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            <input type="number" placeholder="Stock" value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} />
            <button className="btn-primary">Create product</button>
          </div>
        </form>

        <div className="panel overflow-x-auto">
          <h2 className="mb-3 font-black">Orders</h2>
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b"><th>Order</th><th>Total</th><th>Status</th><th>Update</th></tr></thead>
            <tbody>{orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2">{order.orderNumber}</td>
                <td>LKR {order.total.toLocaleString()}</td>
                <td>{order.status}</td>
                <td><select value={order.status} onChange={(e) => updateOrder(order._id, e.target.value)}><option>pending</option><option>confirmed</option><option>processing</option><option>shipped</option><option>delivered</option><option>cancelled</option></select></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="panel overflow-x-auto">
          <h2 className="mb-3 font-black">Inventory</h2>
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b"><th>Product</th><th>Category</th><th>Stock</th><th>Price</th></tr></thead>
            <tbody>{products.map((product) => (
              <tr key={product._id} className="border-b"><td className="py-2">{product.name}</td><td>{product.category}</td><td>{product.variants.reduce((sum, v) => sum + v.stock, 0)}</td><td>LKR {product.price.toLocaleString()}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <div className="panel overflow-x-auto">
          <h2 className="mb-3 font-black">Users</h2>
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b"><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>{users.map((user) => <tr key={user._id} className="border-b"><td className="py-2">{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="panel overflow-x-auto">
          <h2 className="mb-3 font-black">Wholesale applications</h2>
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b"><th>Business</th><th>Email</th><th>Status</th></tr></thead>
            <tbody>{applications.map((app) => <tr key={app._id} className="border-b"><td className="py-2">{app.businessName}</td><td>{app.email}</td><td>{app.status}</td></tr>)}</tbody>
          </table>
        </div>
        {[
          ['Categories', overview.categories, (item) => item.name],
          ['Reviews', overview.reviews, (item) => `${item.rating} stars - ${item.title}`],
          ['Promotions', overview.promotions, (item) => `${item.type}: ${item.title}`],
          ['Contact Messages', overview.contacts, (item) => `${item.subject} - ${item.status}`],
          ['Coupons', overview.coupons, (item) => `${item.code} - ${item.type}`]
        ].map(([title, list, render]) => (
          <div className="panel" key={title}>
            <h2 className="mb-3 font-black">Manage {title}</h2>
            <div className="space-y-2 text-sm">
              {list?.slice(0, 8).map((item) => <p className="rounded-md bg-white p-2" key={item._id}>{render(item)}</p>)}
              {!list?.length && <p className="text-stone-500">No records yet.</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="panel">
      <div className="mb-2 text-mulberry">{icon}</div>
      <p className="text-sm text-stone-500">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
}
