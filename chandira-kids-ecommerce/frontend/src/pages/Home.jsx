import { FiTruck, FiShield, FiHeart } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Quick Categories
const categories = [
  { id: 'dresses', name: 'Dresses', icon: '👗', count: 24, link: '/shop?category=dresses' },
  { id: 'tops', name: 'Tops', icon: '👚', count: 36, link: '/shop?category=tops' },
  { id: 'bottoms', name: 'Bottoms', icon: '👖', count: 28, link: '/shop?category=bottoms' },
  { id: 'sets', name: 'Sets', icon: '✨', count: 18, link: '/shop?category=sets' },
  { id: 'accessories', name: 'Accessories', icon: '🎀', count: 42, link: '/shop?category=accessories' },
  { id: 'sleepwear', name: 'Sleepwear', icon: '🌙', count: 15, link: '/shop?category=sleepwear' }
];

// Mood Shopping Zones - Emotional Shopping Entry Points
const moodZones = [
  {
    id: 'morning',
    title: 'Morning Fresh',
    emoji: '🌤️',
    description: 'Soft beginnings for gentle mornings',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.02.jpeg',
    link: '/shop?mood=morning',
    color: '#F283AF'
  },
  {
    id: 'school',
    title: 'School Ready',
    emoji: '🎒',
    description: 'Confidence for every classroom moment',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.03.jpeg',
    link: '/shop?mood=school',
    color: '#C43670'
  },
  {
    id: 'birthday',
    title: 'Birthday Sparkle',
    emoji: '🎂',
    description: 'Magical moments worth celebrating',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.04.jpeg',
    link: '/shop?mood=birthday',
    color: '#F3CC97'
  },
  {
    id: 'holiday',
    title: 'Holiday Dream',
    emoji: '✈️',
    description: 'Adventure-ready for every journey',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.05.jpeg',
    link: '/shop?mood=holiday',
    color: '#F283AF'
  },
  {
    id: 'everyday',
    title: 'Everyday Soft',
    emoji: '💕',
    description: 'Comfort that feels like a hug',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.06.jpeg',
    link: '/shop?mood=everyday',
    color: '#C43670'
  }
];

// Editorial Feature Collection
const editorialFeatures = [
  {
    id: 1,
    title: 'The Soft Movement Dress',
    subtitle: 'Designed for gentle motion',
    story: 'Every twirl tells a story. This dress flows with her movement, designed for playground adventures and special moments alike.',
    fabric: '100% Organic Cotton Blend',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.07.jpeg',
    link: '/shop?feature=soft-movement',
    wholesalePrice: 12600,
    retailPrice: 25500
  },
  {
    id: 2,
    title: 'School Day Confidence Set',
    subtitle: 'Comfort meets confidence',
    story: 'Because confidence starts with comfort. This set is designed for long school days, active play, and feeling amazing.',
    fabric: 'Breathable Cotton Jersey',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.08.jpeg',
    link: '/shop?feature=school-confidence',
    wholesalePrice: 11400,
    retailPrice: 22500
  },
  {
    id: 3,
    title: 'Weekend Freedom Collection',
    subtitle: 'Playful weekends, perfect style',
    story: 'Weekends are for exploring. This collection moves with her, from morning adventures to evening family time.',
    fabric: 'Soft Stretch Fabric',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.09.jpeg',
    link: '/shop?feature=weekend-freedom',
    wholesalePrice: 14400,
    retailPrice: 28500
  }
];

// Trending Now - Immersive Carousel
const trendingItems = [
  {
    id: 1,
    title: 'Sunset Gradient Dress',
    mood: 'Evening Elegance',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.10.jpeg',
    link: '/shop?trending=sunset-dress',
    wholesalePrice: 13500,
    retailPrice: 26700
  },
  {
    id: 2,
    title: 'Blush Cloud Cardigan',
    mood: 'Cozy Comfort',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.11.jpeg',
    link: '/shop?trending=blush-cardigan',
    wholesalePrice: 10500,
    retailPrice: 20700
  },
  {
    id: 3,
    title: 'Raspberry Party Gown',
    mood: 'Celebration Ready',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.12.jpeg',
    link: '/shop?trending=raspberry-gown',
    wholesalePrice: 16500,
    retailPrice: 32700
  },
  {
    id: 4,
    title: 'Cream Dream Skirt',
    mood: 'Everyday Magic',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.13.jpeg',
    link: '/shop?trending=cream-skirt',
    wholesalePrice: 9000,
    retailPrice: 17700
  },
  {
    id: 5,
    title: 'Pink Blossom Top',
    mood: 'Fresh & Playful',
    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.14.jpeg',
    link: '/shop?trending=pink-blossom',
    wholesalePrice: 8400,
    retailPrice: 16500
  }
];

