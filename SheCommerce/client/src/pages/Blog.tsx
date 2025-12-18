import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useLocation } from 'wouter';

// ✅ blog posts with hosted image URLs
const blogPosts = [
  {
    id: '1',
    title: '10 Tips for Growing Your Handmade Business',
    excerpt:
      'Learn the essential strategies that successful artisan entrepreneurs use to scale their businesses and reach more customers.',
    author: 'Sarah Johnson',
    date: 'March 15, 2025',
    category: 'Business Tips',
    image:
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'The Power of Authentic Storytelling in E-Commerce',
    excerpt:
      'Discover how sharing your unique journey can connect with customers and build a loyal community around your brand.',
    author: 'Maria Rodriguez',
    date: 'March 12, 2025',
    category: 'Marketing',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Sustainable Packaging Ideas for Small Businesses',
    excerpt:
      'Eco-friendly packaging solutions that protect your products while showing your commitment to the environment.',
    author: 'Emily Chen',
    date: 'March 8, 2025',
    category: 'Sustainability',
    image:
      'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'How to Price Your Handmade Products',
    excerpt:
      'A comprehensive guide to pricing strategies that value your time, materials, and expertise appropriately.',
    author: 'Jessica Thompson',
    date: 'March 5, 2025',
    category: 'Business Tips',
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    title: 'Building Your Brand on Social Media',
    excerpt:
      'Effective strategies for growing your presence and engaging with customers on Instagram, Pinterest, and beyond.',
    author: 'Amanda Lee',
    date: 'March 1, 2025',
    category: 'Marketing',
    image:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    title: 'Success Story: From Home Kitchen to Thriving Business',
    excerpt:
      'One entrepreneur shares her journey from baking in her home kitchen to running a successful online bakery.',
    author: 'Rachel Martinez',
    date: 'February 28, 2025',
    category: 'Success Stories',
    image:
      'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=800&q=80',
  },
];

const categories = [
  'All',
  'Business Tips',
  'Marketing',
  'Success Stories',
  'Sustainability',
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [location, setLocation] = useLocation();

  const handleReadMore = (id: string) => {
    setLocation(`/blog/${id}`);
  };

  // ✅ Filter logic
  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Blog & Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Tips, stories, and insights for women entrepreneurs
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    category === selectedCategory ? 'default' : 'outline'
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover-elevate transition-all"
                  >
                    {/* Blog Image */}
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      {/* Read More button */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleReadMore(post.id)}
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-lg">
                No blog posts found for this category.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
