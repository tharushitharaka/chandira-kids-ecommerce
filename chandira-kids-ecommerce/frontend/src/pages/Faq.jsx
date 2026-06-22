import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPhone, FiMessageCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const faqCategories = [
  {
    category: 'Ordering & Payment',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'You can place an order directly through our website by adding items to your cart and proceeding to checkout. Alternatively, you can order via WhatsApp for personalized assistance.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept cash on delivery (COD), bank transfers, and major credit/debit cards. For wholesale orders, we also accept bank transfers and payment plans.'
      },
      {
        q: 'Can I modify my order after placing it?',
        a: 'Orders can be modified within 24 hours of placement by contacting us via WhatsApp. After 24 hours or once shipped, modifications cannot be made.'
      },
      {
        q: 'Do you offer wholesale pricing?',
        a: 'Yes! We offer wholesale pricing for bulk orders. Wholesale discounts are available for orders of 10+ items. Contact us via WhatsApp for wholesale inquiries.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Delivery times vary by location: Colombo & suburbs (1-2 business days), major cities (2-3 business days), island-wide (3-5 business days).'
      },
      {
        q: 'How much is shipping?',
        a: 'Shipping costs: Colombo & suburbs (LKR 250), major cities (LKR 350), island-wide (LKR 450). Free shipping on orders over LKR 10,000.'
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within Sri Lanka. For international orders, please contact us directly to discuss shipping options.'
      },
      {
        q: 'Can I track my order?',
        a: 'Yes! You\'ll receive tracking updates via WhatsApp once your order is shipped. You can also contact us anytime for order status updates.'
      }
    ]
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 7 days of delivery for unworn items with original tags. Items must be in original condition. Sale items and accessories cannot be returned.'
      },
      {
        q: 'How do I initiate a return?',
        a: 'Contact us via WhatsApp within 7 days of delivery with your order number and reason for return. We\'ll guide you through the return process.'
      },
      {
        q: 'Can I exchange for a different size?',
        a: 'Yes, exchanges are allowed subject to product availability. If your preferred size is unavailable, we\'ll offer a refund or store credit.'
      },
      {
        q: 'Who pays for return shipping?',
        a: 'Return shipping costs are covered by the customer unless the item is defective or incorrect. For defective items, we cover return shipping.'
      }
    ]
  },
  {
    category: 'Sizing & Products',
    questions: [
      {
        q: 'How do I choose the right size?',
        a: 'Refer to our comprehensive size guide for detailed measurements. We recommend measuring your child before ordering. If unsure, size up for longer wear.'
      },
      {
        q: 'What materials are your clothes made from?',
        a: 'We use high-quality, child-safe materials including cotton, cotton blends, and breathable fabrics. All materials are selected for comfort and durability.'
      },
      {
        q: 'How do I care for the clothes?',
        a: 'Most items can be machine washed in cold water with gentle detergent. Air dry when possible to prevent shrinking. Refer to individual care labels for specific instructions.'
      },
      {
        q: 'Are the colors accurate to the photos?',
        a: 'We strive to display accurate colors, but slight variations may occur due to monitor settings and lighting. Contact us if you have specific color questions.'
      }
    ]
  },
  {
    category: 'Account & Services',
    questions: [
      {
        q: 'Do I need an account to shop?',
        a: 'No, you can shop as a guest. However, creating an account allows you to track orders, save wishlists, and enjoy faster checkout.'
      },
      {
        q: 'How do I create an account?',
        a: 'Click "Sign in" in the header and select "Create account". Fill in your details and you\'re ready to shop!'
      },
      {
        q: 'What are the benefits of wholesale ordering?',
        a: 'Wholesale customers enjoy discounted pricing, priority processing, and dedicated customer support. Perfect for boutiques and resellers.'
      },
      {
        q: 'Do you offer gift wrapping?',
        a: 'Yes! Gift wrapping is available for an additional charge. Select the gift wrapping option at checkout.'
      }
    ]
  }
];

export default function Faq() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };

  const toggleQuestion = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };

  return (
    <section className="page-shell max-w-4xl">
      <SEO title="FAQ | Chandira Kids" description="Frequently asked questions about ordering, shipping, returns, sizing, and more." />
      
      <div className="page-hero mb-10 text-center">
        <p className="section-label">Help Center</p>
        <h1 className="section-title mt-2">Frequently Asked Questions</h1>
        <p className="mx-auto mt-3 max-w-2xl text-body text-muted">
          Find answers to common questions about ordering, shipping, returns, and more. Can't find what you're looking for? Contact us!
        </p>
      </div>

      <div className="mb-12 space-y-4">
        {faqCategories.map((category) => (
          <div key={category.category} className="soft-card">
            <button
              className="flex w-full items-center justify-between p-5 text-left"
              onClick={() => toggleCategory(category.category)}
            >
              <h2 className="text-lg font-bold text-brand-rose">{category.category}</h2>
              {openCategory === category.category ? (
                <FiChevronUp className="h-5 w-5 text-brand-pink" />
              ) : (
                <FiChevronDown className="h-5 w-5 text-brand-pink" />
              )}
            </button>
            {openCategory === category.category && (
              <div className="border-t border-brand-blush p-5">
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <div key={index}>
                      <button
                        className="flex w-full items-center justify-between text-left"
                        onClick={() => toggleQuestion(`${category.category}-${index}`)}
                      >
                        <h3 className="font-semibold text-ink">{item.q}</h3>
                        {openQuestion === `${category.category}-${index}` ? (
                          <FiChevronUp className="h-4 w-4 text-muted shrink-0" />
                        ) : (
                          <FiChevronDown className="h-4 w-4 text-muted shrink-0" />
                        )}
                      </button>
                      {openQuestion === `${category.category}-${index}` && (
                        <p className="mt-2 text-body-sm text-muted">{item.a}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="soft-card">
          <h2 className="text-xl font-bold text-brand-rose mb-4">Still Have Questions?</h2>
          <p className="mb-4 text-body-sm text-muted">
            Can't find the answer you're looking for? Our customer service team is here to help.
          </p>
          <a
            className="btn-primary flex items-center justify-center gap-2"
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent('Hello Chandira Kids,\n\nI have a question.')}`}
            target="_blank"
            rel="noreferrer"
          >
            <FiPhone className="h-5 w-5" />
            Contact via WhatsApp
          </a>
        </div>

        <div className="soft-card">
          <h2 className="text-xl font-bold text-brand-rose mb-4">Quick Links</h2>
          <div className="space-y-2">
            <Link className="block text-body-sm font-semibold text-brand-rose hover:underline" to="/size-guide">
              Size Guide
            </Link>
            <Link className="block text-body-sm font-semibold text-brand-rose hover:underline" to="/shipping">
              Shipping Info
            </Link>
            <Link className="block text-body-sm font-semibold text-brand-rose hover:underline" to="/returns">
              Returns & Refunds
            </Link>
            <Link className="block text-body-sm font-semibold text-brand-rose hover:underline" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand-rose to-brand-pink p-8 text-center text-white">
        <h2 className="text-2xl font-bold">We're Here to Help</h2>
        <p className="mt-2 text-white/90">
          Reach out anytime via WhatsApp for immediate assistance with orders, sizing, or any questions.
        </p>
      </div>
    </section>
  );
}
