import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ShoppingCart, Eye, Star, X } from 'lucide-react';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  seller: string;
  price: number;
  rating: number;
  reviewCount: number;
  priceSymbol?: string;
}

export function ProductCard({
  id,
  image,
  title,
  seller,
  price,
  rating,
  reviewCount,
   priceSymbol = '₹', 
}: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [, setLocation] = useLocation();

  const handleAddToCart = () => {
    console.log(`Product ${id} added to cart`);
    setLocation('/cart'); // ✅ Navigate to cart page
  };

  return (
    <>
      <Card
        className="group overflow-hidden hover:elevate transition-all duration-200"
        data-testid={`card-product-${id}`}
      >
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg bg-muted">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-1" data-testid={`text-seller-${id}`}>
            {seller}
          </p>
          <h3
            className="text-lg font-medium text-foreground mb-2 line-clamp-2"
            data-testid={`text-title-${id}`}
          >
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium" data-testid={`text-rating-${id}`}>
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>

          {/* Price */}
          <p
            className="text-xl font-semibold text-foreground mb-4"
            data-testid={`text-price-${id}`}
          >
            ₹{price.toFixed(2)}
          </p>

          {/* ✅ Buttons Below Price */}
          <div className="flex items-center justify-between gap-3 mt-2">
            <Button
              variant="secondary"
              className="flex-1 bg-white hover:bg-gray-100 text-sm flex items-center justify-center gap-1 border border-muted"
              onClick={() => setShowQuickView(true)}
            >
              <Eye className="h-4 w-4" />
              Quick View
            </Button>

            <Button
              variant="default"
              className="flex-1 bg-primary text-white hover:bg-primary/90 text-sm flex items-center justify-center gap-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>

      {/* ✅ Quick View Modal */}
      <Dialog open={showQuickView} onOpenChange={setShowQuickView}>
        <DialogContent
          className="max-w-2xl p-0 overflow-hidden"
          onInteractOutside={() => setShowQuickView(false)}
          onEscapeKeyDown={() => setShowQuickView(false)}
        >
          {/* Modal Header */}
          <DialogHeader className="flex items-center justify-between px-6 pt-4">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowQuickView(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>

          {/* Modal Body */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Product Image */}
            <div className="rounded-lg overflow-hidden bg-muted">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Seller: {seller}</p>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">
                    ({reviewCount} reviews)
                  </span>
                </div>

                <p className="text-2xl font-semibold text-foreground mb-4">
                  ₹{price.toFixed(2)}
                </p>

                <p className="text-sm text-muted-foreground">
                  This product is one of our top-rated items, offering premium quality and a perfect balance of style and durability.
                </p>
              </div>

              {/* Footer Buttons */}
              <DialogFooter className="flex gap-3 mt-4">
                <Button
                  onClick={handleAddToCart}
                  className="bg-primary text-white hover:bg-primary/90 w-full"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowQuickView(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
