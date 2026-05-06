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
  const maxPrice = Number(searchParams.get('price')) || 1000;

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
    <aside id="sidebar-filters" className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map(cat => (
              <label
                key={cat.value}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="category"
                  checked={activeCategory === cat.value}
                  onChange={() => updateFilters('category', cat.value)}
                  className="w-4 h-4 text-blue-600 accent-blue-600 cursor-pointer"
                />
                <span className={`text-sm transition-colors ${activeCategory === cat.value ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-900'}`}>
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Price</h3>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={maxPrice}
            onChange={(e) => updateFilters('price', e.target.value)}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span className="font-medium text-gray-900">₹{maxPrice}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
