import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [rewards, setRewards] = useState<{ amount: number; date: string }[]>([]);
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem("walletBalance") || "0");
    setBalance(storedBalance);

    const storedRewards = JSON.parse(localStorage.getItem("walletRewards") || "[]");
    setRewards(storedRewards.slice(-3).reverse());
  }, []);

  const handleInvest = () => {
    if (!selectedOption || !amount) {
      alert("Please select an investment option and enter an amount.");
      return;
    }
    alert(`Invested ₹${amount} in ${selectedOption}! 🌱`);
    setShowInvestModal(false);
    setAmount("");
    setSelectedOption(null);
  };

  const handleAddToBank = () => {
    if (!amount) {
      alert("Please enter an amount to transfer to bank.");
      return;
    }
    if (parseFloat(amount) > balance) {
      alert("Insufficient balance.");
      return;
    }
    const newBalance = balance - parseFloat(amount);
    setBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());
    alert(`₹${amount} has been added to your bank account 💰`);
    setShowBankModal(false);
    setAmount("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <Card className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-green-100 p-5 rounded-full mb-4">
              <svg
                className="w-14 h-14 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 7H3V5h18v2zm-2 10H5v2h14v-2zM5 9h14v6H5V9zm2 2v2h10v-2H7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-700 mb-1">My Wallet</h1>
            <p className="text-gray-600 text-sm mb-4">
              Total rewards from your past purchases
            </p>
            <p className="text-4xl font-extrabold text-green-700 mb-6">
              ₹{balance.toFixed(2)}
            </p>
          </div>

          {/* ✅ Recent Rewards */}
          <div className="mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Recent Rewards
            </h2>
            {rewards.length > 0 ? (
              <ul className="space-y-2">
                {rewards.map((r, i) => (
                  <li
                    key={i}
                    className="flex justify-between bg-green-50 rounded-lg px-4 py-2 text-sm text-gray-700"
                  >
                    <span>+₹{r.amount}</span>
                    <span className="text-gray-500">{r.date}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No recent rewards yet.</p>
            )}
          </div>

          {/* ✅ Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              onClick={() => setShowInvestModal(true)}
            >
              Invest
            </Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50 px-6 py-2 rounded-md"
              onClick={() => setShowBankModal(true)}
            >
              Add to Bank
            </Button>
          </div>
        </Card>
      </main>

      <Footer />

      {/* ✅ Invest Modal */}
      {showInvestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-2xl">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
              Invest Your Rewards 🌱
            </h2>
            <p className="text-gray-600 text-sm mb-3 text-center">
              Choose how you'd like to grow your rewards
            </p>

            <div className="space-y-3 mb-4">
              {["Skill Courses", "Shop Coupons", "Community Fund"].map((option) => (
                <label
                  key={option}
                  className={`block border rounded-lg p-3 cursor-pointer ${
                    selectedOption === option
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="investOption"
                    className="mr-2"
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex justify-between">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6"
                onClick={handleInvest}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowInvestModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add to Bank Modal */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-2xl">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 text-center">
              Add to Bank 🏦
            </h2>
            <p className="text-gray-600 text-sm mb-3 text-center">
              Transfer your wallet balance to your linked bank account
            </p>

            <input
              type="number"
              placeholder="Enter amount to transfer"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex justify-between">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6"
                onClick={handleAddToBank}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBankModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
