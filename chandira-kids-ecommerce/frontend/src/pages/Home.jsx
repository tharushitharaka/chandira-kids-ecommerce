import { FiTruck, FiShield, FiHeart, FiSearch, FiStar, FiArrowRight, FiGift, FiPackage } from 'react-icons/fi';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

/* ─── BRAND COLORS ───────────────────────────────────────────────── */
// Tickle Me Pink  #F283AF   |  Champagne    #FBF4EB
// Blush           #FBD9E5   |  Raspberry    #C43670
// Sunset          #F3CC97   |  Navy         #2F4156
// Pale Pink       #FFE1E6   |  Azalea       #F7C9D4
// Sky Blue        #C8D9E6   |  Beige        #F5EFEB

/* ─── DATA ───────────────────────────────────────────────────────── */
const categories = [
  { id: 'dresses',     name: 'Dresses',     icon: '👗', count: 24, link: '/shop?category=dresses',     bg: '#FFE1E6' },
  { id: 'tops',        name: 'Tops',        icon: '👚', count: 36, link: '/shop?category=tops',         bg: '#F7C9D4' },
  { id: 'bottoms',     name: 'Bottoms',     icon: '👖', count: 28, link: '/shop?category=bottoms',      bg: '#C8D9E6' },
  { id: 'sets',        name: 'Sets',        icon: '✨', count: 18, link: '/shop?category=sets',         bg: '#FBD9E5' },
  { id: 'accessories', name: 'Accessories', icon: '🎀', count: 42, link: '/shop?category=accessories',  bg: '#F3CC97' },
  { id: 'sleepwear',   name: 'Sleepwear',   icon: '🌙', count: 15, link: '/shop?category=sleepwear',   bg: '#FBF4EB' },
];

