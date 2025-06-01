import { notFound } from 'next/navigation';
import { getProductByHandle, getProducts } from '@/lib/shopify';
import ProductDetail from '@/components/sections/ProductDetail';
import RelatedProducts from '@/components/sections/RelatedProducts';

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Get related products (for now, just get some products)
  const allProducts = await getProducts(8);
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
