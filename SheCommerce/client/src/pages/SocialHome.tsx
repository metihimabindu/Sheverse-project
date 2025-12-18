import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * SocialHome.tsx
 * - Mock prototype of Social Shopping Hub
 * - Later you can connect it to sockets (e.g., Socket.IO or Firebase)
 */

export default function SocialHome() {
  const [messages, setMessages] = useState([
    { user: "Aditi", text: "Hey! Let's shop together!" },
    { user: "Riya", text: "Sure! I found some great handbags." },
  ]);
  const [message, setMessage] = useState("");
  const [votes, setVotes] = useState<{ [key: string]: number }>({
    "Handwoven Bag": 2,
    "Terracotta Jewelry": 1,
    "Embroidered Kurti": 3,
  });

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { user: "You", text: message }]);
    setMessage("");
  };

  const handleVote = (item: string) => {
    setVotes((prev) => ({ ...prev, [item]: (prev[item] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-pink-100 text-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-2">🛍️ Social Shopping</h1>
          <p className="text-lg text-gray-700">
            Shop with friends & family — chat, share, and vote on what to buy!
          </p>
        </header>

        {/* Chat + Products */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Chat Box */}
          <Card className="p-4 bg-white/80">
            <h2 className="text-xl font-semibold mb-3">💬 Group Chat</h2>
            <div className="h-64 overflow-y-auto border rounded-md p-3 bg-pink-50">
              {messages.map((m, i) => (
                <div key={i} className="mb-2">
                  <span className="font-semibold">{m.user}: </span>
                  <span>{m.text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-3">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </Card>

          {/* Product Voting */}
          <Card className="p-4 bg-white/80">
            <h2 className="text-xl font-semibold mb-3">🛒 Vote on Products</h2>
            <ul className="space-y-3">
              {Object.keys(votes).map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between border rounded-md p-3 bg-pink-50"
                >
                  <span className="font-medium">{item}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      Votes: {votes[item]}
                    </span>
                    <Button size="sm" onClick={() => handleVote(item)}>
                      👍 Vote
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-center gap-4">
          <Button
            className="bg-pink-600 hover:bg-pink-700 text-white"
            onClick={() => alert("Invite friends coming soon!")}
          >
            Invite Friends
          </Button>
          <Button
            className="bg-rose-500 hover:bg-rose-600 text-white"
            onClick={() => alert("Create a shopping room feature coming soon!")}
          >
            Create Shopping Room
          </Button>
        </div>
      </div>
    </div>
  );
}
