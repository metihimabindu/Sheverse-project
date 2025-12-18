import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

//todo: remove mock functionality - import product images
import product1 from '@assets/generated_images/Handmade_ceramic_product_photo_8ba879d9.png';
import product2 from '@assets/generated_images/Wellness_candle_product_photo_087176ac.png';
import product3 from '@assets/generated_images/Handwoven_tote_bag_product_0649932a.png';

//todo: remove mock functionality - cart items
interface CartItem {
  id: string;
  image: string;
  title: string;
  seller: string;
  price: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    image: product1,
    title: 'Handmade Ceramic Bowl Set',
    seller: "Sarah's Pottery Studio",
    price: 1299,
    quantity: 1,
  },
  {
    id: '2',
    image: product2,
    title: 'Natural Wellness Candle Collection',
    seller: 'Peaceful Moments',
    price: 899,
    quantity: 2,
  },
  {
    id: '3',
    image: product3,
    title: 'Handwoven Tote Bag',
    seller: 'Artisan Textiles Co.',
    price: 1699,
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const updateQuantity = (id: string, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    console.log('Applied promo code:', promoCode);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping;

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-2">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in
              your cart
            </p>
          </div>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Add some products to get started
              </p>
              <Button onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-medium text-foreground mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.seller}
                            </p>
                            <p className="font-semibold text-foreground">
                              ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-20">
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Order Summary
                  </h2>

                  {/* Promo Code */}
                  <div className="space-y-2 mb-6">
                    <label className="text-sm font-medium text-foreground">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {subtotal < 5000 && (
                      <p className="text-sm text-muted-foreground">
                        Add ₹{(5000 - subtotal).toFixed(2)} for free shipping
                      </p>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between text-lg font-semibold text-foreground mb-6">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                 <Button className="w-full" size="lg" onClick={() => navigate('/payment')}> Proceed to Payment
               </Button>


                  <Button
                    variant="outline"
                    className="w-full mt-3"
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
