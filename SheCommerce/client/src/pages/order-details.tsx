import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams } from 'wouter';
import { Package, Truck, MapPin, CreditCard, Calendar, ShoppingBag } from 'lucide-react';

export default function OrderDetails() {
  const { orderId } = useParams(); // ✅ Get order ID from URL

  // ⚙️ Dummy data — replace with real data from your API or state
  const order = {
    id: orderId,
    date: 'Oct 9, 2025',
    status: 'Shipped',
    paymentMethod: 'Credit Card (**** 1234)',
    deliveryAddress: {
      name: 'Priya Sharma',
      line1: '123, MG Road',
      line2: 'Bangalore, Karnataka 560001',
      phone: '+91 98765 43210',
    },
    items: [
      {
        id: '1',
        name: 'Handcrafted Ceramic Vase',
        image: '/images/vase.jpg',
        price: 1499,
        quantity: 1,
      },
      {
        id: '2',
        name: 'Organic Cotton Scarf',
        image: '/images/scarf.jpg',
        price: 799,
        quantity: 2,
      },
    ],
  };

  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-serif font-semibold mb-4">Order Details</h1>

          {/* Order Summary */}
          <Card className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <p className="text-muted-foreground">Order ID:</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground">Order Date:</p>
                <p className="font-medium flex items-center justify-end gap-1">
                  <Calendar className="w-4 h-4" /> {order.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Truck className="w-4 h-4 text-primary" />
              <p className="text-primary font-medium">Status: {order.status}</p>
            </div>
          </Card>

          {/* Delivery Address */}
          <Card className="p-6 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Delivery Address</h2>
            </div>
            <p className="font-medium">{order.deliveryAddress.name}</p>
            <p>{order.deliveryAddress.line1}</p>
            <p>{order.deliveryAddress.line2}</p>
            <p className="text-muted-foreground">Phone: {order.deliveryAddress.phone}</p>
          </Card>

          {/* Order Items */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Items Ordered</h2>
            </div>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4 last:border-none last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            ))}
          </Card>

          {/* Payment Summary */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Payment Summary</h2>
            </div>
            <div className="flex justify-between text-sm">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Shipping</p>
              <p>₹{shipping}</p>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              {order.paymentMethod}
            </div>
          </Card>

          <div className="text-center">
            <Button onClick={() => window.print()} className="mt-4">
              Download Invoice
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
