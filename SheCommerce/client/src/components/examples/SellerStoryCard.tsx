import { SellerStoryCard } from '../SellerStoryCard';
import sellerImage from '@assets/generated_images/Woman_entrepreneur_professional_headshot_c61f734d.png';

export default function SellerStoryCardExample() {
  return (
    <div className="max-w-4xl p-4">
      <SellerStoryCard
        id="1"
        image={sellerImage}
        name="Maria Rodriguez"
        business="Handcrafted Ceramics"
        story="After years of honing my craft, I started my ceramics business to share my passion for creating beautiful, functional pieces. Each item tells a story and brings warmth to your home."
        location="Austin, TX"
      />
    </div>
  );
}
