import Image from 'next/image';
import ProductActions from './ProductActions';
import { formatINR } from '@/lib/currency';

export default async function ProductPage({ params }) {
  const { id } = await params;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
        <p className="text-gray-500">The product you&#39;re looking for doesn&#39;t exist.</p>
      </div>
    );
  }

  const product = await res.json();
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
