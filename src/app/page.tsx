'use client';

import { useState } from 'react';

export default function Home() {
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  // This rate should ideally come from an API
  const AED_TO_TL_RATE = 8.32; // Example rate (you should use real-time rates)

  const handleConvert = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount)) {
      const converted = numAmount * AED_TO_TL_RATE;
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
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 