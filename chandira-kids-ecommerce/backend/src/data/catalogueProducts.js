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
  },
  // New products from the 20 dress designs
  {
    name: 'Classic Floral Party Dress',
    slug: 'classic-floral-party-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1250,
    wholesalePrice: 850,
    wholesaleMinQty: 6,
    featured: true,
    description: 'A beautiful floral party dress with elegant design and comfortable fit. Perfect for birthday parties, weddings, and special occasions.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.02.jpeg', alt: 'Classic Floral Party Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.02 (1).jpeg', alt: 'Classic Floral Party Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.02 (2).jpeg', alt: 'Classic Floral Party Dress in green' }
    ],
    variants: makeVariants('CK-FLORAL01', ['Pink', 'Red', 'Green']),
    tags: ['floral dress', 'party dress', 'girls dress', 'special occasion'],
    seoTitle: 'Classic Floral Party Dress | Chandira Kids',
    seoDescription: 'Beautiful floral party dress available in pink, red, and green. Perfect for special occasions.'
  },
  {
    name: 'Elegant Bow Design Dress',
    slug: 'elegant-bow-design-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1350,
    wholesalePrice: 900,
    wholesaleMinQty: 6,
    featured: true,
    description: 'An elegant dress featuring a beautiful bow design with premium fabric. Ideal for parties and celebrations.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.03.jpeg', alt: 'Elegant Bow Design Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.03 (1).jpeg', alt: 'Elegant Bow Design Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.03 (2).jpeg', alt: 'Elegant Bow Design Dress in green' }
    ],
    variants: makeVariants('CK-BOW01', ['Pink', 'Red', 'Green']),
    tags: ['bow dress', 'elegant dress', 'party dress', 'girls dress'],
    seoTitle: 'Elegant Bow Design Dress | Chandira Kids',
    seoDescription: 'Elegant bow design dress available in multiple colors. Perfect for special occasions.'
  },
  {
    name: 'Patterned Garden Dress',
    slug: 'patterned-garden-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1150,
    wholesalePrice: 750,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A lovely patterned dress inspired by garden themes. Comfortable and stylish for everyday wear.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.04.jpeg', alt: 'Patterned Garden Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.04 (1).jpeg', alt: 'Patterned Garden Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.04 (2).jpeg', alt: 'Patterned Garden Dress in green' }
    ],
    variants: makeVariants('CK-GARDEN01', ['Pink', 'Red', 'Green']),
    tags: ['patterned dress', 'casual dress', 'girls dress', 'everyday wear'],
    seoTitle: 'Patterned Garden Dress | Chandira Kids',
    seoDescription: 'Comfortable patterned garden dress perfect for everyday wear.'
  },
  {
    name: 'Floral Print A-Line Dress',
    slug: 'floral-print-aline-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1200,
    wholesalePrice: 800,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A classic A-line dress with beautiful floral prints. Perfect for playdates and casual outings.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.05.jpeg', alt: 'Floral Print A-Line Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.05 (1).jpeg', alt: 'Floral Print A-Line Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.05 (2).jpeg', alt: 'Floral Print A-Line Dress in green' }
    ],
    variants: makeVariants('CK-ALINE01', ['Pink', 'Red', 'Green']),
    tags: ['a-line dress', 'floral print', 'casual dress', 'girls dress'],
    seoTitle: 'Floral Print A-Line Dress | Chandira Kids',
    seoDescription: 'Classic A-line dress with floral prints, perfect for casual wear.'
  },
  {
    name: 'Rose Embroidered Party Dress',
    slug: 'rose-embroidered-party-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1450,
    wholesalePrice: 950,
    wholesaleMinQty: 6,
    featured: true,
    description: 'An exquisite party dress featuring delicate rose embroidery. Perfect for weddings and formal events.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.06.jpeg', alt: 'Rose Embroidered Party Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.06 (1).jpeg', alt: 'Rose Embroidered Party Dress in red' }
    ],
    variants: makeVariants('CK-ROSE01', ['Pink', 'Red']),
    tags: ['embroidered dress', 'party dress', 'rose design', 'formal dress'],
    seoTitle: 'Rose Embroidered Party Dress | Chandira Kids',
    seoDescription: 'Exquisite rose embroidered party dress for special occasions.'
  },
  {
    name: 'Daisy Print Summer Dress',
    slug: 'daisy-print-summer-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1100,
    wholesalePrice: 700,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A cheerful daisy print dress perfect for summer days and outdoor play.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.07.jpeg', alt: 'Daisy Print Summer Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.07 (1).jpeg', alt: 'Daisy Print Summer Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.07 (2).jpeg', alt: 'Daisy Print Summer Dress in green' }
    ],
    variants: makeVariants('CK-DAISY01', ['Pink', 'Red', 'Green']),
    tags: ['daisy print', 'summer dress', 'casual dress', 'girls dress'],
    seoTitle: 'Daisy Print Summer Dress | Chandira Kids',
    seoDescription: 'Cheerful daisy print dress perfect for summer days.'
  },
  {
    name: 'Vintage Lace Dress',
    slug: 'vintage-lace-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1550,
    wholesalePrice: 1000,
    wholesaleMinQty: 6,
    featured: true,
    description: 'A beautiful vintage-inspired lace dress with timeless elegance. Perfect for special occasions.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.08.jpeg', alt: 'Vintage Lace Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.08 (1).jpeg', alt: 'Vintage Lace Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.08 (2).jpeg', alt: 'Vintage Lace Dress in green' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.08 (3).jpeg', alt: 'Vintage Lace Dress in blue' }
    ],
    variants: makeVariants('CK-LACE01', ['Pink', 'Red', 'Green', 'Blue']),
    tags: ['lace dress', 'vintage dress', 'party dress', 'formal dress'],
    seoTitle: 'Vintage Lace Dress | Chandira Kids',
    seoDescription: 'Beautiful vintage-inspired lace dress with timeless elegance.'
  },
  {
    name: 'Butterfly Garden Dress',
    slug: 'butterfly-garden-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1180,
    wholesalePrice: 780,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A whimsical butterfly-themed dress that your little girl will love. Perfect for everyday adventures.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.09.jpeg', alt: 'Butterfly Garden Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.09 (1).jpeg', alt: 'Butterfly Garden Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.09 (2).jpeg', alt: 'Butterfly Garden Dress in green' }
    ],
    variants: makeVariants('CK-BUTTERFLY01', ['Pink', 'Red', 'Green']),
    tags: ['butterfly dress', 'garden dress', 'casual dress', 'girls dress'],
    seoTitle: 'Butterfly Garden Dress | Chandira Kids',
    seoDescription: 'Whimsical butterfly-themed dress perfect for everyday adventures.'
  },
  {
    name: 'Polka Dot Party Dress',
    slug: 'polka-dot-party-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1300,
    wholesalePrice: 850,
    wholesaleMinQty: 6,
    featured: true,
    description: 'A classic polka dot party dress that never goes out of style. Perfect for birthday celebrations.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.10.jpeg', alt: 'Polka Dot Party Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.10 (1).jpeg', alt: 'Polka Dot Party Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.10 (2).jpeg', alt: 'Polka Dot Party Dress in green' }
    ],
    variants: makeVariants('CK-POLKA01', ['Pink', 'Red', 'Green']),
    tags: ['polka dot dress', 'party dress', 'classic dress', 'girls dress'],
    seoTitle: 'Polka Dot Party Dress | Chandira Kids',
    seoDescription: 'Classic polka dot party dress perfect for birthday celebrations.'
  },
  {
    name: 'Striped Play Dress',
    slug: 'striped-play-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1080,
    wholesalePrice: 680,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A fun striped dress perfect for playtime and casual outings. Comfortable and durable.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.11.jpeg', alt: 'Striped Play Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.11 (1).jpeg', alt: 'Striped Play Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.11 (2).jpeg', alt: 'Striped Play Dress in green' }
    ],
    variants: makeVariants('CK-STRIPE01', ['Pink', 'Red', 'Green']),
    tags: ['striped dress', 'play dress', 'casual dress', 'girls dress'],
    seoTitle: 'Striped Play Dress | Chandira Kids',
    seoDescription: 'Fun striped dress perfect for playtime and casual outings.'
  },
  {
    name: 'Floral Tiered Dress',
    slug: 'floral-tiered-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1400,
    wholesalePrice: 920,
    wholesaleMinQty: 6,
    featured: true,
    description: 'A beautiful tiered dress with floral patterns. Elegant and stylish for special occasions.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.12.jpeg', alt: 'Floral Tiered Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.12 (1).jpeg', alt: 'Floral Tiered Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.12 (2).jpeg', alt: 'Floral Tiered Dress in green' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.12 (3).jpeg', alt: 'Floral Tiered Dress in blue' }
    ],
    variants: makeVariants('CK-TIERED01', ['Pink', 'Red', 'Green', 'Blue']),
    tags: ['tiered dress', 'floral dress', 'party dress', 'elegant dress'],
    seoTitle: 'Floral Tiered Dress | Chandira Kids',
    seoDescription: 'Beautiful tiered dress with floral patterns for special occasions.'
  },
  {
    name: 'Heart Print Dress',
    slug: 'heart-print-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1120,
    wholesalePrice: 720,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A sweet heart-print dress that your little girl will adore. Perfect for Valentine\'s Day or everyday wear.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.13.jpeg', alt: 'Heart Print Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.13 (1).jpeg', alt: 'Heart Print Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.13 (2).jpeg', alt: 'Heart Print Dress in green' }
    ],
    variants: makeVariants('CK-HEART01', ['Pink', 'Red', 'Green']),
    tags: ['heart print', 'casual dress', 'girls dress', 'sweet dress'],
    seoTitle: 'Heart Print Dress | Chandira Kids',
    seoDescription: 'Sweet heart-print dress perfect for everyday wear.'
  },
  {
    name: 'Star Print Evening Dress',
    slug: 'star-print-evening-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1380,
    wholesalePrice: 900,
    wholesaleMinQty: 6,
    featured: true,
    description: 'A magical star-print evening dress perfect for parties and special events.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.14.jpeg', alt: 'Star Print Evening Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.14 (1).jpeg', alt: 'Star Print Evening Dress in red' }
    ],
    variants: makeVariants('CK-STAR01', ['Pink', 'Red']),
    tags: ['star print', 'evening dress', 'party dress', 'magical dress'],
    seoTitle: 'Star Print Evening Dress | Chandira Kids',
    seoDescription: 'Magical star-print evening dress for special events.'
  },
  {
    name: 'Sunny Day Dress',
    slug: 'sunny-day-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1050,
    wholesalePrice: 650,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A bright and cheerful dress perfect for sunny days and outdoor play.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.15.jpeg', alt: 'Sunny Day Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.15 (1).jpeg', alt: 'Sunny Day Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.15 (2).jpeg', alt: 'Sunny Day Dress in green' }
    ],
    variants: makeVariants('CK-SUNNY01', ['Pink', 'Red', 'Green']),
    tags: ['sunny dress', 'casual dress', 'summer dress', 'girls dress'],
    seoTitle: 'Sunny Day Dress | Chandira Kids',
    seoDescription: 'Bright and cheerful dress perfect for sunny days.'
  },
  {
    name: 'Rainbow Stripe Dress',
    slug: 'rainbow-stripe-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1150,
    wholesalePrice: 750,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A colorful rainbow stripe dress that brings joy to any day.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.16.jpeg', alt: 'Rainbow Stripe Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.16 (1).jpeg', alt: 'Rainbow Stripe Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.16 (2).jpeg', alt: 'Rainbow Stripe Dress in green' }
    ],
    variants: makeVariants('CK-RAINBOW01', ['Pink', 'Red', 'Green']),
    tags: ['rainbow dress', 'stripe dress', 'colorful dress', 'casual dress'],
    seoTitle: 'Rainbow Stripe Dress | Chandira Kids',
    seoDescription: 'Colorful rainbow stripe dress that brings joy to any day.'
  },
  {
    name: 'Princess Ball Gown',
    slug: 'princess-ball-gown',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1650,
    wholesalePrice: 1100,
    wholesaleMinQty: 6,
    featured: true,
    description: 'A stunning princess ball gown that makes every little girl feel like royalty. Perfect for special occasions.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.17.jpeg', alt: 'Princess Ball Gown in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.17 (1).jpeg', alt: 'Princess Ball Gown in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.17 (2).jpeg', alt: 'Princess Ball Gown in green' }
    ],
    variants: makeVariants('CK-PRINCESS01', ['Pink', 'Red', 'Green']),
    tags: ['princess dress', 'ball gown', 'party dress', 'formal dress'],
    seoTitle: 'Princess Ball Gown | Chandira Kids',
    seoDescription: 'Stunning princess ball gown for special occasions.'
  },
  {
    name: 'Garden Party Dress',
    slug: 'garden-party-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1420,
    wholesalePrice: 940,
    wholesaleMinQty: 6,
    featured: true,
    description: 'An elegant garden party dress with beautiful floral details. Perfect for outdoor celebrations.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.18.jpeg', alt: 'Garden Party Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.18 (1).jpeg', alt: 'Garden Party Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.18 (2).jpeg', alt: 'Garden Party Dress in green' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.18 (3).jpeg', alt: 'Garden Party Dress in blue' }
    ],
    variants: makeVariants('CK-GARDEN02', ['Pink', 'Red', 'Green', 'Blue']),
    tags: ['garden dress', 'party dress', 'floral dress', 'elegant dress'],
    seoTitle: 'Garden Party Dress | Chandira Kids',
    seoDescription: 'Elegant garden party dress with beautiful floral details.'
  },
  {
    name: 'Cute Animal Print Dress',
    slug: 'cute-animal-print-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1180,
    wholesalePrice: 780,
    wholesaleMinQty: 6,
    featured: false,
    description: 'An adorable animal print dress that kids will love. Perfect for everyday adventures.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.19.jpeg', alt: 'Cute Animal Print Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.19 (1).jpeg', alt: 'Cute Animal Print Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.19 (2).jpeg', alt: 'Cute Animal Print Dress in green' }
    ],
    variants: makeVariants('CK-ANIMAL01', ['Pink', 'Red', 'Green']),
    tags: ['animal print', 'casual dress', 'cute dress', 'girls dress'],
    seoTitle: 'Cute Animal Print Dress | Chandira Kids',
    seoDescription: 'Adorable animal print dress perfect for everyday adventures.'
  },
  {
    name: 'Simple Elegant Dress',
    slug: 'simple-elegant-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1080,
    wholesalePrice: 680,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A simple yet elegant dress perfect for any occasion. Versatile and comfortable.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.20.jpeg', alt: 'Simple Elegant Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.20 (1).jpeg', alt: 'Simple Elegant Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.20 (2).jpeg', alt: 'Simple Elegant Dress in green' }
    ],
    variants: makeVariants('CK-SIMPLE01', ['Pink', 'Red', 'Green']),
    tags: ['simple dress', 'elegant dress', 'casual dress', 'versatile dress'],
    seoTitle: 'Simple Elegant Dress | Chandira Kids',
    seoDescription: 'Simple yet elegant dress perfect for any occasion.'
  },
  {
    name: 'Floral Ruffle Dress',
    slug: 'floral-ruffle-dress',
    category: 'Party Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1480,
    wholesalePrice: 980,
    wholesaleMinQty: 6,
    featured: true,
    description: 'A beautiful floral ruffle dress with delicate details. Perfect for special occasions.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.21.jpeg', alt: 'Floral Ruffle Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.21 (1).jpeg', alt: 'Floral Ruffle Dress in red' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.21 (2).jpeg', alt: 'Floral Ruffle Dress in green' }
    ],
    variants: makeVariants('CK-RUFFLE01', ['Pink', 'Red', 'Green']),
    tags: ['ruffle dress', 'floral dress', 'party dress', 'elegant dress'],
    seoTitle: 'Floral Ruffle Dress | Chandira Kids',
    seoDescription: 'Beautiful floral ruffle dress with delicate details.'
  },
  {
    name: 'Check Pattern Dress',
    slug: 'check-pattern-dress',
    category: 'Casual Dresses',
    ageCategory: 'Little Girls (4-7 years)',
    ageRange: 'Sizes S, M, L',
    salePrice: 1120,
    wholesalePrice: 720,
    wholesaleMinQty: 6,
    featured: false,
    description: 'A classic check pattern dress with timeless appeal. Perfect for everyday wear.',
    images: [
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.22.jpeg', alt: 'Check Pattern Dress in pink' },
      { url: '/images/products/product/WhatsApp Image 2026-06-21 at 11.04.22 (1).jpeg', alt: 'Check Pattern Dress in red' }
    ],
    variants: makeVariants('CK-CHECK01', ['Pink', 'Red']),
    tags: ['check pattern', 'casual dress', 'classic dress', 'girls dress'],
    seoTitle: 'Check Pattern Dress | Chandira Kids',
    seoDescription: 'Classic check pattern dress with timeless appeal.'
  }
];
