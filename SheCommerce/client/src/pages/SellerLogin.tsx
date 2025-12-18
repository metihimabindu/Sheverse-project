import React, { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SellerLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seller Login:", { email, password });
    // ✅ Simulate successful login
    setLocation("/seller-dashboard"); // You can change to your actual seller dashboard route
  };

  const handleSignupRedirect = () => {
    setLocation("/seller-signup");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md p-8 shadow-lg bg-white/90 backdrop-blur-md">
          <h1 className="text-3xl font-serif font-bold text-center text-foreground mb-6">
            Seller Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-muted p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seller@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-muted p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Log In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don’t have an account?{" "}
            <button
              onClick={handleSignupRedirect}
              className="text-primary hover:underline font-medium"
            >
              Sign up as Seller
            </button>
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
