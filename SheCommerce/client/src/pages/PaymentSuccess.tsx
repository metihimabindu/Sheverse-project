import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocation } from "wouter";

export default function PaymentSuccess() {
  const [, setLocation] = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  const orderId = "ORD123456";

  useEffect(() => {
    // 🎉 Confetti animation
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 40,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
      colors: ["#10B981", "#22C55E", "#84CC16", "#F472B6", "#FACC15"],
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 80 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0, 1), y: randomInRange(0.4, 0.6) },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // ✅ Add rewards to wallet and show toast
  useEffect(() => {
    const orderTotal = parseFloat(localStorage.getItem("lastOrderTotal") || "1000"); // mock total
    const reward = Math.round(orderTotal * 0.05); // 5% cashback
    const existing = parseFloat(localStorage.getItem("walletBalance") || "0");
    const newBalance = existing + reward;
    localStorage.setItem("walletBalance", newBalance.toString());
    setRewardAmount(reward);

    // Show toast
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg mx-auto text-center flex flex-col items-center relative">
          {/* ✅ Success Icon */}
          <div className="bg-green-100 p-6 rounded-full mb-6">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            Your order has been placed successfully 🎉 <br />
            5% of your order amount has been added to your wallet!
          </p>

          {/* ✅ Buttons */}
          <div className="flex flex-wrap justify-center gap-4 w-full">
            <Button
              className="min-w-[160px] px-4 py-2 text-sm sm:text-base font-medium bg-pink-600 text-white hover:bg-pink-700"
              onClick={() => setLocation("/shop")}
            >
              Continue Shopping
            </Button>

            <Button
              size="lg"
              className="min-w-[160px] px-4 py-2 text-sm sm:text-base font-medium bg-pink-600 text-white hover:bg-pink-700"
              onClick={() => setLocation(`/order-details/${orderId}`)}
            >
              View Order Details
            </Button>

            <button
              onClick={() => setLocation("/skill")}
              className="min-w-[160px] px-4 py-2 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-md shadow-md hover:shadow-lg transition-all duration-300 animate-glow"
            >
              Skill to Sell
            </button>
          </div>

          {/* ✅ Wallet Reward Toast (Clickable) */}
          {showToast && (
            <div
              onClick={() => setLocation("/wallet")}
              className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer animate-slide-up hover:bg-green-600 transition"
            >
              💰 ₹{rewardAmount} added to your wallet — tap to view
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* ✅ Animations */}
      <style jsx>{`
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 5px #10b981, 0 0 10px #22c55e, 0 0 20px #84cc16;
          }
          50% {
            box-shadow: 0 0 10px #22c55e, 0 0 20px #84cc16, 0 0 30px #a3e635;
          }
          100% {
            box-shadow: 0 0 5px #10b981, 0 0 10px #22c55e, 0 0 20px #84cc16;
          }
        }

        .animate-glow {
          animation: glowPulse 2s infinite alternate;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
