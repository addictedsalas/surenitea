import { getProducts } from '@/lib/shopify';
import ShopHero from '@/components/sections/ShopHero';
import ProductGrid from '@/components/sections/ProductGrid';

export default async function ShopPage() {
  const products = await getProducts(50);

  return (
    <div className="min-h-screen bg-white">
      <ShopHero />
      <ProductGrid products={products} />
    </div>
  );
}
