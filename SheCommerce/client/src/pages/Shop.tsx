import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SlidersHorizontal } from 'lucide-react';

// Product images
import product1 from '@assets/generated_images/Handmade_ceramic_product_photo_8ba879d9.png';
import product2 from '@assets/generated_images/Wellness_candle_product_photo_087176ac.png';
import product3 from '@assets/generated_images/Handwoven_tote_bag_product_0649932a.png';
import product4 from '@assets/generated_images/Natural_skincare_product_set_ce2ef76e.png';
import product5 from '@assets/generated_images/Handcrafted_jewelry_product_photo_a0c5cc7b.png';
import product6 from '@assets/generated_images/Digital_services_workspace_lifestyle_105f6dce.png';
import product7 from '@assets/generated_images/Sustainable_fashion_product_photo_7946c91f.png';

// Sample Product Data (prices are in INR)
const allProducts = [
  { id: '1', image: product1, title: 'Handmade Ceramic Bowl Set', seller: "Sarah's Pottery Studio", price: 1299, category: 'Handmade Goods', rating: 4.8, reviewCount: 124 },
  { id: '2', image: product2, title: 'Natural Wellness Candle Collection', seller: 'Peaceful Moments', price: 899, category: 'Wellness', rating: 4.9, reviewCount: 89 },
  { id: '3', image: product3, title: 'Handwoven Tote Bag', seller: 'Artisan Textiles Co.', price: 1699, category: 'Fashion', rating: 4.7, reviewCount: 156 },
  { id: '4', image: product4, title: 'Organic Skincare Gift Set', seller: 'Pure Botanicals', price: 1899, category: 'Wellness', rating: 4.9, reviewCount: 203 },
  { id: '5', image: product5, title: 'Handcrafted Stone Jewelry', seller: 'Gemstone Creations', price: 1099, category: 'Handmade Goods', rating: 4.6, reviewCount: 78 },
  { id: '6', image: product6, title: 'Business Coaching Package', seller: 'Empower Consulting', price: 4999, category: 'Services', rating: 5.0, reviewCount: 45 },
  { id: '7', image: product7, title: 'Sustainable Linen Blouse', seller: 'Eco Fashion Lab', price: 1499, category: 'Fashion', rating: 4.8, reviewCount: 92 },
  { id: '8', image: product1, title: 'Artisan Coffee Mugs', seller: "Sarah's Pottery Studio", price: 799, category: 'Handmade Goods', rating: 4.7, reviewCount: 167 },
  { id: '9', image: product3, title: 'Handmade Leather Wallet', seller: 'Artisan Textiles Co.', price: 1399, category: 'Fashion', rating: 4.9, reviewCount: 98 },
  { id: '10', image: product4, title: 'Essential Oil Diffuser Set', seller: 'Pure Botanicals', price: 1199, category: 'Wellness', rating: 4.6, reviewCount: 145 },
  { id: '11', image: product5, title: 'Silver Chain Bracelet', seller: 'Gemstone Creations', price: 1599, category: 'Handmade Goods', rating: 4.8, reviewCount: 112 },
  { id: '12', image: product7, title: 'Organic Cotton T-Shirt', seller: 'Eco Fashion Lab', price: 999, category: 'Fashion', rating: 4.7, reviewCount: 201 },
];

export default function Shop() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [selectedRating, setSelectedRating] = useState(0); // 0 = All, otherwise min rating (e.g. 4 for "4 & up")

  // Price ranges (labels include ₹)
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under ₹1000', min: 0, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: 'Above ₹2000', min: 2000, max: Infinity },
  ];

  const handleSortChange = (value: string) => setSortBy(value);

  // Filter + Sort Logic (includes rating filter)
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Price
    const priceRange = priceRanges.find((p) => p.label === selectedPrice);
    if (priceRange) {
      filtered = filtered.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    // Rating (selectedRating = 0 means no filter)
    if (selectedRating > 0) {
      filtered = filtered.filter((p) => Math.round(p.rating) >= selectedRating || p.rating >= selectedRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured or newest - keep original order (or extend if you have created date)
        break;
    }

    return filtered;
  }, [selectedCategory, selectedPrice, selectedRating, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2">
              All Products
            </h1>
            <p className="text-muted-foreground">Discover unique items from women entrepreneurs</p>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedPrice={selectedPrice}
                onPriceChange={setSelectedPrice}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                priceRanges={priceRanges}
              />
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>

                <div className="flex items-center gap-4">
                  {/* Mobile Filters Button */}
                  <Button variant="outline" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                  </Button>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} priceSymbol="₹" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <FilterSidebar
          isMobile
          onClose={() => setMobileFiltersOpen(false)}
          selectedCategory={selectedCategory}
          onCategoryChange={(c) => { setSelectedCategory(c); setMobileFiltersOpen(false); }}
          selectedPrice={selectedPrice}
          onPriceChange={(p) => { setSelectedPrice(p); setMobileFiltersOpen(false); }}
          selectedRating={selectedRating}
          onRatingChange={(r) => { setSelectedRating(r); setMobileFiltersOpen(false); }}
          priceRanges={priceRanges}
        />
      )}

      <Footer />
    </div>
  );
}
