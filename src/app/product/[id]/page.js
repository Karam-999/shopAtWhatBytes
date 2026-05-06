'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ProductActions from './ProductActions';
import { formatINR } from '@/lib/currency';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 animate-pulse">
            <div className="bg-gray-100 min-h-[350px]" />
            <div className="p-6 md:p-8 space-y-4">
              <div className="h-6 bg-gray-100 rounded w-24" />
              <div className="h-8 bg-gray-100 rounded w-3/4" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-10 bg-gray-100 rounded w-32" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-500">The product you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const fullStars = Math.floor(product.rating.rate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="bg-white flex items-center justify-center p-8 md:p-12 min-h-[350px]">
            <Image
              src={product.image}
              alt={product.title}
              width={350}
              height={350}
              className="object-contain max-h-[350px]"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-3 capitalize">
              {product.category}
            </span>

            <h1 id="product-title" className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-1.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < fullStars ? 'text-amber-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 ml-1">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-5">
              {formatINR(product.price)}
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              {product.description}
            </p>

            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
