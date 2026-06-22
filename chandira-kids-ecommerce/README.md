# Chandira Kids E-Commerce

Production-ready full-stack e-commerce system for Chandira Kids, built with React, Vite, Tailwind CSS, Node.js, Express, JWT, Nodemailer, and MongoDB Atlas.

## Complete Folder Structure

```text
chandira-kids-ecommerce/
  backend/
    src/
      config/db.js
      data/catalogueProducts.js
      middleware/auth.js
      middleware/errorHandler.js
      middleware/upload.js
      models/
        Address.js
        Category.js
        ContactMessage.js
        Coupon.js
        NewsletterSubscriber.js
        Notification.js
        Order.js
        Product.js
        Promotion.js
        Review.js
        User.js
        WholesaleApplication.js
        Wishlist.js
      routes/
        adminRoutes.js
        authRoutes.js
        couponRoutes.js
        orderRoutes.js
        productRoutes.js
        publicRoutes.js
        reviewRoutes.js
        uploadRoutes.js
        userRoutes.js
        wholesaleRoutes.js
      scripts/importCatalogueProducts.js
      services/paymentMethods.js
      utils/email.js
      utils/token.js
      app.js
      seed.js
      server.js
    uploads/.gitkeep
    .env.example
    package.json
  frontend/
    public/images/products/
    src/
      api/client.js
      components/Layout.jsx
      components/ProductCard.jsx
      components/SEO.jsx
      context/AuthContext.jsx
      context/CartContext.jsx
      pages/
        AdminDashboard.jsx
        Cart.jsx
        Checkout.jsx
        Dashboard.jsx
        ForgotPassword.jsx
        Home.jsx
        Login.jsx
        ProductDetails.jsx
        Register.jsx
        ResetPassword.jsx
        Shop.jsx
        StaticPage.jsx
        Wholesale.jsx
        Wishlist.jsx
      utils/media.js
      App.jsx
      index.css
      main.jsx
    .env.example
    package.json
```

## Features

- Modern responsive storefront with hero banners, rounded cards, glassmorphism, transitions, hover states, newsletter, testimonials, Instagram gallery, and WhatsApp ordering.
- Product grid with search suggestions, category, age, price, retail/wholesale filters, sorting, and pagination.
- Product details with multiple images, zoom-style hover, product code, pricing, stock, variants, wholesale tiers, wishlist, sharing, reviews, and related products.
- Wholesale application workflow with admin approval and wholesale customer role.
- Cart, coupon entry, shipping estimate, checkout, payment method structure for COD, Stripe, and PayPal.
- Register, login, logout, forgot password, reset password, JWT route protection, customer dashboard, wishlist, addresses, orders, tracking, and notifications.
- Separate admin dashboard with statistics, product creation, inventory alerts, orders, customers, reviews, wholesale accounts, promotions, coupons, categories, contact messages, and newsletters.
- Security middleware: Helmet, CORS, rate limiting, password hashing, JWT verification, environment variables, and Mongo sanitization.
- SEO helpers for meta titles, descriptions, Open Graph, structured data support, and lazy-friendly image usage.

## Installation Commands

```bash
cd backend
npm install

cd ../frontend
npm install
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account and a new project.
2. Create a free or production cluster.
3. Create a database user with a strong password.
4. Add your IP address in Network Access, or allow your hosting provider IP.
5. Copy the connection string.
6. Replace `<username>`, `<password>`, and cluster details in `backend/.env`.
7. Use `chandira-kids` as the database name.

## Environment Variable Examples

Backend `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chandira-kids
MONGO_DB_NAME=chandira-kids
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@chandira-kids.local
ADMIN_PASSWORD=Admin12345!
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey-or-user
EMAIL_PASS=email-password
EMAIL_FROM="Chandira Kids <orders@chandira-kids.com>"
STRIPE_SECRET_KEY=sk_test_replace_me
PAYPAL_CLIENT_ID=paypal-client-id
WHATSAPP_NUMBER=94771234567
```

Frontend `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=94771234567
```

## Run Commands

Backend:

```bash
cd backend
npm run seed
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Production build:

```bash
cd frontend
npm run build

cd ../backend
npm start
```

## Payment Integration Notes

`backend/src/services/paymentMethods.js` provides a pluggable payment adapter structure. COD works as a pending payment method. Stripe and PayPal return prepared intent objects and check whether the needed environment variables exist. Replace those placeholder intent functions with official SDK calls when live merchant accounts are ready.

## Deployment Guide

1. Push this repository to GitHub.
2. Deploy the backend to Render, Railway, Fly.io, or another Node host.
3. Add all backend environment variables in the host dashboard.
4. Set `CLIENT_URL` to the deployed frontend URL.
5. Deploy the frontend to Vercel, Netlify, or Cloudflare Pages.
6. Set `VITE_API_URL` to `https://your-backend-domain.com/api`.
7. Seed production once with `npm run seed` if sample products/admin user are needed.
8. Configure a real SMTP provider for Nodemailer.
9. Add real Stripe/PayPal SDK logic before accepting live online card payments.
10. Enable MongoDB Atlas backups, database user least privilege, and production CORS domains.

## GitHub

The connected remote is:

```text
https://github.com/tharushitharaka/chandira-kids-ecommerce.git
```
