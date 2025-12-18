import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Upload, ArrowLeft } from 'lucide-react';

interface UploadedItem {
  title: string;
  category: string;
  condition: string;
  description: string;
  image: string;
  price: number;
}

export default function Resell() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    description: '',
    image: null as File | null,
  });
  const [uploadedItems, setUploadedItems] = useState<UploadedItem[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const generateRandomPrice = () => {
    const base = Math.floor(Math.random() * 40) + 10; // Random price $10–$50
    return base + Math.floor(Math.random() * 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image before submitting.');
      return;
    }

    const imageURL = URL.createObjectURL(formData.image);
    const newItem: UploadedItem = {
      title: formData.title,
      category: formData.category,
      condition: formData.condition,
      description: formData.description,
      image: imageURL,
      price: generateRandomPrice(),
    };

    setUploadedItems([...uploadedItems, newItem]);
    alert('Your item has been submitted for review!');
    setFormData({
      title: '',
      category: '',
      condition: '',
      description: '',
      image: null,
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center py-12 px-6">
      {/* 🔙 Back Button */}
      <div className="w-full max-w-5xl mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-emerald-700 border-emerald-400 hover:bg-emerald-100"
          onClick={handleBack}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Button>
      </div>

      {/* Upload Form */}
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 mb-12">
        <h1 className="text-3xl font-serif font-bold text-emerald-700 text-center mb-6">
          Resell Your Clothes
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Upload your pre-loved fashion items and let us help you find them a
          new home. The platform will suggest the best resale price.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Item Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Title
            </label>
            <Input
              name="title"
              placeholder="e.g., Floral Summer Dress"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Input
              name="category"
              placeholder="e.g., Dress, Tops, Jeans"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition
            </label>
            <Input
              name="condition"
              placeholder="e.g., Gently Used, Like New"
              value={formData.condition}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="Describe your item briefly..."
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-400 transition">
              <label className="flex flex-col items-center cursor-pointer w-full">
                <Upload className="h-6 w-6 text-emerald-500 mb-2" />
                <span className="text-gray-600 text-sm mb-1">
                  {formData.image
                    ? formData.image.name
                    : 'Click to upload or drag and drop'}
                </span>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Submit for Review <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>

      {/* Uploaded Items Display */}
      {uploadedItems.length > 0 && (
        <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {uploadedItems.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-emerald-100"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-emerald-800 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {item.category} • {item.condition}
                </p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="text-lg font-bold text-emerald-600">
                  Estimated Price: ${item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
