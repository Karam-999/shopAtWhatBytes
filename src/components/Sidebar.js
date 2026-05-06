'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: 'Jewelery', value: 'jewelery' },
];

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const maxPrice = Number(searchParams.get('price')) || 100000;

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === 'category' && value === 'all') {
      params.delete('category');
    } else {
      params.set(key, value);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <aside id="sidebar-filters" className="w-full lg:w-64 shrink-0 text-white">
      <div className="rounded-xl shadow-sm border border-gray-200 p-5" style={{ backgroundColor: '#0758A8' }}>
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map(cat => (
              <label key={cat.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={activeCategory === cat.value}
                  onChange={() => updateFilters('category', cat.value)}
                  className="w-4 h-4 text-white cursor-pointer"
                />
                <span className={`text-sm transition-colors ${activeCategory === cat.value ? 'text-white font-medium' : 'text-white'}`}>
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Price</h3>
          <input
            type="range"
            min="0"
            max="100000"
            step="500"
            value={maxPrice}
            onChange={(e) => updateFilters('price', e.target.value)}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-white">
            <span>₹0</span>
            <span className="font-medium">₹{maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
