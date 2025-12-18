import React, { useState } from "react";
import { useLocation } from "wouter";
import { Mail, Lock, User } from "lucide-react";

const Signup: React.FC = () => {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) throw new Error("Signup failed. Try again!");

      alert("Account created successfully!");
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fde8ea]">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Join She Verse to explore, shop, and connect!
        </p>

        {error && (
          <p className="text-center text-sm text-red-500 mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-300 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-600 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">or continue with</p>
          <button className="mt-3 w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-pink-600 font-medium hover:underline"
          >
            Next
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
