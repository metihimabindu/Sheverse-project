import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategorySection } from '@/components/CategorySection';
import { ProductCard } from '@/components/ProductCard';
import { SellerStoryCard } from '@/components/SellerStoryCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ✅ Product Images
import product1 from '@assets/generated_images/Handmade_ceramic_product_photo_8ba879d9.png';
import product2 from '@assets/generated_images/Wellness_candle_product_photo_087176ac.png';
import product3 from '@assets/generated_images/Handwoven_tote_bag_product_0649932a.png';
import product4 from '@assets/generated_images/Natural_skincare_product_set_ce2ef76e.png';
import product5 from '@assets/generated_images/Handcrafted_jewelry_product_photo_a0c5cc7b.png';
import product6 from '@assets/generated_images/Digital_services_workspace_lifestyle_105f6dce.png';
import product7 from '@assets/generated_images/Sustainable_fashion_product_photo_7946c91f.png';
import sellerImage1 from '@assets/generated_images/Woman_entrepreneur_professional_headshot_c61f734d.png';
import testimonialImage from '@assets/generated_images/Woman_business_owner_headshot_3f3540dd.png';

// ✅ Featured Products
const featuredProducts = [
  {
    id: '1',
    image: product1,
    title: 'Handmade Ceramic Bowl Set',
    seller: "Sarah's Pottery Studio",
    price: 45.99,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    image: product2,
    title: 'Natural Wellness Candle Collection',
    seller: 'Peaceful Moments',
    price: 32.0,
    rating: 4.9,
    reviewCount: 89,
  },
  {
    id: '3',
    image: product3,
    title: 'Handwoven Tote Bag',
    seller: 'Artisan Textiles Co.',
    price: 58.0,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: '4',
    image: product4,
    title: 'Organic Skincare Gift Set',
    seller: 'Pure Botanicals',
    price: 68.0,
    rating: 4.9,
    reviewCount: 203,
  },
  {
    id: '5',
    image: product5,
    title: 'Handcrafted Stone Jewelry',
    seller: 'Gemstone Creations',
    price: 42.0,
    rating: 4.6,
    reviewCount: 78,
  },
  {
    id: '6',
    image: product6,
    title: 'Business Coaching Package',
    seller: 'Empower Consulting',
    price: 199.0,
    rating: 5.0,
    reviewCount: 45,
  },
  {
    id: '7',
    image: product7,
    title: 'Sustainable Linen Blouse',
    seller: 'Eco Fashion Lab',
    price: 75.0,
    rating: 4.8,
    reviewCount: 92,
  },
  {
    id: '8',
    image: product1,
    title: 'Artisan Coffee Mugs',
    seller: "Sarah's Pottery Studio",
    price: 28.0,
    rating: 4.7,
    reviewCount: 167,
  },
];

export default function Home() {
  const navigate = useNavigate();

  const handleResell = () => {
    navigate('/resell');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategorySection />

        {/* ✅ Add Resell Button Section */}
        <section className="text-center py-12 bg-gradient-to-r from-pink-50 via-white to-pink-50">
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-4">
            Want to Earn More?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Turn your purchases into profit! Resell your favorite items directly
            on our platform.
          </p>
          <Button
            size="lg"
            onClick={handleResell}
            className="bg-gradient-to-r from-emerald-500 to-lime-500 text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Resell Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2"
                  data-testid="text-featured-title"
                >
                  Featured Products
                </h2>
                <p
                  className="text-lg text-muted-foreground"
                  data-testid="text-featured-description"
                >
                  Handpicked items from our community of makers
                </p>
              </div>
              <Button
                variant="outline"
                className="hidden sm:flex"
                data-testid="button-view-all-products"
              >
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* Seller Stories */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4"
                data-testid="text-seller-stories-title"
              >
                Meet Our Sellers
              </h2>
              <p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                data-testid="text-seller-stories-description"
              >
                Discover the inspiring stories behind the products you love
              </p>
            </div>
            <div className="space-y-8">
              <SellerStoryCard
                id="1"
                image={sellerImage1}
                name="Maria Rodriguez"
                business="Handcrafted Ceramics"
                story="After years of honing my craft, I started my ceramics business to share my passion for creating beautiful, functional pieces. Each item tells a story and brings warmth to your home."
                location="Austin, TX"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4"
                data-testid="text-testimonials-title"
              >
                What Our Customers Say
              </h2>
              <p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                data-testid="text-testimonials-description"
              >
                Real reviews from our community
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard
                id="1"
                name="Jessica Thompson"
                avatar={testimonialImage}
                rating={5}
                text="The quality of products on this platform is exceptional. I love knowing that every purchase supports women entrepreneurs. Highly recommend!"
                product="Handmade Ceramic Bowl Set"
              />
              <TestimonialCard
                id="2"
                name="Amanda Chen"
                avatar={testimonialImage}
                rating={5}
                text="Fast shipping and beautiful packaging. The skincare products are amazing and I appreciate supporting women-owned businesses."
                product="Organic Skincare Gift Set"
              />
              <TestimonialCard
                id="3"
                name="Rachel Martinez"
                avatar={testimonialImage}
                rating={5}
                text="I've found so many unique items here that I can't get anywhere else. Love the mission and the amazing entrepreneurs!"
                product="Handwoven Tote Bag"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
