import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // Mock data for search
  const allItems = [
    { name: 'Handmade Jewelry', type: 'Skill', path: '/skill' },
    { name: 'Art & Craft', type: 'Skill', path: '/skill' },
    { name: 'Digital Marketing', type: 'Skill', path: '/skill' },
    { name: 'Shop', type: 'Page', path: '/shop' },
    { name: 'Mentors', type: 'Page', path: '/mentors' },
    { name: 'Wallet', type: 'Feature', path: '/wallet' },
    { name: 'Orders', type: 'Page', path: '/orders' },
    { name: 'Blog', type: 'Page', path: '/blog' },
    { name: 'Contact', type: 'Page', path: '/contact' },
  ];

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  // Mock data
  const cartCount = 3;
  const wishlistCount = 5;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/become-seller', label: 'Become a Seller' },
    { href: '/contact', label: 'Contact' },
  ];

  // 🧠 Smart SignIn navigation
  const handleSignIn = () => {
    if (location === '/become-seller') {
      setLocation('/login?redirect=seller');
    } else {
      setLocation('/login');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1
              className="text-xl sm:text-2xl font-serif font-semibold text-foreground"
              data-testid="logo-text"
            >
              SheVerse
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
                data-testid={`link-${link.label
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSearchOpen(!searchOpen)}
              data-testid="button-search"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                size="icon"
                variant="ghost"
                className="relative"
                data-testid="button-wishlist"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center"
                    data-testid="text-wishlist-count"
                  >
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                size="icon"
                variant="ghost"
                className="relative"
                data-testid="button-cart"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center"
                    data-testid="text-cart-count"
                  >
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Wallet Icon */}
            <Link href="/wallet" className="transition transform hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="#059669"
                className="w-6 h-6 hover:stroke-[#10b981]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 12h2.5M16 9h2.5M16 15h2.5"
                />
              </svg>
            </Link>

            {/* Profile / Sign In */}
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSignIn}
              data-testid="button-profile"
              aria-label="User profile"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar with Live Results */}
        {searchOpen && (
          <div className="py-4 border-t border-border relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, skills, sellers..."
                className="pl-10"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                data-testid="input-search"
              />
            </div>

            {/* Search Results */}
            {query && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 w-full max-h-60 overflow-y-auto z-50">
                {results.length > 0 ? (
                  results.map((item, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-pink-50 cursor-pointer"
                      onClick={() => {
                        setLocation(item.path);
                        setSearchOpen(false);
                        setQuery('');
                      }}
                    >
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.type}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-3 text-gray-500">
                    No results found ❌
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-primary ${
                    location === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                  data-testid={`link-mobile-${link.label
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
