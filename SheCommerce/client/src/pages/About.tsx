import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Users, Heart, TrendingUp, Shield } from 'lucide-react';
import { useLocation } from 'wouter'; // ✅ Import navigation hook

const values = [
  {
    icon: Users,
    title: 'Community First',
    description:
      'We believe in the power of women supporting women, creating a thriving marketplace for entrepreneurs.',
  },
  {
    icon: Heart,
    title: 'Authentic Stories',
    description:
      'Every product has a story. We celebrate the passion and dedication of our sellers.',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Success',
    description:
      'We provide tools and support to help women entrepreneurs grow their businesses.',
  },
  {
    icon: Shield,
    title: 'Trust & Quality',
    description:
      'We ensure every transaction is secure and every product meets our quality standards.',
  },
];

export default function About() {
  const [_, setLocation] = useLocation(); // ✅ Initialize navigation

  const handleStartShopping = () => {
    setLocation('/shop'); // ✅ Navigate to Shop page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1
              className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
              data-testid="text-about-title"
            >
              Empowering Women Through Commerce
            </h1>
            <p
              className="text-lg text-muted-foreground leading-relaxed"
              data-testid="text-about-description"
            >
              Empower Market is more than just a marketplace. We're a community dedicated to supporting women
              entrepreneurs, celebrating their creativity, and helping them build sustainable businesses. Every
              purchase you make directly supports a woman-led business and contributes to economic empowerment.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6"
                  data-testid="text-mission-title"
                >
                  Our Mission
                </h2>
                <p
                  className="text-muted-foreground leading-relaxed mb-6"
                  data-testid="text-mission-description"
                >
                  We created Empower Market to address the challenges women entrepreneurs face in accessing markets
                  and customers. Our platform provides a trusted space where women can showcase their products,
                  connect with conscious consumers, and build thriving businesses.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  From handmade crafts to digital services, fashion to wellness products, we celebrate the diversity
                  and creativity of women-led businesses. We believe that when women succeed, communities thrive.
                </p>
                <Button data-testid="button-become-seller-about">
                  Become a Seller <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Women entrepreneurs collaborating"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4"
                data-testid="text-values-title"
              >
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 hover-elevate transition-all"
                    data-testid={`card-value-${index}`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3
                      className="text-xl font-semibold text-foreground mb-2"
                      data-testid={`text-value-title-${index}`}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="text-sm text-muted-foreground"
                      data-testid={`text-value-description-${index}`}
                    >
                      {value.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <p
                  className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2"
                  data-testid="text-stat-sellers"
                >
                  5,000+
                </p>
                <p className="text-muted-foreground">Women Entrepreneurs</p>
              </div>
              <div>
                <p
                  className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2"
                  data-testid="text-stat-products"
                >
                  50,000+
                </p>
                <p className="text-muted-foreground">Unique Products</p>
              </div>
              <div>
                <p
                  className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2"
                  data-testid="text-stat-countries"
                >
                  80+
                </p>
                <p className="text-muted-foreground">Countries Represented</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6"
              data-testid="text-cta-title"
            >
              Join Our Community
            </h2>
            <p
              className="text-lg text-primary-foreground/90 mb-8"
              data-testid="text-cta-description"
            >
              Whether you're a buyer looking for unique products or an entrepreneur ready to share your creations,
              we'd love to have you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* ✅ Start Shopping navigates to Shop page */}
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
                onClick={handleStartShopping}
                data-testid="button-start-shopping"
              >
                Start Shopping
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
                data-testid="button-sell-with-us"
              >
                Sell With Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
