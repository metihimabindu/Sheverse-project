import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function SellerProfile() {
  const [, setLocation] = useLocation();
  const [profile, setProfile] = useState({
    name: "Priya Sharma",
    email: "seller@example.com",
    phone: "9876543210",
    businessName: "Empower Crafts",
    address: "Bangalore, India",
    image: "/placeholder-avatar.jpg", // default image
  });

  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Handle image upload + instant preview
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, image: reader.result as string }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Error uploading image:", err);
      setUploading(false);
    }
  };

  // Save changes (local demo)
  const handleSave = () => {
    setEditing(false);
    console.log("✅ Updated Seller Profile:", profile);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-3xl p-8 shadow-lg bg-white/90 backdrop-blur-md">
          <h1 className="text-3xl font-serif font-bold text-center text-foreground mb-6">
            Seller Profile
          </h1>

          {/* ======= Profile Photo Section ======= */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <img
                src={profile.image}
                alt="Seller Avatar"
                className="w-32 h-32 rounded-full border-4 border-primary/40 object-cover shadow-md"
              />
              {editing && (
                <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/80">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  📷
                </label>
              )}
            </div>

            {uploading && (
              <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
            )}
          </div>

          {/* ======= Profile Form ======= */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5 text-left max-w-lg mx-auto"
          >
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Business Name
              </label>
              <input
                name="businessName"
                type="text"
                value={profile.businessName}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Address
              </label>
              <input
                name="address"
                type="text"
                value={profile.address}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-muted/20"
              />
            </div>

            {/* ======= Buttons ======= */}
            <div className="flex justify-center gap-4 pt-6">
              {editing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-primary text-white hover:bg-primary/90"
                    disabled={uploading}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => setEditing(true)}
                    className="bg-primary text-white hover:bg-primary/90"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setLocation("/seller-dashboard")}
                  >
                    Back to Dashboard
                  </Button>
                </>
              )}
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
