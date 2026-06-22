import { useState } from 'react';
import { FiMaximize, FiArrowRight, FiX } from 'react-icons/fi';

const sizeData = {
  infants: {
    ageRange: '0-12 months',
    sizes: [
      { size: '0-3 months', height: { min: 50, max: 56 }, weight: { min: 3, max: 6 }, chest: { min: 40, max: 43 } },
      { size: '3-6 months', height: { min: 56, max: 62 }, weight: { min: 6, max: 8 }, chest: { min: 43, max: 46 } },
      { size: '6-9 months', height: { min: 62, max: 68 }, weight: { min: 8, max: 9.5 }, chest: { min: 46, max: 48 } },
      { size: '9-12 months', height: { min: 68, max: 74 }, weight: { min: 9.5, max: 11 }, chest: { min: 48, max: 50 } }
    ]
  },
  toddlers: {
    ageRange: '1-3 years',
    sizes: [
      { size: '12-18 months', height: { min: 74, max: 80 }, weight: { min: 11, max: 12.5 }, chest: { min: 50, max: 52 } },
      { size: '18-24 months', height: { min: 80, max: 86 }, weight: { min: 12.5, max: 14 }, chest: { min: 52, max: 54 } },
      { size: '2 years', height: { min: 86, max: 92 }, weight: { min: 14, max: 16 }, chest: { min: 54, max: 56 } },
      { size: '3 years', height: { min: 92, max: 98 }, weight: { min: 16, max: 18 }, chest: { min: 56, max: 58 } }
    ]
  },
  littleGirls: {
    ageRange: '4-7 years',
    sizes: [
      { size: '4 years', height: { min: 98, max: 104 }, weight: { min: 18, max: 21 }, chest: { min: 58, max: 60 } },
      { size: '5 years', height: { min: 104, max: 110 }, weight: { min: 21, max: 23 }, chest: { min: 60, max: 62 } },
      { size: '6 years', height: { min: 110, max: 116 }, weight: { min: 23, max: 26 }, chest: { min: 62, max: 64 } },
      { size: '7 years', height: { min: 116, max: 122 }, weight: { min: 26, max: 29 }, chest: { min: 64, max: 66 } }
    ]
  },
  kids: {
    ageRange: '8-12 years',
    sizes: [
      { size: '8 years', height: { min: 122, max: 128 }, weight: { min: 29, max: 32 }, chest: { min: 66, max: 68 } },
      { size: '10 years', height: { min: 128, max: 134 }, weight: { min: 32, max: 37 }, chest: { min: 68, max: 70 } },
      { size: '12 years', height: { min: 134, max: 140 }, weight: { min: 37, max: 42 }, chest: { min: 70, max: 72 } }
    ]
  },
  teenGirls: {
    ageRange: '13-15 years',
    sizes: [
      { size: '13 years', height: { min: 140, max: 146 }, weight: { min: 42, max: 47 }, chest: { min: 72, max: 74 } },
      { size: '14 years', height: { min: 146, max: 152 }, weight: { min: 47, max: 52 }, chest: { min: 74, max: 76 } },
      { size: '15 years', height: { min: 152, max: 158 }, weight: { min: 52, max: 57 }, chest: { min: 76, max: 78 } }
    ]
  }
};

export default function SizeRecommendation({ onClose, onSelectSize }) {
  const [ageCategory, setAgeCategory] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [recommendedSize, setRecommendedSize] = useState(null);

  const calculateSize = () => {
    if (!ageCategory || !height || !weight) return;

    const categoryData = sizeData[ageCategory];
    const heightNum = Number(height);
    const weightNum = Number(weight);

    let bestMatch = null;
    let bestScore = 0;

    categoryData.sizes.forEach((size) => {
      let score = 0;

      // Height match
      if (heightNum >= size.height.min && heightNum <= size.height.max) {
        score += 2;
      } else if (heightNum >= size.height.min - 5 && heightNum <= size.height.max + 5) {
        score += 1;
      }

      // Weight match
      if (weightNum >= size.weight.min && weightNum <= size.weight.max) {
        score += 2;
      } else if (weightNum >= size.weight.min - 2 && weightNum <= size.weight.max + 2) {
        score += 1;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = size;
      }
    });

    setRecommendedSize(bestMatch);
  };

  const handleSelect = () => {
    if (recommendedSize && onSelectSize) {
      onSelectSize(recommendedSize.size);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-brand-rose flex items-center gap-2">
            <FiMaximize className="h-5 w-5" />
            Size Recommendation
          </h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-blush">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Age Category</label>
            <select
              className="w-full"
              value={ageCategory}
              onChange={(e) => setAgeCategory(e.target.value)}
            >
              <option value="">Select age category</option>
              <option value="infants">Infants (0-12 months)</option>
              <option value="toddlers">Toddlers (1-3 years)</option>
              <option value="littleGirls">Little Girls (4-7 years)</option>
              <option value="kids">Kids (8-12 years)</option>
              <option value="teenGirls">Teen Girls (13-15 years)</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Height (cm)</label>
              <input
                className="w-full"
                type="number"
                placeholder="e.g., 100"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Weight (kg)</label>
              <input
                className="w-full"
                type="number"
                placeholder="e.g., 18"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>

          <button
            className="btn-primary w-full"
            onClick={calculateSize}
            disabled={!ageCategory || !height || !weight}
          >
            Find My Size
          </button>

          {recommendedSize && (
            <div className="rounded-2xl bg-gradient-to-br from-brand-blush to-brand-cream p-5">
              <h3 className="font-bold text-brand-rose mb-3">Recommended Size</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-ink">{recommendedSize.size}</p>
                  <p className="text-sm text-muted">
                    Height: {recommendedSize.height.min}-{recommendedSize.height.max} cm
                  </p>
                  <p className="text-sm text-muted">
                    Weight: {recommendedSize.weight.min}-{recommendedSize.weight.max} kg
                  </p>
                </div>
                <button
                  className="btn-primary"
                  onClick={handleSelect}
                >
                  <FiArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-xs text-muted">
                * This is an estimate. For best fit, please refer to our detailed size guide.
              </p>
            </div>
          )}

          <div className="text-center">
            <a className="text-sm text-brand-rose hover:underline" href="/size-guide" target="_blank">
              View detailed size guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
