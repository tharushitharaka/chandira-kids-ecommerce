import { useRef, useState } from 'react';
import { mediaUrl } from '../utils/media';

export default function ImageZoom({ src, alt, className = '' }) {
  const containerRef = useRef(null);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handleMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-brand-blush ${className}`}
      onMouseEnter={() => setZooming(true)}
      onMouseLeave={() => setZooming(false)}
      onMouseMove={handleMove}
    >
      <img
        className="aspect-[4/5] w-full object-cover transition-transform duration-200 ease-out"
        style={{
          transform: zooming ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${origin.x}% ${origin.y}%`
        }}
        src={mediaUrl(src)}
        alt={alt}
        loading="lazy"
      />
      {zooming && (
        <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          2× zoom
        </span>
      )}
    </div>
  );
}
