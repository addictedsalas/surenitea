import { getProducts } from '@/lib/shopify';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import BrandStory from '@/components/sections/BrandStory';
import Newsletter from '@/components/sections/Newsletter';
import InstagramGallery from '@/components/sections/InstagramGallery';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import OrderNowSection from '@/components/sections/OrderNowSection';

export default async function HomePage() {
  // Get featured products (first 3 to match the store)
  const products = await getProducts(3);

  return (
    <div>
      {/* Hero Section with Video */}
      <HeroSection
        title="Meditation in A Cup"
        subtitle="Building your ritual one sip at a time. Explore our premium collection of hand-selected teas."
        buttonText="Shop Our Collection"
        buttonLink="/shop"
      />

      {/* Featured Products Section */}
      <FeaturedProducts products={products} />

      {/* Brand Story Section */}
      <BrandStory />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Order Now Section */}
      <OrderNowSection />

      {/* Newsletter Section */}
      <Newsletter />

      {/* Instagram Gallery Section */}
      <InstagramGallery 
        instagramPosts={[
          // Replace these with actual Instagram post URLs from @surenitea_official
          // Format: "https://www.instagram.com/p/POST_ID/"
          "https://www.instagram.com/p/DJ_9BHLOhlJ/",
          "https://www.instagram.com/p/DJ73te1OUny/",
          "https://www.instagram.com/p/DJsUpm7OTnB/",
        ]}
      />
    </div>
  );
}
