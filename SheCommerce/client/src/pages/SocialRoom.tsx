import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

/**
 * SocialRoom.tsx
 * Mock social shopping room
 * Simulates live chat + voting on products
 */

type Message = { id: string; user: string; text: string; time: string };
type Product = { id: string; title: string; image: string; votes: number };
type User = { id: string; name: string; avatar: string };

export default function SocialRoom() {
  const [, setLocation] = useLocation();

  /* ------------------------- Mock Data ------------------------- */
  const [users, setUsers] = useState<User[]>([
    { id: "u1", name: "Bindu", avatar: "🧍‍♀️" },
    { id: "u2", name: "Aarti", avatar: "👩" },
    { id: "u3", name: "Sonia", avatar: "👩🏽‍🦱" },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "p1",
      title: "Handwoven Silk Saree",
      image: "/images/saree.jpg",
      votes: 3,
    },
    {
      id: "p2",
      title: "Eco-friendly Tote Bag",
      image: "/images/bag.jpg",
      votes: 2,
    },
    {
      id: "p3",
      title: "Embroidered Cushion Set",
      image: "/images/cushion.jpg",
      votes: 1,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", user: "Aarti", text: "This saree looks elegant!", time: "10:05" },
    { id: "m2", user: "Sonia", text: "Yes, but check that tote bag too 😍", time: "10:06" },
  ]);

  const [input, setInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  /* ------------------------- Handlers ------------------------- */
  function sendMessage() {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      user: "You",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  }

  function voteProduct(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, votes: p.votes + 1 } : p))
    );
  }

  /* ------------------------- UI ------------------------- */
  return (
    <div className="min-h-screen bg-pink-100 text-black flex flex-col">
      {/* Header */}
      <header className="p-4 bg-pink-600 text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">🛍️ Social Shopping Room</h1>
        <Button
          variant="secondary"
          className="bg-white text-pink-700 font-semibold hover:bg-pink-200"
          onClick={() => setLocation("/buyer-dashboard")}
        >
          Exit Room
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
        {/* Product section */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold mb-2">🛒 Products to Explore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <Card
                key={p.id}
                className={`p-4 cursor-pointer transition ${
                  selectedProduct === p.id ? "border-2 border-pink-600" : ""
                }`}
                onClick={() => setSelectedProduct(p.id)}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-gray-600">
                      Votes: <strong>{p.votes}</strong>
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      voteProduct(p.id);
                    }}
                  >
                    ❤️ Vote
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat sidebar */}
        <div className="flex flex-col space-y-4">
          <Card className="p-4 flex-1 flex flex-col bg-white">
            <h3 className="font-semibold mb-2">💬 Chat with Friends</h3>
            <div className="flex-1 overflow-y-auto border rounded-md p-3 bg-pink-50 space-y-2">
              {messages.map((m) => (
                <div key={m.id} className="text-sm">
                  <span className="font-bold">{m.user}:</span> {m.text}
                  <div className="text-xs text-gray-500">{m.time}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border-gray-300"
              />
              <Button
                onClick={sendMessage}
                className="bg-pink-600 text-white hover:bg-pink-700"
              >
                Send
              </Button>
            </div>
          </Card>

          {/* Members */}
          <Card className="p-4 bg-white">
            <h3 className="font-semibold mb-2">👥 Online Members</h3>
            <div className="flex flex-wrap gap-3">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-3xl">{u.avatar}</div>
                  <div className="text-sm font-medium">{u.name}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-3 bg-pink-600 text-white text-center text-sm">
        You’re shopping together in real-time ❤️
      </footer>
    </div>
  );
}
