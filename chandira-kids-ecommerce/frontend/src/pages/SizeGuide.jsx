import { FiMaximize, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const sizeCharts = {
  infants: {
    title: 'Infants (0-12 months)',
    description: 'Soft, stretchy fabrics for comfort and easy diaper changes',
    sizes: [
      { size: '0-3 months', height: '50-56 cm', weight: '3-6 kg', chest: '40-43 cm' },
      { size: '3-6 months', height: '56-62 cm', weight: '6-8 kg', chest: '43-46 cm' },
      { size: '6-9 months', height: '62-68 cm', weight: '8-9.5 kg', chest: '46-48 cm' },
      { size: '9-12 months', height: '68-74 cm', weight: '9.5-11 kg', chest: '48-50 cm' }
    ]
  },
  toddlers: {
    title: 'Toddlers (1-3 years)',
    description: 'Easy-to-wear styles with elastic waistbands for growing kids',
    sizes: [
      { size: '12-18 months', height: '74-80 cm', weight: '11-12.5 kg', chest: '50-52 cm' },
      { size: '18-24 months', height: '80-86 cm', weight: '12.5-14 kg', chest: '52-54 cm' },
      { size: '2 years', height: '86-92 cm', weight: '14-16 kg', chest: '54-56 cm' },
      { size: '3 years', height: '92-98 cm', weight: '16-18 kg', chest: '56-58 cm' }
    ]
  },
  littleGirls: {
    title: 'Little Girls (4-7 years)',
    description: 'Comfortable fits with adjustable waistbands for active play',
    sizes: [
      { size: '4 years', height: '98-104 cm', weight: '18-21 kg', chest: '58-60 cm' },
      { size: '5 years', height: '104-110 cm', weight: '21-23 kg', chest: '60-62 cm' },
      { size: '6 years', height: '110-116 cm', weight: '23-26 kg', chest: '62-64 cm' },
      { size: '7 years', height: '116-122 cm', weight: '26-29 kg', chest: '64-66 cm' }
    ]
  },
  kids: {
    title: 'Kids (8-12 years)',
    description: 'Quality fabrics that withstand active play and school activities',
    sizes: [
      { size: '8 years', height: '122-128 cm', weight: '29-32 kg', chest: '66-68 cm' },
      { size: '10 years', height: '128-134 cm', weight: '32-37 kg', chest: '68-70 cm' },
      { size: '12 years', height: '134-140 cm', weight: '37-42 kg', chest: '70-72 cm' }
    ]
  },
  teenGirls: {
    title: 'Teen Girls (13-15 years)',
    description: 'Fashion-forward styles that are still age-appropriate',
    sizes: [
      { size: '13 years', height: '140-146 cm', weight: '42-47 kg', chest: '72-74 cm' },
      { size: '14 years', height: '146-152 cm', weight: '47-52 kg', chest: '74-76 cm' },
      { size: '15 years', height: '152-158 cm', weight: '52-57 kg', chest: '76-78 cm' }
    ]
  }
};

const tips = [
  {
    icon: FiMaximize,
    title: 'Measure Your Child',
    text: 'For best results, measure your child\'s height, chest, and weight before ordering'
  },
  {
    icon: FiMaximize,
    title: 'Size Up for Growth',
    text: 'Children grow quickly, so consider sizing up for longer wear'
  },
  {
    icon: FiMaximize,
    title: 'Check Product Details',
    text: 'Some items may have specific sizing recommendations in the product description'
  },
  {
    icon: FiMaximize,
    title: 'Consider Fit Preference',
    text: 'If you prefer a looser fit, size up. For a fitted look, choose true to size'
  }
];

export default function SizeGuide() {
  return (
    <section className="page-shell max-w-5xl">
      <SEO title="Size Guide | Chandira Kids" description="Find the perfect fit for your child with our comprehensive size guide for girls aged 0-15 years." />
      
      <div className="page-hero mb-10 text-center">
        <p className="section-label">Fit Guide</p>
        <h1 className="section-title mt-2">Size Guide</h1>
        <p className="mx-auto mt-3 max-w-2xl text-body text-muted">
          Find the perfect fit for your little one with our comprehensive size chart. 
          Measure your child before ordering for the best results.
        </p>
      </div>

      <div className="mb-12 grid gap-8">
        {Object.entries(sizeCharts).map(([key, { title, description, sizes }]) => (
          <div key={key} className="soft-card">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-brand-rose">{title}</h2>
              <p className="mt-1 text-body-sm text-muted">{description}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-brand-blush">
                    <th className="px-4 py-3 text-sm font-bold text-ink">Size</th>
                    <th className="px-4 py-3 text-sm font-bold text-ink">Height</th>
                    <th className="px-4 py-3 text-sm font-bold text-ink">Weight</th>
                    <th className="px-4 py-3 text-sm font-bold text-ink">Chest</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((size, index) => (
                    <tr key={index} className="border-b border-brand-blush/50 last:border-0">
                      <td className="px-4 py-3 font-semibold text-brand-rose">{size.size}</td>
                      <td className="px-4 py-3 text-body-sm text-muted">{size.height}</td>
                      <td className="px-4 py-3 text-body-sm text-muted">{size.weight}</td>
                      <td className="px-4 py-3 text-body-sm text-muted">{size.chest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="section-title mb-6">Sizing Tips</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-4 rounded-2xl bg-brand-blush/30 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-pink text-white">
                <tip.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-ink">{tip.title}</h3>
                <p className="mt-1 text-body-sm text-muted">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-brand-rose to-brand-pink p-8 text-white shadow-card">
        <h2 className="text-2xl font-bold">Still unsure about sizing?</h2>
        <p className="mt-2 text-white/90">
          Our team is here to help you find the perfect fit. Contact us via WhatsApp for personalized sizing assistance.
        </p>
        <a
          className="btn-primary mt-4 inline-flex bg-white text-brand-rose hover:bg-brand-blush"
          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '94771234567'}?text=${encodeURIComponent('Hello Chandira Kids,\n\nI need help with sizing for my child.')}`}
          target="_blank"
          rel="noreferrer"
        >
          Get Sizing Help <FiArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>

      <div className="mt-8 text-center">
        <Link className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-rose hover:underline" to="/shop">
          <FiArrowRight className="h-4 w-4" /> Shop with confidence
        </Link>
      </div>
    </section>
  );
}
