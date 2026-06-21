import { FiArrowRight, FiCheckCircle, FiMail, FiShield, FiSmile, FiStar, FiTruck } from 'react-icons/fi';
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

const categories = [
  'Baby Frocks',
  'Party Dresses',
  'Casual Dresses',
  'Clothing Sets',
  'Tops',
  'Skirts',
  'Hairbands',
  'Accessories'
];

const testimonials = [
  {
    quote: 'Beautiful quality and fast delivery. My daughter loved the dress.',
    name: 'Nethmi'
  },
  {
    quote: 'Wholesale ordering is easy and the sizing is consistent.',
    name: 'Ayesha Boutique'
  },
  {
    quote: 'The photos match the real product. Lovely finishing.',
    name: 'Dinuki'
  }
];

const benefits = [
  { icon: FiShield, title: 'Secure checkout', text: 'Safe payment options for every order.' },
  { icon: FiTruck, title: 'Island-wide delivery', text: 'Fast shipping to your doorstep.' },
  { icon: FiSmile, title: 'Happy customers', text: 'Loved by parents across the island.' },
  { icon: FiStar, title: 'Premium quality', text: 'Carefully selected fabrics and finishes.' }
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

      <section className="relative overflow-hidden bg-[#f8efe1]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,165,109,0.14),transparent_12%),radial-gradient(circle_at_bottom_right,rgba(31,31,31,0.06),transparent_18%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-6 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="brand-pill">
              <HiSparkles /> Luxury kidswear collection
            </span>
            <h1 className="mt-5 max-w-2xl text-5xl font-black leading-tight tracking-tight text-[#171717] md:text-6xl">Beautiful pieces for every little moment</h1>
            <p className="mt-4 max-w-2xl text-lg text-[#5c5144]">From newborn essentials to standout party looks, discover timeless styles designed with comfort and charm in mind.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/shop">Shop collection <FiArrowRight /></Link>
              <Link className="btn-secondary" to="/wholesale">Wholesale options</Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ['500+', 'Styles'],
                ['5K+', 'Happy families'],
                ['100+', 'Partners']
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-stone-200">
                  <div className="text-2xl font-black text-[#171717]">{value}</div>
                  <div className="text-sm text-[#6a5f50]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-5 top-10 hidden h-24 w-24 rounded-full bg-[#f2e3c7] blur-2xl lg:block" />
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3200 }}
              pagination={{ clickable: true }}
              loop
              className="h-[520px] w-full overflow-hidden rounded-[32px] shadow-2xl"
            >
              {heroSlides.map(([image, label]) => (
                <SwiperSlide key={image}>
                  <div className="relative h-full overflow-hidden rounded-[32px]">
                    <img className="h-full w-full object-cover transition duration-700 hover:scale-105" src={image} alt={label} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-black/0" />
                    <span className="absolute left-5 top-5 rounded-full bg-white/85 px-3.5 py-1.5 text-sm font-semibold text-stone-900 shadow backdrop-blur">{label}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38a50]">Shop by</p>
          <h2 className="section-title mt-1">Featured Categories</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              className="rounded-full border border-[#ece3cf] bg-white px-4 py-2.5 text-sm font-semibold text-[#5c5144] shadow-sm transition hover:border-[#c9a56d] hover:text-[#b38a50]"
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="soft-card">
              <Icon className="h-6 w-6 text-[#b38a50]" />
              <h3 className="mt-3 font-bold text-[#171717]">{title}</h3>
              <p className="mt-1 text-sm text-[#6a5f50]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b38a50]">Latest picks</p>
            <h2 className="section-title mt-1">New Arrivals</h2>
          </div>
          <Link className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200" to="/shop">
            View all <FiArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.slice(0, 4).map((product) => <ProductCard key={product._id} product={product} />)}</div>
      </section>

      <section className="bg-[#f5e9d2] py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b38a50]">Special Offers</p>
            <h2 className="section-title mt-2">Retail deals and wholesale bundles</h2>
            <p className="mt-3 max-w-xl text-[#5c5144]">Enjoy seasonal savings, curated bundles, and exclusive offers made for growing wardrobes.</p>
            <Link className="btn-primary mt-5" to="/special-offers">Explore offers</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Quality checked', FiCheckCircle],
              ['Island-wide delivery', FiTruck],
              ['Style updates', FiMail]
            ].map(([text, Icon]) => (
              <div className="soft-card text-center" key={text}>
                <Icon className="mx-auto mb-3 h-8 w-8 text-[#b38a50]" />
                <strong className="text-[#171717]">{text}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b38a50]">Why parents love us</p>
            <h2 className="section-title mt-2">A boutique experience for growing wardrobes</h2>
            <p className="mt-4 text-[#5c5144]">Every piece is selected for comfort, quality, and timeless style so your child can move freely from playtime to celebrations.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {['Premium fabrics', 'Soft, comfortable fits', 'Easy wholesale ordering', 'Island-wide delivery'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#fffaf1] text-[#b38a50]">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] bg-[#1f1f1f] p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Reviews</p>
            <h2 className="section-title mt-2 text-white">What parents say</h2>
            <div className="mt-5 space-y-4">
              {testimonials.map(({ quote, name }) => (
                <div key={name} className="rounded-2xl bg-white/5 p-4">
                  <div className="flex gap-1 text-[#f2b84b]">
                    {Array.from({ length: 5 }).map((_, index) => <FiStar key={`${name}-${index}`} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-2 text-sm text-white/90">“{quote}”</p>
                  <strong className="mt-3 block text-sm text-white">{name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 pt-2 lg:grid-cols-[1fr_1fr] lg:px-6">
        <form className="rounded-[32px] bg-[#1f1f1f] p-8 text-white shadow-xl" onSubmit={subscribe}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Newsletter</p>
          <h2 className="section-title mt-2 text-white">Stay in the loop</h2>
          <p className="mt-2 text-white/80">Get first access to new arrivals, seasonal edits, and wholesale updates.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input className="flex-1 border-white/15 bg-white/95 text-stone-900 placeholder:text-stone-400" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button className="btn-primary bg-[#c9a56d] text-[#171717] hover:bg-[#b38a50]">Subscribe</button>
          </div>
        </form>
        <div className="rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-stone-200">
          <h2 className="section-title mb-4">Style gallery</h2>
          <div className="grid grid-cols-4 gap-3">
            {heroSlides.concat(heroSlides).slice(0, 8).map(([image], index) => (
              <img className="aspect-square rounded-2xl object-cover" key={`${image}-${index}`} src={image} alt="Chandira Kids style gallery" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
