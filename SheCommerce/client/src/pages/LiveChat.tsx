import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

type Message = { id: string; sender: string; text: string };

export default function LiveChat() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "Support", text: "Hi there! 👋 How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /** --- SMART BOT RESPONSE ENGINE --- **/
  function getBotResponse(text: string): string {
    const t = text.toLowerCase();

    if (t.includes("hello") || t.includes("hi") || t.includes("hey"))
      return "Hey there! 😊 How can I assist you today?";
    if (t.includes("price") || t.includes("cost"))
      return "Our pricing depends on the product category. Could you tell me which item you're interested in?";
    if (t.includes("order"))
      return "You can check your order status on your dashboard 🛍️ or share your order ID here!";
    if (t.includes("refund"))
      return "Sorry to hear that 😔. Refunds are processed within 5–7 business days after approval.";
    if (t.includes("shipping"))
      return "We offer free shipping for orders above ₹999 and deliver within 3–5 days 🚚.";
    if (t.includes("return"))
      return "You can request a return within 7 days of delivery — no questions asked 💕.";
    if (t.includes("seller"))
      return "If you’d like to sell your products, you can sign up as a Seller from the Become a Seller page!";
    if (t.includes("bye") || t.includes("thanks"))
      return "You’re very welcome! 💖 Have a lovely day ahead!";
    return "I'm here to help! Could you please give me more details?";
  }

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "Support",
        text: getBotResponse(userMessage.text),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen bg-pink-100 text-black flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 bg-white/90 shadow-lg flex flex-col">
        <h1 className="text-2xl font-bold text-pink-700 mb-4 text-center">
          💬 Live Chat Support
        </h1>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto border rounded-md p-3 bg-pink-50 space-y-2 mb-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-2 rounded-md text-sm max-w-[80%] ${
                m.sender === "You"
                  ? "bg-pink-600 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              <strong>{m.sender}:</strong> {m.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
              <span className="text-xs ml-1">Support is typing...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-gray-300"
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={sendMessage}
            className="bg-pink-600 text-white hover:bg-pink-700"
          >
            Send
          </Button>
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          className="mt-4 text-gray-600 hover:text-pink-700"
          onClick={() => setLocation("/contact")}
        >
          ← Back to Contact
        </Button>
      </Card>
    </div>
  );
}
