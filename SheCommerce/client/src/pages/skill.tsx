import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const skills = [
  {
    id: "handmade",
    name: "Handmade Jewelry",
    description:
      "Learn to design, price, and sell handmade jewelry online and at craft fairs.",
    image:
      "/images/jewelry.jpg",
    mentors: [
      {
        id: "m1",
        name: "Ayesha Khan",
        bio: "Jewelry artist featured on Etsy’s top 100 handmade sellers.",
        image:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "m2",
        name: "Sneha Rao",
        bio: "Founder of ShineCraft Studio — teaches jewelry business marketing.",
        image:
          "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  },
  {
    id: "art",
    name: "Art & Craft",
    description:
      "Monetize your creativity through online art classes, Etsy, and social media.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    mentors: [
      {
        id: "m3",
        name: "Anjali Gupta",
        bio: "Mixed-media artist and educator helping women monetize their art.",
        image:
          "https://images.pexels.com/photos/1809644/pexels-photo-1809644.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "m4",
        name: "Riya Sen",
        bio: "Runs a successful YouTube channel on DIY crafts and handmade gifts.",
        image:
          "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  },
  {
    id: "digitalart",
    name: "Digital Art & Design",
    description:
      "Create digital illustrations, printables, and designs that sell online.",
    image:
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=1200&q=80",
    mentors: [
      {
        id: "m5",
        name: "Isha Kapoor",
        bio: "Freelance designer who turned her art into a full-time online career.",
        image:
          "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "m6",
        name: "Radhika Sharma",
        bio: "Digital artist teaching Canva, Procreate, and Etsy art monetization.",
        image:
          "https://images.pexels.com/photos/374703/pexels-photo-374703.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  },
  {
    id: "eco",
    name: "Eco-Friendly Product Making",
    description:
      "Create sustainable and upcycled lifestyle products to sell locally and online.",
    image:
      "https://images.pexels.com/photos/3737697/pexels-photo-3737697.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mentors: [
      {
        id: "m7",
        name: "Neha Chatterjee",
        bio: "Founder of 'EcoBloom' — teaches women to create sustainable home products.",
        image:
          "https://images.pexels.com/photos/3727461/pexels-photo-3727461.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "m8",
        name: "Tanya Singh",
        bio: "Environmental entrepreneur guiding startups in green business creation.",
        image:
          "https://images.pexels.com/photos/3228683/pexels-photo-3228683.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  },
  {
    id: "resinart",
    name: "Home Decor & Resin Art",
    description:
      "Create and sell beautiful resin trays, coasters, candles, and custom home decor.",
    image:
      "https://images.pexels.com/photos/2717985/pexels-photo-2717985.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mentors: [
      {
        id: "m9",
        name: "Divya Arora",
        bio: "Resin artist teaching how to build a sustainable craft business.",
        image:
          "https://images.pexels.com/photos/5202081/pexels-photo-5202081.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "m10",
        name: "Meenal Joshi",
        bio: "Founder of 'ResinGlow' — turned resin art into a premium decor brand.",
        image:
          "https://images.pexels.com/photos/4553036/pexels-photo-4553036.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  },
  {
    id: "skincare",
    name: "Organic Skincare & Soap Making",
    description:
      "Learn to make and sell handmade soaps, scrubs, and natural skincare products.",
    image:
      "https://images.pexels.com/photos/3738348/pexels-photo-3738348.jpeg?auto=compress&cs=tinysrgb&w=1200",
    mentors: [
      {
        id: "m11",
        name: "Dr. Kavya Rao",
        bio: "Certified herbal skincare expert helping women start small-batch brands.",
        image:
          "https://images.pexels.com/photos/3769738/pexels-photo-3769738.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        id: "m12",
        name: "Ananya Iyer",
        bio: "Entrepreneur teaching organic product formulation and packaging.",
        image:
          "https://images.pexels.com/photos/3373719/pexels-photo-3373719.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  },
];

export default function SkillToSell() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  const selected = skills.find((s) => s.id === selectedSkill);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-4">
            Turn Your Passion Into Profit 💫
          </h1>
          <p className="text-lg text-gray-600">
            Choose a skill you love — learn from expert mentors and start earning from your creations.
          </p>
        </div>

        {/* Skill Categories */}
        {!selected && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <Card
                key={skill.id}
                className="p-6 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedSkill(skill.id)}
              >
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{skill.name}</h2>
                <p className="text-gray-600 text-sm">{skill.description}</p>
              </Card>
            ))}
          </div>
        )}

        {/* Mentor Section */}
        {selected && (
          <div>
            <Button
              variant="outline"
              className="mb-6"
              onClick={() => setSelectedSkill(null)}
            >
              ← Back to Skills
            </Button>
            <h2 className="text-3xl font-serif font-semibold mb-6">
              Mentors for {selected.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selected.mentors.map((mentor) => (
                <Card key={mentor.id} className="p-6 flex flex-col items-center">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold">{mentor.name}</h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {mentor.bio}
                  </p>
                  <Button
                    className="bg-pink-600 text-white hover:bg-pink-700"
                    onClick={() => alert(`Connecting with ${mentor.name}...`)}
                  >
                    Connect
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
