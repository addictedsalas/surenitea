# Surenitea E-commerce

A premium tea e-commerce website built with Next.js 14, Tailwind CSS, and Shopify Storefront API.

## Features

- 🛍️ Full e-commerce functionality with Shopify integration
- 🎨 Modern, responsive design with custom brand colors
- 🛒 Real-time cart management with persistent state
- 📱 Mobile-first responsive design
- 🚀 Server-side rendering for optimal performance
- 🔍 Product catalog with detailed product pages

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4
- **E-commerce**: Shopify Storefront API
- **State Management**: React Context API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Shopify store with Storefront API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/addictedsalas/surenitea.git
cd surenitea
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file and add your Shopify credentials:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
surenitea/
├── app/                    # Next.js app directory
│   ├── shop/              # Shop pages
│   │   └── [handle]/      # Dynamic product pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── AddToCartButton.tsx
│   ├── CartDrawer.tsx
│   ├── Header.tsx
│   └── ProductCard.tsx
├── contexts/              # React contexts
│   └── CartContext.tsx
├── lib/                   # Utility functions
│   └── shopify.ts         # Shopify API integration
└── public/                # Static assets
```

## Design System

### Colors
- **Surenitea Green**: #005151
- **Surenitea Green 50**: #F2F8F8
- **Peach**: #FFC69A
- **Coral**: #E8927C

### Typography
- **Display (H1-H2)**: Recoleta Sans Bold
- **Body/Buttons**: Sofia Pro (Light 300 & Bold 700)

## Deployment

The site is configured for deployment on Vercel:

```bash
npm run build
```

## Future Enhancements

- [ ] Blog integration with MDX
- [ ] DoorDash integration
- [ ] Uber Eats integration
- [ ] Advanced product filtering
- [ ] Customer reviews
- [ ] Wishlist functionality

## License

This project is private and proprietary.
