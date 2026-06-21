import { FiArrowRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import 'swiper/css';
import 'swiper/css/pagination';

const categories = ['Baby Frocks', 'Party Dresses', 'Casual Dresses', 'Clothing Sets', 'Tops', 'Skirts', 'T-shirts', 'Leggings', 'Hairbands', 'Accessories', 'Seasonal Collections'];
const ageCategories = ['Infants (0-12 months)', 'Toddlers (1-3 years)', 'Little Girls (4-7 years)', 'Kids (8-12 years)', 'Teen Girls (13-15 years)'];
const heroSlides = [
  {
    image: '/images/products/bunny-gingham-set-collection.png',
    alt: 'Bunny Gingham Dress Set collection',
    label: 'New arrival'
  },
  {
    image: '/images/products/floral-bow-dress-collection.png',
    alt: 'Elegant Floral Bow Dress Set collection',
    label: 'Boutique favourite'
  },
  {
    image: '/images/products/floral-bow-dress-pastel.png',
    alt: 'Soft pastel floral dress',
    label: 'Retail and wholesale'
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/featured/list').then(({ data }) => setProducts(data));
  }, []);

  return (
    <>
      <SEO title="Chandira Kids | Girls Clothing 0-15" description="Shop girls dresses, baby clothing, party wear, accessories, and wholesale collections." />
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-sm font-bold text-mulberry"><HiSparkles className="h-4 w-4" /> Retail and wholesale girls clothing</span>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">Chandira Kids</h1>
            <p className="max-w-xl text-lg text-stone-600">Beautifully made clothing for girls ages 0 to 15, from soft newborn essentials to occasion dresses and boutique wholesale packs.</p>
            <Link className="btn-primary" to="/shop">Shop collection <FiArrowRight className="h-4 w-4" /></Link>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="h-[520px] w-full rounded-lg"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.image}>
                <div className="relative h-full">
                  <img className="h-full w-full object-cover" src={slide.image} alt={slide.alt} />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-mulberry shadow">
                    {slide.label}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-black">Shop by category</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`} className="rounded-lg border border-stone-200 bg-white p-5 font-bold transition hover:border-petal hover:text-mulberry">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-black">Shop by age</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ageCategories.map((category) => (
            <Link key={category} to={`/shop?ageCategory=${encodeURIComponent(category)}`} className="rounded-lg border border-accent bg-white p-5 text-sm font-bold transition hover:border-primary hover:text-primary">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black">Featured products</h2>
          <Link className="font-bold text-mulberry" to="/shop">View all</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>
    </>
  );
}
