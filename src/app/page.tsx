'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState<number | null>(null);

  // Add this useEffect to fetch the rate when component mounts
  useEffect(() => {
    fetchRate();
  }, []);

  const fetchRate = async () => {
    try {
      const response = await fetch('/api/exchange-rate');
      const data = await response.json();
      setRate(data.rate);
    } catch (error) {
      console.error('Failed to fetch rate:', error);
    }
  };

  const handleConvert = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && rate) {
      const converted = numAmount * rate;
      setResult(converted);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          AED to TL Currency Converter
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Amount (AED)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md text-black"
              placeholder="Enter amount in AED"
            />
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Convert
          </button>

          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-center text-black">
                {amount} AED = {result.toFixed(2)} TL
              </p>
              <p className="text-center text-sm text-gray-600 mt-2">
                Current rate: 1 AED = {rate?.toFixed(4)} TL
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 