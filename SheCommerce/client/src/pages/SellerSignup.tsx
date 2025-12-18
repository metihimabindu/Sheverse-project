import React, { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SellerSignup() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Seller Signup:", formData);
    // Navigate to seller authentication page after clicking Verify
    setLocation("/seller-auth-page");
  };

  const handleBackToLogin = () => {
    setLocation("/seller-login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md p-8 shadow-lg bg-white/90 backdrop-blur-md">
          <h1 className="text-3xl font-serif font-bold text-center text-foreground mb-6">
            Seller Sign Up
          </h1>
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-muted p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-muted p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Empower Crafts"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
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
              Verify
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <button
              onClick={handleBackToLogin}
              className="text-primary hover:underline font-medium"
            >
              Log in
            </button>
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
