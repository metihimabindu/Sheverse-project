import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface SellerStoryCardProps {
  id: string;
  image: string;
  name: string;
  business: string;
  story: string;
  location: string;
}

export function SellerStoryCard({ id, image, name, business, story, location }: SellerStoryCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-seller-${id}`}>
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm text-primary font-medium mb-2" data-testid={`text-seller-location-${id}`}>
            {location}
          </p>
          <h3 className="text-2xl font-serif font-semibold text-foreground mb-2" data-testid={`text-seller-name-${id}`}>
            {name}
          </h3>
          <p className="text-base text-muted-foreground font-medium mb-4" data-testid={`text-seller-business-${id}`}>
            {business}
          </p>
          <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-seller-story-${id}`}>
            {story}
          </p>
          <Button variant="outline" className="w-fit" data-testid={`button-view-seller-${id}`}>
            View Products <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
