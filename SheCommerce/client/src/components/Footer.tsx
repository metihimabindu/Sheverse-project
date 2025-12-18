import { useState } from 'react';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    toast({
      title: 'Success!',
      description: 'Thank you for subscribing to our newsletter.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-2" data-testid="text-newsletter-title">
              Join Our Community
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="text-newsletter-description">
              Get the latest products and stories from women entrepreneurs
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-foreground mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-all-products">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=fashion" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-fashion">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/shop?category=handmade" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-handmade">
                  Handmade Goods
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wellness" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-wellness">
                  Wellness
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-our-story">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/become-seller" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-become-seller-footer">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-faq">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-shipping">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-facebook" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-instagram" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-twitter" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:support@empowermarket.com" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-email" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              support@empowermarket.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            © 2025 Empower Market. All rights reserved. | Built to empower women entrepreneurs worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
