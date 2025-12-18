import { useState } from 'react';
import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Smartphone, Truck } from 'lucide-react';

export default function Payment() {
  const [, setLocation] = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const [processing, setProcessing] = useState(false);

  const handlePayNow = () => {
    setProcessing(true);
    setTimeout(() => {
      setLocation('/payment-success'); // ✅ Navigate to success page
    }, 2000);
  };

  const handleBackToCart = () => {
    setLocation('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-semibold mb-8 text-center">
            Payment
          </h1>

          {processing ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-lg font-medium text-foreground">Processing your payment...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <Card className="p-6 lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

                {/* Payment method options */}
                <div className="space-y-3 mb-6">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
                      paymentMethod === 'card' ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Credit / Debit Card</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
                      paymentMethod === 'upi' ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span>UPI (Google Pay, PhonePe, etc.)</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${
                      paymentMethod === 'cod' ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Cash on Delivery</span>
                  </div>
                </div>

                {/* Card Payment Fields */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input
                        id="name"
                        placeholder="Full Name"
                        value={cardDetails.name}
                        onChange={(e) =>
                          setCardDetails({ ...cardDetails, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Card Number</Label>
                      <Input
                        id="number"
                        placeholder="1234 5678 9012 3456"
                        maxLength={16}
                        value={cardDetails.number}
                        onChange={(e) =>
                          setCardDetails({ ...cardDetails, number: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardDetails.expiry}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, expiry: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="***"
                          maxLength={3}
                          value={cardDetails.cvv}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, cvv: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Option */}
                {paymentMethod === 'upi' && (
                  <div className="mt-4">
                    <Label htmlFor="upi">Enter UPI ID</Label>
                    <Input id="upi" placeholder="example@upi" />
                  </div>
                )}

                {/* COD Note */}
                {paymentMethod === 'cod' && (
                  <p className="mt-4 text-muted-foreground">
                    You can pay when your order is delivered.
                  </p>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                  <Button variant="outline" onClick={handleBackToCart}>
                    Back to Cart
                  </Button>
                  <Button onClick={handlePayNow} className="bg-primary text-white">
                    Pay Now
                  </Button>
                </div>
              </Card>

              {/* Order Summary */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹2,999</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹99</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₹3,098</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