// Features/Benefits
const features = [
  { icon: FiTruck, title: 'Free Shipping', description: 'On orders over LKR 15,000' },
  { icon: FiShield, title: 'Quality Guarantee', description: '100% satisfaction' },
  { icon: FiHeart, title: 'Made with Love', description: 'Premium materials' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="page-shell">
      <SEO title="Chandira Kids | Every Outfit Tells Her Story" description="Luxury girls fashion designed for every growing moment. Soft, playful, made with love." />

      {/* ========== HERO SECTION ========== */}
      <section className="page-hero mb-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="section-label">Welcome</p>
          <h1 className="section-title mt-2">Chandira Kids</h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-ink/65">
            Beautiful clothing for beautiful moments
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-6">
            <div className="flex gap-2">
              <input
                className="flex-1"
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-primary">
                Search
              </button>
            </div>
          </form>

          <Link className="btn-primary mt-6" to="/shop">
            Shop All Products
          </Link>
        </div>
      </section>

      {/* ========== FEATURES BAR ========== */}
      <section className="py-10 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index}>
                <feature.icon className="mx-auto mb-2 h-8 w-8 text-brand-raspberry" />
                <p className="mb-1 font-semibold text-ink">{feature.title}</p>
                <p className="text-sm text-ink/65">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== QUICK CATEGORIES ========== */}
      <section className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="section-label">Categories</p>
            <h2 className="section-title mt-2">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Link key={category.id} to={category.link}>
                <div className="soft-card text-center p-4 hover:shadow-md transition-shadow">
                  <div className="mb-2 text-3xl">{category.icon}</div>
                  <h3 className="text-sm font-semibold text-brand-raspberry">{category.name}</h3>
                  <p className="mt-1 text-xs text-ink/65">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TRENDING NOW ========== */}
      <section className="py-16 px-6 bg-brand-champagne">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="section-label">Trending</p>
            <h2 className="section-title mt-2">Trending Products</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {trendingItems.map((item) => (
              <Link key={item.id} to={item.link}>
                <div className="soft-card overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    className="aspect-[3/4] w-full object-cover"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="p-3">
                    <h3 className="mb-1 text-sm font-semibold text-ink">{item.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-brand-raspberry">LKR {item.retailPrice.toLocaleString()}</span>
                      <span className="text-xs line-through text-ink/50">LKR {item.wholesalePrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link className="btn-primary" to="/shop">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MOOD SHOPPING ZONES ========== */}
      <section className="py-16 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="section-label">Occasions</p>
            <h2 className="section-title mt-2">Shop by Occasion</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {moodZones.map((zone) => (
              <Link key={zone.id} to={zone.link}>
                <div className="soft-card overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    className="aspect-square w-full object-cover"
                    src={zone.image}
                    alt={zone.title}
                  />
                  <div className="p-3 text-center">
                    <div className="mb-1 text-2xl">{zone.emoji}</div>
                    <h3 className="text-sm font-semibold text-brand-raspberry">{zone.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== EDITORIAL FEATURE COLLECTION ========== */}
      <section className="py-16 px-6 bg-brand-champagne">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <p className="section-label">Featured</p>
            <h2 className="section-title mt-2">Featured Collection</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {editorialFeatures.map((feature) => (
              <Link key={feature.id} to={feature.link}>
                <div className="soft-card overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    className="aspect-[4/5] w-full object-cover"
                    src={feature.image}
                    alt={feature.title}
                  />
                  <div className="p-4">
                    <span className="badge-tag mb-2 inline-block">
                      {feature.fabric}
                    </span>
                    <h3 className="mb-1 font-semibold text-ink">{feature.title}</h3>
                    <p className="mb-2 text-sm text-ink/65">{feature.subtitle}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-brand-raspberry">LKR {feature.retailPrice.toLocaleString()}</span>
                      <span className="text-sm line-through text-ink/50">LKR {feature.wholesalePrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </section>
  );
}
