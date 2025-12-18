import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@assets/generated_images/Women_entrepreneurs_collaborating_workspace_64ce1da3.png';

export function Hero() {
  const navigate = useNavigate();

  // Navigate to shop page
  const handleShopNow = () => {
    navigate('/shop');
  };

  // Navigate to become seller page
  const handleBecomeSeller = () => {
    navigate('/become-seller');
  };

  // ✅ Navigate to Social Shopping page
  const handleSocialShopping = () => {
    navigate('/social-home');
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Women entrepreneurs collaborating"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/40" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6"
          data-testid="text-hero-title"
        >
          Empower Women,
          <br />
          Empower Your Shopping
        </h1>

        <p
          className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          data-testid="text-hero-description"
        >
          Discover unique, affordable products from women entrepreneurs around
          the world. Every purchase supports a woman-led business.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleShopNow}
            data-testid="button-shop-now"
          >
            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleBecomeSeller}
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-become-seller"
          >
            Become a Seller
          </Button>

          {/* ✅ Social Shopping Button */}
          <Button
            size="lg"
            variant="outline"
            onClick={handleSocialShopping}
            className="bg-emerald-500/80 backdrop-blur-sm border-white/30 text-white hover:bg-emerald-500/90"
            data-testid="button-social-shopping"
          >
            👥 Social Shopping
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
