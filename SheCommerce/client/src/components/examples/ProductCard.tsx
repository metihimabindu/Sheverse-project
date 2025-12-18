import { ProductCard } from '../ProductCard';
import productImage from '@assets/generated_images/Handmade_ceramic_product_photo_8ba879d9.png';

export default function ProductCardExample() {
  return (
    <div className="max-w-sm p-4">
      <ProductCard
        id="1"
        image={productImage}
        title="Handmade Ceramic Bowl Set"
        seller="Sarah's Pottery Studio"
        price={45.99}
        rating={4.8}
        reviewCount={124}
        isWishlisted={false}
      />
    </div>
  );
}
