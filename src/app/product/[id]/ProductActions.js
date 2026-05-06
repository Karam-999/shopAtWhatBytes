'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mt-auto space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-900">Quantity:</span>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4 text-gray-500" />
          </button>
          <span className="px-4 py-2 text-sm font-medium text-gray-900 min-w-[40px] text-center border-x border-gray-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="px-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        id="product-add-to-cart"
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <ShoppingCart className="w-4 h-4" />
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </button>

      {/* Back to Products */}
      <button
        onClick={() => router.push('/')}
        className="w-full py-2.5 rounded-lg text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        ← Continue Shopping
      </button>
    </div>
  );
}
