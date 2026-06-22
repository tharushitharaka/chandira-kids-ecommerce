import express from 'express';
import BlogPost from '../models/BlogPost.js';
import auth from '../middleware/auth-cjs.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Get all published blog posts (public)
router.get('/posts', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      status = 'published',
      exclude
    } = req.query;

    const query = { status };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (exclude) {
      query._id = { $ne: exclude };
    }

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-comments');

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
});

// Get single blog post by ID (public)
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (post.status !== 'published') {
      return res.status(403).json({ message: 'This post is not published' });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// Get blog post by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (post.status !== 'published') {
      return res.status(403).json({ message: 'This post is not published' });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    res.json({ post });
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// Get all categories (public)
router.get('/categories', async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// Create new blog post (admin only)
router.post('/posts', adminAuth, async (req, res) => {
  try {
    const post = new BlogPost(req.body);
    
    if (req.body.status === 'published' && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    await post.save();
    res.status(201).json({ post });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Failed to create blog post' });
  }
});

// Update blog post (admin only)
router.put('/posts/:id', adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (req.body.status === 'published' && !post.publishedAt) {
      post.publishedAt = new Date();
      await post.save();
    }

    res.json({ post });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Failed to update blog post' });
  }
});

// Delete blog post (admin only)
router.delete('/posts/:id', adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
});

// Add comment to blog post (authenticated users)
router.post('/posts/:id/comments', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    post.comments.push({
      user: req.user._id,
      content
    });

    await post.save();
    res.json({ post });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Like blog post (authenticated users)
router.post('/posts/:id/like', auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    post.likes += 1;
    await post.save();

    res.json({ likes: post.likes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
});

export default router;
