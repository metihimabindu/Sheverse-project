import { useRoute, useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function OrderDetails() {
  const [, params] = useRoute('/orders/:id');
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 px-4 py-12 text-center">
        <h1 className="text-3xl font-serif font-semibold mb-4">
          Order #{params?.id}
        </h1>
        <p className="text-muted-foreground mb-6">
          Your order is confirmed and will be shipped soon!
        </p>
        <Button onClick={() => setLocation('/shop')}>Back to Shop</Button>
      </main>
      <Footer />
    </div>
  );
}
