'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { formatINR } from '@/lib/currency';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven&#39;t added anything yet.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({cartCount} items)</h1>

      <div className="space-y-4 mb-8">
        {cart.map(item => (
          <div
            key={item.id}
            id={`cart-item-${item.id}`}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4 items-center"
          >
            <Link href={`/product/${item.id}`} className="shrink-0">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center p-2 border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="object-contain max-h-16"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/product/${item.id}`}>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 capitalize mt-0.5">{item.category}</p>
              <p className="text-sm font-bold text-gray-900 mt-1">{formatINR(item.price)}</p>
            </div>

            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shrink-0">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5 text-gray-500" />
              </button>
              <span className="px-3 py-1.5 text-sm font-medium text-gray-900 min-w-[36px] text-center border-x border-gray-200">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-gray-500" />
              </button>
            </div>

            <div className="text-right shrink-0 hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{formatINR(item.price * item.quantity)}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-300 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal ({cartCount} items)</span>
            <span className="text-gray-900 font-medium">{formatINR(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">{formatINR(cartTotal)}</span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => toast.info('Checkout has not been implemented yet')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={clearCart}
            className="px-6 py-3 rounded-lg text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
