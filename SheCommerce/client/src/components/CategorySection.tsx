import { Sparkles, Palette, Heart, Laptop } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLocation } from 'wouter';

const categories = [
  {
    id: 'fashion',
    name: 'Fashion',
    icon: Sparkles,
    color: 'bg-chart-1',
    description: 'Sustainable clothing & accessories',
  },
  {
    id: 'handmade',
    name: 'Handmade Goods',
    icon: Palette,
    color: 'bg-chart-2',
    description: 'Artisan crafted products',
  },
  {
    id: 'wellness',
    name: 'Wellness',
    icon: Heart,
    color: 'bg-chart-3',
    description: 'Natural beauty & self-care',
  },
  {
    id: 'digital',
    name: 'Digital Services',
    icon: Laptop,
    color: 'bg-chart-4',
    description: 'Online courses & templates',
  },
];

export function CategorySection() {
  const [, setLocation] = useLocation();

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to shop page (optionally could use `/shop?category=${categoryId}`)
    setLocation('/shop');
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4"
            data-testid="text-categories-title"
          >
            Shop by Category
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-categories-description"
          >
            Discover a curated selection of products from talented women entrepreneurs
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                onClick={() => handleCategoryClick(category.id)} // ✅ Click navigates to shop
                className="p-6 hover-elevate active-elevate-2 cursor-pointer transition-all hover:shadow-lg"
                data-testid={`card-category-${category.id}`}
              >
                <div
                  className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-2"
                  data-testid={`text-category-name-${category.id}`}
                >
                  {category.name}
                </h3>
                <p
                  className="text-sm text-muted-foreground"
                  data-testid={`text-category-description-${category.id}`}
                >
                  {category.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
