import { FiArrowRight, FiMail, FiShield, FiTruck } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import toast from 'react-hot-toast';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import 'swiper/css';
import 'swiper/css/pagination';

const heroSlides = [
  ['/images/products/bunny-gingham-set-collection.png', 'New season gingham sets'],
  ['/images/products/floral-bow-dress-collection.png', 'Party-ready floral dresses'],
  ['/images/products/floral-bow-dress-pastel.png', 'Soft pastel boutique styles']
];

const categories = ['Baby Frocks', 'Party Dresses', 'Casual Dresses', 'Clothing Sets', 'Tops', 'Skirts', 'Hairbands', 'Accessories'];
const testimonials = [
  ['Beautiful quality and fast delivery. My daughter loved the dress.', 'Nethmi'],
  ['Wholesale ordering is easy and the sizing is consistent.', 'Ayesha Boutique'],
  ['The photos match the real product. Lovely finishing.', 'Dinuki']
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    api.get('/products/featured/list').then(({ data }) => setProducts(data));
  }, []);

  const bestSellers = useMemo(() => products.slice(0, 4), [products]);
  const trending = useMemo(() => products.slice().reverse().slice(0, 4), [products]);

  const subscribe = async (event) => {
    event.preventDefault();
    await api.post('/public/newsletter', { email });
    setEmail('');
    toast.success('Subscribed to Chandira Kids updates');
  };

  return (
    <>
      <SEO title="Chandira Kids | Girls Fashion Newborn to 15" description="Beautiful baby girls and girls fashion from newborns to 15 years. Retail and wholesale clothing with modern boutique styling." />
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-sm font-bold text-teal"><HiSparkles /> Retail and wholesale girls fashion</span>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">Chandira Kids</h1>
            <p className="max-w-xl text-lg text-stone-600">Beautiful baby girls and girls fashion from newborns to 15 years.</p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn-primary" to="/shop">Shop Retail <FiArrowRight /></Link>
              <Link className="btn-secondary" to="/wholesale">Shop Wholesale</Link>
            </div>
          </div>
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3200 }} pagination={{ clickable: true }} loop className="h-[340px] w-full rounded-lg md:h-[520px]">
            {heroSlides.map(([image, label]) => (
              <SwiperSlide key={image}>
                <div className="relative h-full overflow-hidden rounded-lg">
                  <img className="h-full w-full object-cover transition duration-700 hover:scale-105" src={image} alt={label} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-mulberry shadow backdrop-blur">{label}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="section-title mb-6">Featured Categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => <Link className="soft-card font-bold" key={category} to={`/shop?category=${encodeURIComponent(category)}`}>{category}</Link>)}
        </div>
      </section>

      {[
        ['New Arrivals', products],
        ['Best Sellers', bestSellers],
        ['Trending Products', trending]
      ].map(([title, list]) => (
        <section key={title} className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="section-title">{title}</h2>
            <Link className="font-bold text-mulberry" to="/shop">View all</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{list.map((product) => <ProductCard key={`${title}-${product._id}`} product={product} />)}</div>
        </section>
      ))}

      <section className="bg-cloud py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <p className="font-bold text-gold">Special Offers</p>
            <h2 className="section-title mt-2">Retail deals and wholesale bundles</h2>
            <p className="mt-3 text-stone-600">Use coupons, flash sales, and featured banners managed from the admin panel.</p>
            <Link className="btn-primary mt-5" to="/special-offers">See offers</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[['Quality checked', FiShield], ['Island-wide delivery', FiTruck], ['Style updates', FiMail]].map(([text, Icon]) => (
              <div className="soft-card text-center" key={text}><Icon className="mx-auto mb-3 h-8 w-8 text-teal" /><strong>{text}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="section-title mb-6">Customer Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-3">{testimonials.map(([quote, name]) => <div className="soft-card" key={name}><p className="text-stone-600">"{quote}"</p><strong className="mt-4 block">{name}</strong></div>)}</div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 lg:grid-cols-2">
        <form className="rounded-lg bg-teal p-8 text-white" onSubmit={subscribe}>
          <h2 className="section-title">Newsletter Subscription</h2>
          <p className="mt-2 text-white/80">Get new arrivals, wholesale notices, and special offers.</p>
          <div className="mt-5 flex gap-3"><input className="flex-1 text-ink" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required /><button className="btn-primary bg-gold hover:bg-ink">Subscribe</button></div>
        </form>
        <div>
          <h2 className="section-title mb-4">Instagram Gallery</h2>
          <div className="grid grid-cols-4 gap-3">{heroSlides.concat(heroSlides).slice(0, 8).map(([image], index) => <img className="aspect-square rounded-lg object-cover" key={`${image}-${index}`} src={image} alt="Chandira Kids style gallery" />)}</div>
        </div>
      </section>
    </>
  );
}
