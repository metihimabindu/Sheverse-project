import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  product: string;
}

export function TestimonialCard({ id, name, avatar, rating, text, product }: TestimonialCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all" data-testid={`card-testimonial-${id}`}>
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
            }`}
          />
        ))}
      </div>
      <p className="text-foreground mb-6 leading-relaxed" data-testid={`text-testimonial-${id}`}>
        "{text}"
      </p>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground" data-testid={`text-customer-name-${id}`}>
            {name}
          </p>
          <p className="text-sm text-muted-foreground" data-testid={`text-product-purchased-${id}`}>
            Purchased: {product}
          </p>
        </div>
      </div>
    </Card>
  );
}
