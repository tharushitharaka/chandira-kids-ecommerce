import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import SEO from './SEO';

export default function BlogCard({ post }) {
  const { _id, title, excerpt, featuredImage, author, category, publishedAt, readTime } = post;

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-glow dark:bg-gray-800">
      <Link to={`/blog/${_id}`} className="block">
        <div className="aspect-video overflow-hidden">
          <img
            src={featuredImage || '/images/blog-placeholder.jpg'}
            alt={title}
            className="h-full w-full object-cover transition group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center gap-3 text-xs font-semibold text-brand-rose">
            <span className="rounded-full bg-brand-blush px-3 py-1">{category}</span>
            <span className="flex items-center gap-1 text-muted">
              <FiClock className="h-3 w-3" />
              {readTime || '5 min read'}
            </span>
          </div>
          <h3 className="mb-2 text-xl font-bold text-ink group-hover:text-brand-rose dark:text-white dark:group-hover:text-brand-pink">
            {title}
          </h3>
          <p className="mb-4 line-clamp-2 text-body text-muted">{excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-1">
              <FiCalendar className="h-3 w-3" />
              {new Date(publishedAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </span>
            <span className="flex items-center gap-1 font-semibold text-brand-rose group-hover:gap-2 transition-all">
              Read More <FiArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
