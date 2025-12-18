import { TestimonialCard } from '../TestimonialCard';
import avatarImage from '@assets/generated_images/Woman_business_owner_headshot_3f3540dd.png';

export default function TestimonialCardExample() {
  return (
    <div className="max-w-md p-4">
      <TestimonialCard
        id="1"
        name="Jessica Thompson"
        avatar={avatarImage}
        rating={5}
        text="The quality of products on this platform is exceptional. I love knowing that every purchase supports women entrepreneurs. Highly recommend!"
        product="Handmade Ceramic Bowl Set"
      />
    </div>
  );
}
