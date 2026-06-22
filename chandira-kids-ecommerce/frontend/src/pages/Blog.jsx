import { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import api from '../api/client';
import toast from 'react-hot-toast';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/blog/posts', {
        params: { 
          status: 'published',
          limit: 20
        }
      });
      setPosts(data.posts || []);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data.posts?.map(p => p.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      toast.error('Failed to load blog posts');
      // Set fallback static posts for now
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section className="page-shell">
      <SEO title="Blog | Chandira Kids" description="Expert advice on styling, sizing, and caring for kids clothing" />
      <div className="page-hero mb-8 text-center">
        <p className="section-label">Our Blog</p>
        <h1 className="section-title mt-2">Kids Fashion Tips & Guides</h1>
        <p className="mx-auto mt-3 max-w-lg text-base text-ink/65">Expert advice on styling, sizing, and caring for kids clothing</p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedCategory === category
                ? 'bg-brand-rose text-white'
                : 'bg-brand-blush text-ink hover:bg-brand-pink hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <FiLoader className="h-8 w-8 animate-spin text-brand-rose" />
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted">No blog posts found. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
