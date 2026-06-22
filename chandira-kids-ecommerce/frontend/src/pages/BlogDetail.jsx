import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiLoader, FiCalendar, FiClock, FiUser, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import SEO from '../components/SEO';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/blog/posts/${id}`);
      setPost(data.post);
      
      // Fetch related posts
      if (data.post?.category) {
        const related = await api.get('/blog/posts', {
          params: {
            category: data.post.category,
            status: 'published',
            limit: 3,
            exclude: id
          }
        });
        setRelatedPosts(related.data.posts || []);
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      toast.error('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share canceled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <section className="page-shell">
        <div className="flex items-center justify-center py-20">
          <FiLoader className="h-8 w-8 animate-spin text-brand-rose" />
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="page-shell">
        <div className="text-center py-20">
          <p className="text-muted">Blog post not found.</p>
          <Link to="/blog" className="btn-primary mt-4 inline-block">
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <SEO 
        title={`${post.title} | Chandira Kids Blog`}
        description={post.excerpt}
        image={post.featuredImage}
      />
      
      {/* Back Button */}
      <Link to="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-brand-rose">
        <FiArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 aspect-video overflow-hidden rounded-2xl">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Post Header */}
      <div className="mb-8">
        <span className="rounded-full bg-brand-blush px-4 py-1.5 text-sm font-semibold text-brand-rose">
          {post.category}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink dark:text-white md:text-4xl">
          {post.title}
        </h1>
        
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1">
            <FiCalendar className="h-4 w-4" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
          <span className="flex items-center gap-1">
            <FiClock className="h-4 w-4" />
            {post.readTime || '5 min read'}
          </span>
          {post.author && (
            <span className="flex items-center gap-1">
              <FiUser className="h-4 w-4" />
              {post.author}
            </span>
          )}
          <button
            onClick={sharePost}
            className="flex items-center gap-1 hover:text-brand-rose"
          >
            <FiShare2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div 
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-ink dark:text-white">Related Posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost._id}
                to={`/blog/${relatedPost._id}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-glow dark:bg-gray-800"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={relatedPost.featuredImage || '/images/blog-placeholder.jpg'}
                    alt={relatedPost.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-semibold text-ink group-hover:text-brand-rose dark:text-white">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">{relatedPost.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
