import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Chandira Kids',
  description = 'Girls clothing for ages 0 to 15.',
  image,
  url,
  type = 'website',
  jsonLd
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://chandirakids.com';
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const ogImage = image || `${siteUrl}/images/og-default.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={pageUrl} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export function productJsonLd(product, imageUrl) {
  if (!product) return null;
  const price = product.salePrice > 0 && product.salePrice < product.price ? product.salePrice : product.price;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product.code,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'LKR',
      price: price,
      availability: product.variants?.some((v) => v.stock > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock'
    },
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.averageRating,
      reviewCount: product.reviewCount
    } : undefined
  };
}

export function organizationJsonLd() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://chandirakids.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chandira Kids',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: 'Beautiful girls clothing for ages 0 to 15. Retail shopping and wholesale support for boutiques across Sri Lanka.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LK',
      addressRegion: 'Sri Lanka'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+94-77-123-4567',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://facebook.com/chandirakids',
      'https://instagram.com/chandirakids'
    ]
  };
}

export function websiteJsonLd() {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://chandirakids.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Chandira Kids',
    url: siteUrl,
    description: 'Beautiful girls clothing for ages 0 to 15. Retail shopping and wholesale support for boutiques across Sri Lanka.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/shop?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function breadcrumbJsonLd(items) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://chandirakids.com';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`
    }))
  };
}
