const sizeOptions = ['S', 'M', 'L'];

const makeVariants = (prefix, colors) =>
  colors.flatMap((color) =>
    sizeOptions.map((size) => ({
      size,
      color,
      sku: `${prefix}-${color.replace(/\s+/g, '').toUpperCase()}-${size}`,
      stock: 10
    }))
  );

export const catalogueProducts = [
  {
    name: 'Bunny Gingham Dress Set',
    slug: 'bunny-gingham-dress-set',
    category: 'Clothing Sets',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    price: 0,
    wholesalePrice: 0,
    wholesaleMinQty: 6,
    featured: true,
    description:
      'Dress your little one in pure comfort and cuteness. This adorable 3-piece mix-and-match set features a classic gingham pinafore dress with a sweet bunny patch, a separate white puff-sleeve inner blouse, and a matching bow headband. Perfect for playdates, birthdays, or everyday cuteness.',
    images: [
      { url: '/images/products/bunny-gingham-set-collection.png', alt: 'Bunny Gingham Dress Set in pink red and green' },
      { url: '/images/products/bunny-gingham-set-red.png', alt: 'Bunny Gingham Dress Set in classic red' },
      { url: '/images/products/bunny-gingham-set-green.png', alt: 'Bunny Gingham Dress Set in fresh green' },
      { url: '/images/products/bunny-gingham-set-pink.png', alt: 'Bunny Gingham Dress Set in soft pink' }
    ],
    variants: makeVariants('CK-BUNNY', ['Soft Pink', 'Classic Red', 'Fresh Green']),
    tags: ['gingham dress', 'bunny dress', 'girls dress set', 'headband set'],
    seoTitle: 'Bunny Gingham Dress Set | Chandira Kids',
    seoDescription:
      'Shop the Bunny Gingham Dress Set with pinafore dress, white puff-sleeve blouse, and matching bow headband in sizes S, M, and L.'
  },
  {
    name: 'Elegant Floral Bow Dress Set',
    slug: 'elegant-floral-bow-dress-set',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    price: 0,
    wholesalePrice: 0,
    wholesaleMinQty: 6,
    featured: true,
    description:
      'Dress your little one in pure comfort and cuteness. This adorable 2-piece set features a classic short-sleeve A-line dress adorned with a beautiful vintage rose floral pattern, a contrasting solid waist sash with a sweet centerpiece bow, and a matching floral bow headband. Perfect for playdates, birthdays, or everyday cuteness.',
    images: [
      { url: '/images/products/floral-bow-dress-collection.png', alt: 'Elegant Floral Bow Dress Set collection' },
      { url: '/images/products/floral-bow-dress-fuchsia.png', alt: 'Elegant Floral Bow Dress Set in fuchsia pink' },
      { url: '/images/products/floral-bow-dress-magenta.png', alt: 'Elegant Floral Bow Dress Set in magenta pink' },
      { url: '/images/products/floral-bow-dress-pastel.png', alt: 'Elegant Floral Bow Dress Set in soft pastel pink' }
    ],
    variants: makeVariants('CK-FLORAL', ['Fuchsia Pink', 'Magenta Pink', 'Soft Pastel Pink']),
    tags: ['floral dress', 'bow dress', 'party dress', 'girls dress set'],
    seoTitle: 'Elegant Floral Bow Dress Set | Chandira Kids',
    seoDescription:
      'Shop the Elegant Floral Bow Dress Set with vintage rose floral dress and matching headband in fuchsia, magenta, and soft pastel pink.'
  }
];
