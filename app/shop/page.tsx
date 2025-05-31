import { getProducts } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import ClientWrapper from './ClientWrapper';

export default async function ShopPage() {
  const products = await getProducts(50);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-surenitea-700 mb-8 font-recoleta">Shop</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ClientWrapper key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surenitea-700 opacity-60">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
