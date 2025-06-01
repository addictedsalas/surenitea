import Link from 'next/link';
import ClientWrapper from '@/app/shop/ClientWrapper';
import { Product } from '@/lib/shopify';

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function FeaturedProducts({ 
  products, 
  title = "Featured Collections",
  subtitle = "Discover our carefully curated selection of premium teas from around the world"
}: FeaturedProductsProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0" style={{ 
        background: 'linear-gradient(135deg, var(--color-peach) 0%, var(--color-surenitea-50) 50%, var(--color-coral) 100%)',
        opacity: 0.1
      }} />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ 
        background: 'var(--color-coral)',
        opacity: 0.1,
        transform: 'translate(50%, -50%)'
      }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ 
        background: 'var(--color-surenitea-300)',
        opacity: 0.1,
        transform: 'translate(-50%, 50%)'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-recoleta mb-4" style={{ color: 'var(--color-surenitea-700)' }}>
            {title}
          </h2>
          <p className="text-lg font-sofia font-light max-w-2xl mx-auto" style={{ color: 'var(--color-surenitea-600)' }}>
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {products.map((product) => (
            <ClientWrapper key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-sofia font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-white"
            style={{ 
              backgroundColor: 'var(--color-coral)'
            }}
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
