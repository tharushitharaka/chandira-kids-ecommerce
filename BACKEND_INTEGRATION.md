# Backend Integration Guide

This document provides instructions for integrating the new backend features (Blog, Loyalty Program, and Email Marketing) into your existing backend server.

## Overview

The following backend features have been created:

1. **Dynamic Blog System** - Full CRUD operations for blog posts with categories, comments, and likes
2. **Loyalty Program** - Points system with tiers, rewards, and redemption
3. **Email Marketing** - Newsletter subscription, campaigns, and analytics

## Integration Status

✅ **COMPLETED:**
- Route registrations added to `backend/src/app.js`
- Middleware files created (`auth-cjs.js`, `adminAuth.js`)
- Email service configuration created (`emailService.js`)
- Environment variables added to `.env.example`
- Rewards seed script created (`src/seed/rewards.js`)
- Package dependencies added to `package.json`

## File Structure

### Models (backend/src/models/)
- `BlogPost.js` - Blog post model with content, categories, and engagement tracking
- `Loyalty.js` - User loyalty account with points, tiers, and history
- `Reward.js` - Available rewards for redemption
- `Newsletter.js` - Newsletter subscriber management
- `EmailCampaign.js` - Email campaign management

### Routes (backend/src/routes/)
- `blog.js` - Blog API endpoints
- `loyalty.js` - Loyalty program API endpoints
- `newsletter.js` - Newsletter and email marketing API endpoints

### Middleware (backend/src/middleware/)
- `auth-cjs.js` - CommonJS authentication middleware
- `adminAuth.js` - Admin authorization middleware

### Utils (backend/src/utils/)
- `emailService.js` - Email service configuration (SendGrid/Mailchimp)

### Seed Scripts (backend/src/seed/)
- `rewards.js` - Initial rewards data seeding

## Installation Steps

### 1. Install New Dependencies

```bash
cd backend
npm install
```

This will install the new email service packages:
- `@sendgrid/mail` - SendGrid email service
- `@mailchimp/mailchimp_marketing` - Mailchimp email service

### 2. Configure Environment Variables

Add these to your `.env` file (copy from `.env.example`):

```env
# Email Service Configuration (Choose one)
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@chandirakids.com
SENDGRID_FROM_NAME=Chandira Kids

# Mailchimp Configuration (Alternative to SendGrid)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
MAILCHIMP_FROM_EMAIL=noreply@chandirakids.com
```

### 3. Seed Initial Rewards Data

```bash
npm run seed:rewards
```

This will populate the rewards catalog with 10 initial rewards across different tiers.

### 4. (Optional) Configure Email Service

Choose and configure one email service:

#### Option 1: SendGrid
1. Sign up at https://sendgrid.com/
2. Get your API key from settings
3. Add `SENDGRID_API_KEY` to `.env`
4. Configure sender email in SendGrid settings

#### Option 2: Mailchimp
1. Sign up at https://mailchimp.com/
2. Get your API key from account settings
3. Create a list and get the list ID
4. Add `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID` to `.env`

## API Endpoints

### Blog API

**Public Endpoints:**
- `GET /api/blog/posts` - Get all published posts (with pagination, category filter, search)
- `GET /api/blog/posts/:id` - Get single post by ID
- `GET /api/blog/slug/:slug` - Get single post by slug
- `GET /api/blog/categories` - Get all categories

**Admin Endpoints:**
- `POST /api/blog/posts` - Create new post
- `PUT /api/blog/posts/:id` - Update post
- `DELETE /api/blog/posts/:id` - Delete post

**User Endpoints:**
- `POST /api/blog/posts/:id/comments` - Add comment (auth required)
- `POST /api/blog/posts/:id/like` - Like post (auth required)

### Loyalty API

**User Endpoints:**
- `GET /api/loyalty/status` - Get user loyalty status (auth required)
- `GET /api/loyalty/rewards` - Get available rewards (public)
- `POST /api/loyalty/redeem` - Redeem reward (auth required)
- `GET /api/loyalty/history` - Get points history (auth required)

**Admin Endpoints:**
- `POST /api/loyalty/add-points` - Add points to user (admin)

### Newsletter API

**Public Endpoints:**
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter/unsubscribe/:token` - Unsubscribe via token

**User Endpoints:**
- `PUT /api/newsletter/preferences` - Update preferences

**Admin Endpoints:**
- `GET /api/newsletter/stats` - Get subscriber statistics
- `GET /api/newsletter/subscribers` - Get all subscribers
- `POST /api/newsletter/campaigns` - Create email campaign
- `GET /api/newsletter/campaigns` - Get all campaigns
- `POST /api/newsletter/campaigns/:id/send` - Send campaign

## Loyalty Points Calculation

The loyalty program uses the following point system:

- **Purchase Points:** 1 point per LKR 10 spent
- **Review Points:** 50 points per review
- **Profile Completion:** 100 points
- **Birthday Bonus:** 200 points
- **Referral Bonus:** 500 points
- **Social Share:** 25 points per share

### Tier Thresholds
- Bronze: 0 points
- Silver: 1,000 points
- Gold: 5,000 points
- Platinum: 10,000 points

## Testing

You can test the endpoints using Postman or curl:

```bash
# Get blog posts
curl http://localhost:5000/api/blog/posts

# Subscribe to newsletter
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"footer"}'

# Get loyalty status (requires auth token)
curl http://localhost:5000/api/loyalty/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Frontend Integration

The frontend components are already created and ready to use:

- `frontend/src/components/BlogCard.jsx` - Blog post card component
- `frontend/src/pages/Blog.jsx` - Blog listing page
- `frontend/src/pages/BlogDetail.jsx` - Blog detail page
- `frontend/src/pages/Loyalty.jsx` - Loyalty dashboard
- `frontend/src/components/NewsletterPopup.jsx` - Newsletter subscription popup

Routes have been added to `frontend/src/App.jsx`:
- `/blog` - Blog listing
- `/blog/:id` - Blog detail
- `/loyalty` - Loyalty dashboard (protected)

## Next Steps

1. **Configure email service** - Choose SendGrid or Mailchimp and add API keys
2. **Create admin interface** - Build admin pages for managing blog posts, rewards, and campaigns
3. **Add point automation** - Implement automatic point earning on purchases, reviews, etc.
4. **Set up email templates** - Create professional email templates for campaigns
5. **Configure cron jobs** - Set up scheduled tasks for:
   - Sending scheduled campaigns
   - Expiring old rewards
   - Birthday bonus distribution
   - Abandoned cart emails

## Support

If you encounter any issues during integration, check:
1. MongoDB connection is working
2. JWT authentication is properly configured
3. Environment variables are set correctly
4. Routes are registered in the correct order
5. Email service API keys are valid
