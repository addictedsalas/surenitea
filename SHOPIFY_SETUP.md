# Shopify Storefront API Setup Guide

## Prerequisites
1. A Shopify store (development or production)
2. Admin access to the Shopify store

## Step 1: Create a Private App or Custom App

### Option A: Using Shopify Admin (Private App)
1. Go to your Shopify Admin → Settings → Apps and sales channels
2. Click "Develop apps" (you may need to enable this first)
3. Click "Create an app"
4. Give your app a name (e.g., "Surenitea Storefront")
5. Configure API scopes:
   - Click "Configure Storefront API scopes"
   - Enable the following permissions:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_product_tags`
     - `unauthenticated_read_selling_plans`
     - `unauthenticated_write_checkouts`
     - `unauthenticated_read_checkouts`

### Option B: Using Shopify Partners (Custom App)
1. Log in to your Shopify Partners account
2. Click "Apps" → "Create app"
3. Choose "Custom app"
4. Select your development store
5. Configure Storefront API access

## Step 2: Get Your Storefront Access Token

1. After creating the app, go to "API credentials"
2. Under "Storefront API access token", click "Reveal token once"
3. Copy this token - you won't be able to see it again!

## Step 3: Configure Your Environment Variables

Update your `.env.local` file with:

```env
# Replace with your actual store domain (e.g., my-store.myshopify.com)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Replace with the Storefront API access token you copied
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

## Step 4: Test Your Connection

Run the development server:
```bash
npm run dev
```

If configured correctly, you should see products loading on the homepage and shop page.

## Troubleshooting

### 401 Unauthorized Error
- Verify your store domain is correct (should be `your-store.myshopify.com`)
- Ensure the Storefront API access token is correct
- Check that Storefront API access is enabled for your app

### No Products Showing
- Ensure you have products in your Shopify store
- Products must be available in the "Online Store" sales channel
- Check product visibility settings in Shopify admin

### API Version Error
- The current supported version is `2025-01`
- If you see version errors, check the latest supported versions in Shopify docs

## Security Notes

- Never commit your `.env.local` file to version control
- The Storefront API token is public-facing and safe to use in client-side code
- For sensitive operations, use the Admin API with server-side code only
