import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPrice: string;
  onPriceChange: (priceLabel: string) => void;
  selectedRating: number;
  onRatingChange: (ratingValue: number) => void;
  priceRanges: { label: string; min: number; max: number }[];
}

export function FilterSidebar({
  isMobile = false,
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedPrice,
  onPriceChange,
  selectedRating,
  onRatingChange,
  priceRanges,
}: FilterSidebarProps) {
  const categories = ['All', 'Fashion', 'Handmade Goods', 'Wellness', 'Services'];
  const ratingOptions = [
    { label: 'All', value: 0 },
    { label: '4 & up', value: 4 },
    { label: '3 & up', value: 3 },
    { label: '2 & up', value: 2 },
  ];

  const handleClearFilters = () => {
    onCategoryChange('All');
    onPriceChange('All');
    onRatingChange(0);
    if (isMobile && onClose) onClose();
  };

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    if (isMobile && onClose) onClose();
  };

  const handlePriceClick = (label: string) => {
    onPriceChange(label);
    if (isMobile && onClose) onClose();
  };

  const handleRatingClick = (value: number) => {
    onRatingChange(value);
    if (isMobile && onClose) onClose();
  };

  const content = (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={cn('justify-start w-full text-left transition-colors', selectedCategory === category && 'bg-primary text-white')}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="flex flex-col gap-2">
          {priceRanges.map((range) => (
            <Button
              key={range.label}
              variant={selectedPrice === range.label ? 'default' : 'outline'}
              className={cn('justify-start w-full text-left transition-colors', selectedPrice === range.label && 'bg-primary text-white')}
              onClick={() => handlePriceClick(range.label)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Rating</h3>
        <div className="flex flex-col gap-2">
          {ratingOptions.map((r) => (
            <Button
              key={r.label}
              variant={selectedRating === r.value ? 'default' : 'outline'}
              className={cn('justify-start w-full text-left transition-colors', selectedRating === r.value && 'bg-primary text-white')}
              onClick={() => handleRatingClick(r.value)}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="pt-4 border-t border-border">
        <Button variant="outline" className="w-full hover:bg-red-50 text-red-600 border-red-200" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>
    </div>
  );

  // --- Mobile Drawer Mode ---
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="absolute inset-y-0 left-0 w-72 bg-background shadow-lg p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  // --- Desktop Sidebar ---
  return (
    <aside className="border border-border rounded-lg p-6 bg-card shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Filters</h2>
      {content}
    </aside>
  );
}
