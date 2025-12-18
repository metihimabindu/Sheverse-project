import { useParams, useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: '10 Tips for Growing Your Handmade Business',
    author: 'Sarah Johnson',
    date: 'March 15, 2025',
    category: 'Business Tips',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80',
    content: `Growing a handmade business takes patience, creativity, and a strategic approach. 
Here are ten practical steps you can take to scale sustainably:

1️⃣ Identify your niche and target audience.  
2️⃣ Build a consistent and authentic brand story.  
3️⃣ Focus on quality craftsmanship and presentation.  
4️⃣ Use social media to share behind-the-scenes content.  
5️⃣ Create a simple, beautiful online store experience.  
6️⃣ Offer customization options to attract loyal buyers.  
7️⃣ Collaborate with local creators and attend markets.  
8️⃣ Collect reviews and use them as social proof.  
9️⃣ Learn basic SEO to increase organic reach.  
🔟 Take time to celebrate small milestones and stay inspired.`,
  },
  {
    id: '2',
    title: 'The Power of Authentic Storytelling in E-Commerce',
    author: 'Maria Rodriguez',
    date: 'March 12, 2025',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    content: `Customers connect with stories, not just products. 
When you share your journey—the challenges, inspirations, and lessons—you humanize your brand.

✨ Be transparent about your process.  
✨ Highlight the “why” behind your creations.  
✨ Feature your customers’ experiences and testimonials.  
✨ Use visuals that feel personal and authentic, not overly polished.  

Authenticity builds trust, and trust drives repeat sales.`,
  },
  {
    id: '3',
    title: 'Sustainable Packaging Ideas for Small Businesses',
    author: 'Emily Chen',
    date: 'March 8, 2025',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&w=1200&q=80',
    content: `Eco-friendly packaging shows that your brand values the planet. 
It’s also becoming an expectation among modern consumers.

♻️ Use recycled or biodegradable materials.  
📦 Avoid plastic fillers and opt for paper-based alternatives.  
🎨 Add a thank-you card printed on seeded paper that customers can plant.  
🌿 Offer refillable options for your repeat customers.  

Sustainability isn’t just good for the Earth—it’s good for business.`,
  },
  {
    id: '4',
    title: 'How to Price Your Handmade Products',
    author: 'Jessica Thompson',
    date: 'March 5, 2025',
    category: 'Business Tips',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    content: `Pricing handmade items can be tricky. Many creators underprice their work, not realizing how much time and effort goes into each piece.

Here’s a formula that helps:  
**(Materials + Labor + Overhead) x 2 = Wholesale Price**  
**Wholesale x 2 = Retail Price**

Don’t forget to:  
- Factor in your time per product.  
- Research competitor pricing.  
- Reevaluate pricing annually as your skills improve.  
Remember: pricing confidently communicates the value of your craftsmanship.`,
  },
  {
    id: '5',
    title: 'Building Your Brand on Social Media',
    author: 'Amanda Lee',
    date: 'March 1, 2025',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80',
    content: `Social media is one of the most powerful free tools for small business owners. 
To build a consistent, recognizable brand:

📸 Stick to a visual theme or color palette.  
📅 Post consistently using a content calendar.  
💬 Engage with comments and messages genuinely.  
🎥 Try Reels and behind-the-scenes videos for higher engagement.  

Over time, your followers will evolve into loyal customers and brand advocates.`,
  },
  {
    id: '6',
    title: 'Success Story: From Home Kitchen to Thriving Business',
    author: 'Rachel Martinez',
    date: 'February 28, 2025',
    category: 'Success Stories',
    image: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=1200&q=80',
    content: `Rachel’s journey began with a passion for baking. 
What started as weekend treats for friends quickly turned into a full-time business.

She focused on:  
🎯 Crafting unique flavors and high-quality ingredients.  
💻 Launching an online store with beautiful photography.  
📦 Offering gift boxes for birthdays and holidays.  
💬 Building a loyal Instagram community.  

Today, her bakery delivers nationwide and inspires other women entrepreneurs to turn their dreams into reality.`,
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center text-center">
          <p className="text-lg text-muted-foreground">Blog post not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={() => setLocation('/blog')} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <User className="h-4 w-4" /> {post.author}
            <span>•</span>
            <Calendar className="h-4 w-4" /> {post.date}
          </div>

          <h1 className="text-4xl font-serif font-bold mb-6">{post.title}</h1>
          <p className="text-lg leading-relaxed whitespace-pre-line text-foreground">
            {post.content}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
