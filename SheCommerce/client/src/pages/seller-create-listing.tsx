import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string | null;
}

export default function SellerCreateListing() {
  const [, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  // handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: name === "price" || name === "stock" ? Number(value) : value });
  };

  // handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // add product to list
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      alert("Please fill in all required fields.");
      return;
    }

    const newEntry: Product = {
      id: Date.now(),
      ...newProduct,
    };

    setProducts([...products, newEntry]);
    setNewProduct({
      name: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
      image: null,
    });
    setPreview(null);

    alert("✅ Product added successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/10">
      <Header />

      <main className="flex-1 flex flex-col items-center py-12 px-4">
        <Card className="w-full max-w-4xl p-8 bg-white/90 shadow-lg backdrop-blur-md">
          <h1 className="text-3xl font-serif font-bold text-center mb-8">
            Create Product Listing
          </h1>

          {/* ====== Add Product Form ====== */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
                placeholder="Handcrafted Pottery Set"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
                placeholder="Home Decor"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary"
                placeholder="Describe your product in detail..."
              ></textarea>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Upload Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border p-2 rounded-lg"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-40 h-40 object-cover rounded-md border"
                />
              )}
            </div>

            <div className="md:col-span-2 flex justify-center pt-4">
              <Button
                onClick={handleAddProduct}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Add Product
              </Button>
            </div>
          </form>

          {/* ====== Product List ====== */}
          {products.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold text-lg">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {p.category}
                    </p>
                    <p className="text-primary font-medium mt-2">₹{p.price}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Stock: {p.stock}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/seller-dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
