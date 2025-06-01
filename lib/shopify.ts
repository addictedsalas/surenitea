import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { z } from 'zod';

// Initialize Shopify Storefront API client
const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2025-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

// Type definitions
export const MoneySchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const ProductImageSchema = z.object({
  url: z.string(),
  altText: z.string().nullable(),
});

export const ProductVariantSchema = z.object({
  id: z.string(),
  title: z.string(),
  availableForSale: z.boolean(),
  priceV2: MoneySchema,
});

export const ProductSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  descriptionHtml: z.string(),
  featuredImage: ProductImageSchema.nullable(),
  images: z.object({
    edges: z.array(z.object({
      node: ProductImageSchema,
    })),
  }),
  priceRange: z.object({
    minVariantPrice: MoneySchema,
  }),
  variants: z.object({
    edges: z.array(z.object({
      node: ProductVariantSchema,
    })),
  }),
  availableForSale: z.boolean(),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

// Mock products for development when Shopify is not configured
const mockProducts: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    title: 'Earl Grey Supreme',
    handle: 'earl-grey-supreme',
    description: 'A classic black tea blend with bergamot oil, creating a distinctive citrusy flavor.',
    descriptionHtml: '<p>A classic black tea blend with bergamot oil, creating a distinctive citrusy flavor.</p>',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
      altText: 'Earl Grey Tea'
    },
    priceRange: {
      minVariantPrice: {
        amount: '24.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
          altText: 'Earl Grey Tea'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/1',
          title: 'Default',
          availableForSale: true,
          priceV2: {
            amount: '24.99',
            currencyCode: 'USD'
          }
        }
      }]
    }
  },
  {
    id: 'gid://shopify/Product/2',
    title: 'Jasmine Phoenix Pearls',
    handle: 'jasmine-phoenix-pearls',
    description: 'Hand-rolled green tea pearls scented with jasmine flowers for a delicate floral aroma.',
    descriptionHtml: '<p>Hand-rolled green tea pearls scented with jasmine flowers for a delicate floral aroma.</p>',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800',
      altText: 'Jasmine Tea'
    },
    priceRange: {
      minVariantPrice: {
        amount: '42.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=800',
          altText: 'Jasmine Tea'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/2',
          title: 'Default',
          availableForSale: true,
          priceV2: {
            amount: '42.99',
            currencyCode: 'USD'
          }
        }
      }]
    }
  },
  {
    id: 'gid://shopify/Product/3',
    title: 'Himalayan Gold',
    handle: 'himalayan-gold',
    description: 'A rare black tea from the high altitudes of Nepal with honey and fruity notes.',
    descriptionHtml: '<p>A rare black tea from the high altitudes of Nepal with honey and fruity notes.</p>',
    availableForSale: false,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800',
      altText: 'Himalayan Gold Tea'
    },
    priceRange: {
      minVariantPrice: {
        amount: '68.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800',
          altText: 'Himalayan Gold Tea'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/3',
          title: 'Default',
          availableForSale: false,
          priceV2: {
            amount: '68.99',
            currencyCode: 'USD'
          }
        }
      }]
    }
  },
  {
    id: 'gid://shopify/Product/4',
    title: 'Chamomile Dreams',
    handle: 'chamomile-dreams',
    description: 'Soothing chamomile flowers perfect for evening relaxation and better sleep.',
    descriptionHtml: '<p>Soothing chamomile flowers perfect for evening relaxation and better sleep.</p>',
    availableForSale: true,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=800',
      altText: 'Chamomile Tea'
    },
    priceRange: {
      minVariantPrice: {
        amount: '18.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [{
        node: {
          url: 'https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=800',
          altText: 'Chamomile Tea'
        }
      }]
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/4',
          title: 'Default',
          availableForSale: true,
          priceV2: {
            amount: '18.99',
            currencyCode: 'USD'
          }
        }
      }]
    }
  }
];

// Helper function to check if Shopify is properly configured
function isShopifyConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN &&
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN !== 'your-store.myshopify.com' &&
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN !== 'your-storefront-access-token'
  );
}

// GraphQL Queries
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          availableForSale
          featuredImage {
            url
            altText
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation createCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// API Functions
export async function getProducts(first: number = 20): Promise<Product[]> {
  // Use mock data if Shopify is not configured
  if (!isShopifyConfigured()) {
    console.warn('Shopify not configured. Using mock products. See SHOPIFY_SETUP.md for configuration instructions.');
    return mockProducts.slice(0, first);
  }

  try {
    const { data, errors } = await client.request(PRODUCTS_QUERY, {
      variables: { first },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch products');
    }

    const products = data?.products?.edges?.map((edge: { node: unknown }) => edge.node) || [];
    return products.map((product: unknown) => ProductSchema.parse(product));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  // Use mock data if Shopify is not configured
  if (!isShopifyConfigured()) {
    const mockProduct = mockProducts.find(p => p.handle === handle);
    return mockProduct || null;
  }

  try {
    const { data, errors } = await client.request(PRODUCT_BY_HANDLE_QUERY, {
      variables: { handle },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to fetch product');
    }

    if (!data?.product) {
      return null;
    }

    return ProductSchema.parse(data.product);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

export async function createCart() {
  try {
    const { data, errors } = await client.request(CREATE_CART_MUTATION);

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to create cart');
    }

    return {
      id: data.cartCreate.cart.id,
      checkoutUrl: data.cartCreate.cart.checkoutUrl,
    };
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

export async function addLinesToCart(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>) {
  try {
    const { data, errors } = await client.request(ADD_TO_CART_MUTATION, {
      variables: { cartId, lines },
    });

    if (errors) {
      console.error('GraphQL errors:', errors);
      throw new Error('Failed to add items to cart');
    }

    return data.cartLinesAdd.cart;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}
