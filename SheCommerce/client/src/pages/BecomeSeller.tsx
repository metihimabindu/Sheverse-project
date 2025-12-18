import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Check,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Star,
} from "lucide-react";
import { useLocation } from "wouter"; // ✅ Wouter navigation hook

const benefits = [
  {
    icon: Users,
    title: "Reach Thousands of Customers",
    description:
      "Connect with a community of conscious consumers who value women-led businesses.",
  },
  {
    icon: DollarSign,
    title: "Competitive Fees",
    description:
      "Keep more of your earnings with our transparent, seller-friendly fee structure.",
  },
  {
    icon: Package,
    title: "Easy Setup",
    description:
      "Get your shop up and running in minutes with our intuitive seller dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Support",
    description:
      "Benefit from our marketing efforts and promotional campaigns.",
  },
];

const steps = [
  {
    number: "1",
    title: "Create Your Account",
    description:
      "Sign up and complete your seller profile with your business information.",
  },
  {
    number: "2",
    title: "List Your Products",
    description:
      "Upload high-quality photos and detailed descriptions of your products.",
  },
  {
    number: "3",
    title: "Start Selling",
    description:
      "Receive orders, manage inventory, and grow your business with our tools.",
  },
];

const testimonials = [
  {
    id: "1",
    name: "Sarah Martinez",
    business: "Handcrafted Ceramics",
    quote:
      "Joining this platform was the best decision for my business. I've tripled my sales in just 6 months!",
    rating: 5,
  },
  {
    id: "2",
    name: "Emily Chen",
    business: "Organic Skincare",
    quote:
      "The community support is incredible. I love being part of a marketplace that truly values women entrepreneurs.",
    rating: 5,
  },
];

export default function BecomeSeller() {
  const [, setLocation] = useLocation();

  // ✅ Navigate to Seller Login Page
  const goToSellerLogin = () => {
    setLocation("/seller-login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-primary text-center text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Start Selling on Empower Market
            </h1>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Join thousands of women entrepreneurs who are building successful
              businesses with us
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={goToSellerLogin}
            >
              Get Started Today
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                Why Sell With Us?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide everything you need to succeed
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Start selling in three simple steps
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index}>
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              No monthly fees. Only pay when you sell.
            </p>
            <Card className="p-8 md:p-12">
              <div className="text-center mb-8">
                <p className="text-5xl font-bold text-primary mb-2">5%</p>
                <p className="text-lg text-muted-foreground">
                  Commission per sale
                </p>
              </div>
              <div className="space-y-4 mb-8">
                {[
                  "No listing fees",
                  "No monthly subscription",
                  "Free seller dashboard",
                  "Marketing support included",
                  "Secure payment processing",
                  "24/7 seller support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" className="w-full" onClick={goToSellerLogin}>
                Start Selling Now
              </Button>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-12">
              What Our Sellers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <Card
                  key={t.id}
                  className="p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-4 justify-center">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">
                    “{t.quote}”
                  </p>
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.business}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community of successful women entrepreneurs today
            </p>
            <Button size="lg" onClick={goToSellerLogin}>
              Create Your Seller Account
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
