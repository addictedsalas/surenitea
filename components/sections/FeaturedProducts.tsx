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
    <section className="py-24" style={{ background: 'linear-gradient(to bottom right, var(--color-surenitea-50), white, var(--color-surenitea-100))' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light font-recoleta mb-4" style={{ color: 'var(--color-surenitea-700)' }}>
            {title}
          </h2>
          <p className="text-lg font-sofia font-light max-w-2xl mx-auto" style={{ color: 'var(--color-surenitea-600)' }}>
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="product-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'var(--color-surenitea-50)', border: '1px solid transparent' }}>
              <ClientWrapper product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/shop"
            className="btn-secondary inline-block transform hover:-translate-y-1 hover:shadow-lg"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
