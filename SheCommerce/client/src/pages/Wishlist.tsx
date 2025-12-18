import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';

//todo: remove mock functionality - import product images
import product1 from '@assets/generated_images/Handmade_ceramic_product_photo_8ba879d9.png';
import product2 from '@assets/generated_images/Wellness_candle_product_photo_087176ac.png';
import product3 from '@assets/generated_images/Handwoven_tote_bag_product_0649932a.png';
import product4 from '@assets/generated_images/Natural_skincare_product_set_ce2ef76e.png';

//todo: remove mock functionality - wishlist items
const initialWishlistItems = [
  {
    id: '1',
    image: product1,
    title: 'Handmade Ceramic Bowl Set',
    seller: "Sarah's Pottery Studio",
    price: 1299,
    inStock: true,
  },
  {
    id: '2',
    image: product2,
    title: 'Natural Wellness Candle Collection',
    seller: 'Peaceful Moments',
    price: 899,
    inStock: true,
  },
  {
    id: '3',
    image: product3,
    title: 'Handwoven Tote Bag',
    seller: 'Artisan Textiles Co.',
    price: 1699,
    inStock: true,
  },
  {
    id: '4',
    image: product4,
    title: 'Organic Skincare Gift Set',
    seller: 'Pure Botanicals',
    price: 1899,
    inStock: false,
  },
];

// helper function to format prices in ₹
const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const handleRemoveItem = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    console.log('Removed item from wishlist:', id);
  };

  const handleAddToCart = (id: string) => {
    console.log('Added to cart from wishlist:', id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2"
              data-testid="text-wishlist-title"
            >
              My Wishlist
            </h1>
            <p className="text-muted-foreground" data-testid="text-wishlist-description">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted mx-auto mb-4" />
              <h2
                className="text-2xl font-semibold text-foreground mb-2"
                data-testid="text-empty-wishlist"
              >
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Start adding products you love to your wishlist
              </p>
              <Button data-testid="button-shop-now-empty">Shop Now</Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover-elevate transition-all"
                  data-testid={`card-wishlist-item-${item.id}`}
                >
                  <div className="relative aspect-square bg-muted">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-primary"
                      onClick={() => handleRemoveItem(item.id)}
                      data-testid={`button-remove-${item.id}`}
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <p
                      className="text-sm text-muted-foreground mb-1"
                      data-testid={`text-seller-${item.id}`}
                    >
                      {item.seller}
                    </p>
                    <h3
                      className="text-base font-medium text-foreground mb-2 line-clamp-2"
                      data-testid={`text-item-title-${item.id}`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-lg font-semibold text-foreground mb-3"
                      data-testid={`text-item-price-${item.id}`}
                    >
                      {formatPrice(item.price)}
                    </p>
                    {item.inStock ? (
                      <Button
                        className="w-full"
                        onClick={() => handleAddToCart(item.id)}
                        data-testid={`button-add-to-cart-${item.id}`}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled
                        data-testid={`button-out-of-stock-${item.id}`}
                      >
                        Out of Stock
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