const moodZones = [
  { id: 'morning',  title: 'Morning Fresh',    emoji: '🌤️', description: 'Soft beginnings for gentle mornings',          image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.02.jpeg', link: '/shop?mood=morning',  accent: '#F283AF' },
  { id: 'school',   title: 'School Ready',     emoji: '🎒', description: 'Confidence for every classroom moment',         image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.03.jpeg', link: '/shop?mood=school',   accent: '#C43670' },
  { id: 'birthday', title: 'Birthday Sparkle', emoji: '🎂', description: 'Magical moments worth celebrating',             image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.04.jpeg', link: '/shop?mood=birthday', accent: '#F3CC97' },
  { id: 'holiday',  title: 'Holiday Dream',    emoji: '✈️', description: 'Adventure-ready for every journey',             image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.05.jpeg', link: '/shop?mood=holiday',  accent: '#F283AF' },
  { id: 'everyday', title: 'Everyday Soft',    emoji: '💕', description: 'Comfort that feels like a hug',                 image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.06.jpeg', link: '/shop?mood=everyday', accent: '#C43670' },
];

const editorialFeatures = [
  { id: 1, title: 'The Soft Movement Dress',      subtitle: 'Designed for gentle motion',   fabric: '100% Organic Cotton',    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.07.jpeg', link: '/shop?feature=soft-movement',     retailPrice: 25500, wholesalePrice: 12600 },
  { id: 2, title: 'School Day Confidence Set',    subtitle: 'Comfort meets confidence',     fabric: 'Breathable Cotton Jersey', image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.08.jpeg', link: '/shop?feature=school-confidence', retailPrice: 22500, wholesalePrice: 11400 },
  { id: 3, title: 'Weekend Freedom Collection',   subtitle: 'Playful weekends, perfect style', fabric: 'Soft Stretch Fabric',  image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.09.jpeg', link: '/shop?feature=weekend-freedom',   retailPrice: 28500, wholesalePrice: 14400 },
];

const trendingItems = [
  { id: 1, title: 'Sunset Gradient Dress',  mood: 'Evening Elegance',    image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.10.jpeg', link: '/shop?trending=sunset-dress',     retailPrice: 26700, wholesalePrice: 13500 },
  { id: 2, title: 'Blush Cloud Cardigan',   mood: 'Cozy Comfort',        image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.11.jpeg', link: '/shop?trending=blush-cardigan',   retailPrice: 20700, wholesalePrice: 10500 },
  { id: 3, title: 'Raspberry Party Gown',   mood: 'Celebration Ready',   image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.12.jpeg', link: '/shop?trending=raspberry-gown',   retailPrice: 32700, wholesalePrice: 16500 },
  { id: 4, title: 'Cream Dream Skirt',      mood: 'Everyday Magic',      image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.13.jpeg', link: '/shop?trending=cream-skirt',      retailPrice: 17700, wholesalePrice: 9000  },
  { id: 5, title: 'Pink Blossom Top',       mood: 'Fresh & Playful',     image: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.14.jpeg', link: '/shop?trending=pink-blossom',     retailPrice: 16500, wholesalePrice: 8400  },
];

const trustBadges = [
  { icon: FiTruck,   title: 'Free Island-Wide Delivery', desc: 'On orders over LKR 15,000',   color: '#F283AF' },
  { icon: FiShield,  title: 'Quality Guarantee',         desc: '100% satisfaction assured',    color: '#C43670' },
  { icon: FiHeart,   title: 'Made with Love',            desc: 'Premium materials, always',    color: '#F3CC97' },
  { icon: FiGift,    title: 'Gift Wrapping',             desc: 'Free on special occasions',    color: '#F283AF' },
];

const testimonials = [
  { name: 'Sachini P.',  location: 'Colombo',    rating: 5, text: 'My daughter absolutely loves the Blush Cloud Cardigan! The fabric is incredibly soft and the quality is outstanding. Will definitely buy more!' },
  { name: 'Dilani M.',   location: 'Kandy',      rating: 5, text: 'Chandira Kids is my go-to for my girls. Beautiful designs, fast delivery, and the clothes wash so well. Highly recommend!' },
  { name: 'Nimesha R.',  location: 'Galle',      rating: 5, text: 'The Birthday Sparkle dress was perfect for my daughter\'s party! She looked like a princess. Excellent craftsmanship.' },
];

/* ─── ANIMATIONS HELPER ─────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── REUSABLE SECTION HEADING ──────────────────────────────────── */
function SectionHeading({ eyebrow, title, subtitle }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className="mb-12 text-center"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
    >
      <span style={{ display: 'inline-block', background: 'linear-gradient(135deg,#F283AF,#C43670)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        {eyebrow}
      </span>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, color: '#2F4156', lineHeight: 1.15, margin: '0 0 0.6rem' }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: '#4A3B44', opacity: 0.65, maxWidth: '480px', margin: '0 auto', fontSize: '1rem' }}>{subtitle}</p>}
    </div>
  );
}

/* ─── STAR RATING ───────────────────────────────────────────────── */
function Stars({ n = 5 }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {Array.from({ length: n }).map((_, i) => (
        <FiStar key={i} style={{ fill: '#F3CC97', stroke: '#F3CC97', width: 14, height: 14 }} />
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [heroLoaded, setHeroLoaded]   = useState(false);
  const [activeTrend, setActiveTrend] = useState(0);

  useEffect(() => { const t = setTimeout(() => setHeroLoaded(true), 80); return () => clearTimeout(t); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div style={{ background: '#FBF4EB', minHeight: '100vh', overflow: 'hidden' }}>
      <SEO title="Chandira Kids | Every Outfit Tells Her Story" description="Luxury girls fashion designed for every growing moment. Soft, playful, made with love." />

      {/* ══ FLOATING BLOBS (decorative) ══════════════════════════════ */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,131,175,0.18) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-12%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,54,112,0.10) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(243,204,151,0.13) 0%, transparent 70%)' }} />
      </div>

      {/* ══ HERO ═════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', zIndex: 1, padding: '5rem 1.5rem 4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Eyebrow pill */}
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(242,131,175,0.12)', border: '1px solid rgba(242,131,175,0.35)', borderRadius: '9999px', padding: '0.4rem 1.1rem', marginBottom: '1.5rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F283AF', display: 'inline-block', animation: 'heroPulse 2s infinite' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', color: '#C43670', textTransform: 'uppercase' }}>New Arrivals · Summer 2026</span>
          </div>

          {/* Main heading */}
          <h1 style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(30px)', transition: 'all 0.75s ease 0.1s', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 1.08, color: '#2F4156', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
            Every Outfit
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #F283AF 0%, #C43670 50%, #F3CC97 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Tells Her Story
            </span>
          </h1>

          {/* Tagline */}
          <p style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(24px)', transition: 'all 0.75s ease 0.2s', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: '#4A3B44', opacity: 0.7, maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Luxury girls fashion for ages 0–15. Beautifully crafted, lovingly designed for every magical moment.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(20px)', transition: 'all 0.75s ease 0.3s', maxWidth: '520px', margin: '0 auto 2rem', display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', borderRadius: '9999px', padding: '6px', border: '1.5px solid rgba(242,131,175,0.3)', boxShadow: '0 8px 32px rgba(196,54,112,0.10)' }}
          >
            <FiSearch style={{ flexShrink: 0, margin: 'auto 0 auto 1rem', color: '#F283AF', width: 18, height: 18 }} />
            <input
              type="text"
              placeholder="Search dresses, sets, accessories…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.95rem', color: '#2F4156', padding: '0.6rem 0', borderRadius: 0, boxShadow: 'none' }}
            />
            <button
              type="submit"
              style={{ background: 'linear-gradient(135deg,#F283AF,#C43670)', color: '#fff', border: 'none', borderRadius: '9999px', padding: '0.65rem 1.5rem', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer', flexShrink: 0, transition: 'all 0.25s' }}
            >
              Search
            </button>
          </form>

          {/* CTA Buttons */}
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? 'none' : 'translateY(16px)', transition: 'all 0.75s ease 0.4s', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.875rem' }}>
            <Link
              to="/shop"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#C43670,#F283AF)', color: '#fff', textDecoration: 'none', borderRadius: '9999px', padding: '0.875rem 2rem', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 8px 32px rgba(196,54,112,0.28)', transition: 'transform 0.25s, box-shadow 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(196,54,112,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,54,112,0.28)'; }}
            >
              Shop All Products <FiArrowRight />
            </Link>
            <Link
              to="/shop?sort=newest"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', color: '#C43670', textDecoration: 'none', borderRadius: '9999px', padding: '0.875rem 2rem', fontWeight: 700, fontSize: '0.95rem', border: '1.5px solid rgba(196,54,112,0.25)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FBD9E5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; }}
            >
              New Arrivals ✨
            </Link>
          </div>

          {/* Social proof bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(251,217,229,0.5)' }}>
            {[['500+', 'Happy Families'], ['4.9★', 'Customer Rating'], ['0–15', 'Age Range'], ['LKR', 'Island Delivery']].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.5rem', fontWeight: 700, color: '#C43670' }}>{val}</div>
                <div style={{ fontSize: '0.78rem', color: '#4A3B44', opacity: 0.6, fontWeight: 600, letterSpacing: '0.05em' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST BADGES ═════════════════════════════════════════════ */}
      <TrustBar />

      {/* ══ CATEGORY GRID ════════════════════════════════════════════ */}
      <CategoryGrid />

      {/* ══ TRENDING CAROUSEL ════════════════════════════════════════ */}
      <TrendingSection items={trendingItems} active={activeTrend} setActive={setActiveTrend} />

      {/* ══ SHOP BY OCCASION ═════════════════════════════════════════ */}
      <OccasionSection />

      {/* ══ EDITORIAL FEATURE ════════════════════════════════════════ */}
      <EditorialSection />

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══ INSTAGRAM CTA ════════════════════════════════════════════ */}
      <InstagramCTA />

      {/* GLOBAL KEYFRAMES */}
      <style>{`
        @keyframes heroPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </div>
  );
}

/* ─── TRUST BAR ─────────────────────────────────────────────────── */
function TrustBar() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ position: 'relative', zIndex: 1, padding: '0 1.5rem 3rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
        {trustBadges.map((b, i) => (
          <div
            key={b.title}
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: `all 0.6s ease ${i * 0.1}s`, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(251,217,229,0.7)', borderRadius: '1.25rem', padding: '1.25rem 1rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(196,54,112,0.06)' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${b.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <b.icon style={{ width: 20, height: 20, color: b.color }} />
            </div>
            <p style={{ fontWeight: 700, color: '#2F4156', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{b.title}</p>
            <p style={{ color: '#4A3B44', opacity: 0.6, fontSize: '0.8rem' }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CATEGORY GRID ─────────────────────────────────────────────── */
function CategoryGrid() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ position: 'relative', zIndex: 1, padding: '3rem 1.5rem 4rem', background: 'rgba(255,255,255,0.45)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading eyebrow="Browse" title="Shop by Category" subtitle="Find the perfect look for every little moment" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '1rem' }}>
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={cat.link}
              style={{ textDecoration: 'none', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px) scale(0.96)', transition: `all 0.65s ease ${i * 0.07}s` }}
            >
              <div
                style={{ background: cat.bg, borderRadius: '1.5rem', padding: '1.75rem 1rem', textAlign: 'center', border: '2px solid transparent', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'; e.currentTarget.style.border = '2px solid rgba(196,54,112,0.3)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(196,54,112,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.border = '2px solid transparent'; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.6rem', lineHeight: 1 }}>{cat.icon}</div>
                <p style={{ fontWeight: 700, color: '#2F4156', fontSize: '0.9rem', margin: '0 0 0.2rem' }}>{cat.name}</p>
                <p style={{ color: '#C43670', fontSize: '0.75rem', fontWeight: 600, opacity: 0.8 }}>{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TRENDING SECTION ──────────────────────────────────────────── */
function TrendingSection({ items, active, setActive }) {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem', background: 'linear-gradient(135deg, #FBD9E5 0%, #FBF4EB 50%, #F7C9D4 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.65s ease' }}>
            <span style={{ display: 'block', background: 'linear-gradient(135deg,#F283AF,#C43670)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Hot Right Now</span>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 700, color: '#2F4156', margin: 0 }}>Trending Now</h2>
          </div>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#C43670', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', opacity: visible ? 1 : 0, transition: 'opacity 0.65s ease 0.2s' }}>
            View All <FiArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1.25rem' }}>
          {items.map((item, i) => (
            <Link
              key={item.id}
              to={item.link}
              style={{ textDecoration: 'none', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: `all 0.65s ease ${i * 0.08}s` }}
            >
              <div
                style={{ background: '#fff', borderRadius: '1.5rem', overflow: 'hidden', border: '1.5px solid rgba(251,217,229,0.7)', transition: 'all 0.32s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(196,54,112,0.18)'; e.currentTarget.style.borderColor = '#F283AF'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(251,217,229,0.7)'; }}
              >
                <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => { e.target.style.transform = 'scale(1.07)'; }}
                    onMouseLeave={e => { e.target.style.transform = ''; }}
                  />
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'linear-gradient(135deg,#F283AF,#C43670)', color: '#fff', borderRadius: '9999px', padding: '0.25rem 0.65rem', fontSize: '0.7rem', fontWeight: 700 }}>
                    🔥 Trending
                  </div>
                </div>
                <div style={{ padding: '0.875rem' }}>
                  <p style={{ fontWeight: 700, color: '#2F4156', fontSize: '0.88rem', margin: '0 0 0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</p>
                  <p style={{ color: '#F283AF', fontSize: '0.75rem', fontWeight: 600, margin: '0 0 0.4rem' }}>{item.mood}</p>
                  <p style={{ fontWeight: 800, color: '#C43670', fontSize: '0.95rem' }}>LKR {item.retailPrice.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── OCCASION SECTION ──────────────────────────────────────────── */
function OccasionSection() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem', background: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading eyebrow="Occasions" title="Shop the Mood" subtitle="Find the perfect outfit for every special moment in her life" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1.25rem' }}>
          {moodZones.map((zone, i) => (
            <Link
              key={zone.id}
              to={zone.link}
              style={{ textDecoration: 'none', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'scale(0.94)', transition: `all 0.65s ease ${i * 0.1}s` }}
            >
              <div
                style={{ borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', aspectRatio: '1/1.2', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.querySelector('.overlay').style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.querySelector('.overlay').style.opacity = '0'; }}
              >
                <img src={zone.image} alt={zone.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
                {/* gradient overlay always visible at bottom */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(47,65,86,0.75) 0%, transparent 55%)' }} />
                {/* hover overlay */}
                <div className="overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${zone.accent}CC, rgba(47,65,86,0.6))`, opacity: 0, transition: 'opacity 0.3s ease' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.1rem', color: '#fff', zIndex: 2 }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>{zone.emoji}</div>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: '1rem', margin: '0 0 0.1rem' }}>{zone.title}</p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.85 }}>{zone.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EDITORIAL / FEATURED SECTION ─────────────────────────────── */
function EditorialSection() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem', background: 'linear-gradient(135deg,#FBF4EB 0%,#F5EFEB 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading eyebrow="Featured" title="Curated Collection" subtitle="Handpicked pieces designed for every chapter of her story" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
          {editorialFeatures.map((feat, i) => (
            <Link
              key={feat.id}
              to={feat.link}
              style={{ textDecoration: 'none', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(36px)', transition: `all 0.7s ease ${i * 0.12}s` }}
            >
              <div
                style={{ background: '#fff', borderRadius: '2rem', overflow: 'hidden', border: '1.5px solid rgba(251,217,229,0.6)', transition: 'all 0.35s ease', height: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 24px 64px rgba(196,54,112,0.18)'; e.currentTarget.style.borderColor = '#F283AF'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(251,217,229,0.6)'; }}
              >
                <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                  <img
                    src={feat.image}
                    alt={feat.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                    onMouseEnter={e => { e.target.style.transform = 'scale(1.06)'; }}
                    onMouseLeave={e => { e.target.style.transform = ''; }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ display: 'inline-block', background: '#FBD9E5', color: '#C43670', borderRadius: '9999px', padding: '0.3rem 0.85rem', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
                    {feat.fabric}
                  </span>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', fontWeight: 700, color: '#2F4156', margin: '0 0 0.3rem' }}>{feat.title}</h3>
                  <p style={{ color: '#4A3B44', opacity: 0.65, fontSize: '0.875rem', margin: '0 0 1rem' }}>{feat.subtitle}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 800, color: '#C43670', fontSize: '1.1rem' }}>LKR {feat.retailPrice.toLocaleString()}</span>
                    <span style={{ color: '#4A3B44', opacity: 0.45, fontSize: '0.85rem', textDecoration: 'line-through' }}>LKR {feat.wholesalePrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            to="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#C43670,#F283AF)', color: '#fff', textDecoration: 'none', borderRadius: '9999px', padding: '0.9rem 2.2rem', fontWeight: 700, fontSize: '0.95rem', boxShadow: '0 8px 32px rgba(196,54,112,0.25)', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(196,54,112,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,54,112,0.25)'; }}
          >
            Explore Full Collection <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────────────── */
function TestimonialsSection() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem', background: 'linear-gradient(135deg,#C43670 0%,#F283AF 100%)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.65s ease' }}>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Loved by Families</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.75rem,4vw,2.75rem)', fontWeight: 700, color: '#fff', margin: 0 }}>What Mamas Say</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.25rem' }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: `all 0.65s ease ${i * 0.12}s`, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '1.5rem', padding: '1.75rem' }}
            >
              <Stars n={t.rating} />
              <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: 1.7, margin: '1rem 0 1.25rem', opacity: 0.95 }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '1rem' }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>{t.name}</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', margin: 0 }}>{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── INSTAGRAM CTA ─────────────────────────────────────────────── */
function InstagramCTA() {
  const [ref, visible] = useScrollReveal();
  const whatsappMessage = encodeURIComponent('Hello Chandira Kids,\n\nI would like to place an order.\n\nProduct:\nQuantity:\nCustomer Name:');
  return (
    <section ref={ref} style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.7s ease' }}>
        <div style={{ background: 'linear-gradient(135deg,#FFE1E6,#FBD9E5,#F7C9D4)', borderRadius: '2rem', padding: '3.5rem 2rem', border: '1.5px solid rgba(242,131,175,0.3)', boxShadow: '0 16px 64px rgba(196,54,112,0.12)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💕</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.5rem,4vw,2.2rem)', fontWeight: 700, color: '#2F4156', margin: '0 0 0.75rem' }}>
            Tag Us on Instagram
          </h2>
          <p style={{ color: '#4A3B44', opacity: 0.7, maxWidth: '420px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Share her beautiful moments in Chandira Kids outfits and get featured on our page! Use #ChandiraKids
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.875rem' }}>
            <a
              href="https://instagram.com/chandirakids"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#C43670,#F283AF)', color: '#fff', textDecoration: 'none', borderRadius: '9999px', padding: '0.875rem 1.75rem', fontWeight: 700, fontSize: '0.92rem', boxShadow: '0 8px 32px rgba(196,54,112,0.25)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
            >
              <FaInstagram size={18} /> Follow @ChandiraKids
            </a>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#C43670', textDecoration: 'none', borderRadius: '9999px', padding: '0.875rem 1.75rem', fontWeight: 700, fontSize: '0.92rem', border: '1.5px solid rgba(196,54,112,0.25)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FBD9E5'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              <FaWhatsapp size={18} /> Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
