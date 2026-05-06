'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import { PackageSearch } from 'lucide-react';

export default function HomeContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category') || 'all';
  const maxPrice = Number(searchParams.get('price')) || 100000;
  const search = searchParams.get('search') || '';
  const hasSearch = searchParams.has('search');

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter(product => {
    const matchCategory = category === 'all' || product.category === category;
    const matchPrice = (product.price * 84) <= maxPrice;
    const matchSearch = !search || product.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchPrice && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Product Listing</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Sidebar />

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-52 bg-gray-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-gray-100 rounded w-16" />
                      <div className="h-8 bg-gray-100 rounded w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div>
              {hasSearch && (
                <>
                  <div className="text-lg font-semibold text-center text-gray-900 mb-2">
                    Found {filtered.length} product{filtered.length > 1 ? 's' : ''} for &quot;{search}&quot;
                  </div>
                  <button
                    onClick={() => router.push('/')}
                    className="w-auto mb-4 px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    ← Go back
                  </button>
                </>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-2">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <PackageSearch className="w-16 h-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-500 mb-2">No products found</h2>
              <p className="text-sm text-gray-500">Try adjusting your filters or search term.</p>
              <button
                onClick={() => router.push('/')}
                className="w-auto mt-4 px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                ← Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
