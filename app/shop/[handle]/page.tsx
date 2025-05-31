import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductByHandle } from '@/lib/shopify';
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.priceRange.minVariantPrice.currencyCode,
  }).format(price);

  const firstVariant = product.variants.edges[0]?.node;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {product.featuredImage && (
              <div className="relative h-96 lg:h-[600px] w-full rounded-lg overflow-hidden">
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            {product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.slice(0, 4).map((edge, index) => (
                  <div key={index} className="relative h-24 rounded-md overflow-hidden">
                    <Image
                      src={edge.node.url}
                      alt={edge.node.altText || `${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-surenitea-700 mb-2 font-recoleta">
                {product.title}
              </h1>
              <p className="text-2xl font-bold text-surenitea-700">{formattedPrice}</p>
            </div>

            <div className="prose prose-surenitea max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            </div>

            {/* Variant Selector (if multiple variants) */}
            {product.variants.edges.length > 1 && (
              <div className="space-y-2">
                <label className="font-bold text-surenitea-700">Options</label>
                <select className="w-full p-3 border border-surenitea-700 rounded-md focus:outline-none focus:ring-2 focus:ring-coral">
                  {product.variants.edges.map((edge) => (
                    <option key={edge.node.id} value={edge.node.id}>
                      {edge.node.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Add to Cart */}
            {firstVariant && (
              <AddToCartButton
                product={product}
                variantId={firstVariant.id}
                className="w-full py-3 text-lg"
              />
            )}

            {/* Availability */}
            <div className="border-t pt-4">
              <p className="text-sm text-surenitea-700">
                {product.availableForSale ? (
                  <span className="text-green-600">✓ In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
