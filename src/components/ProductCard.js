'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { formatINR } from '@/lib/currency';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < fullStars ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ));
  };

  return (
    <Link
      href={`/product/${product.id}`}
      id={`product-card-${product.id}`}
      className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
    >
      <div className="relative bg-white p-6 flex items-center justify-center h-52">
        <Image
          src={product.image}
          alt={product.title}
          width={160}
          height={160}
          className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1 leading-snug">
          {product.title}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating.rate)}
          <span className="text-xs text-gray-500 ml-1">({product.rating.count})</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-gray-900">{formatINR(product.price)}</span>
          <button
            onClick={handleAdd}
            id={`add-to-cart-${product.id}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              added ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
