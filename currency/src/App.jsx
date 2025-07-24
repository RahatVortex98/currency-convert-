// src/App.jsx
import { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import useCurrency from "./hooks/useCurrency";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BDT");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const currencyInfo = useCurrency(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      const result = (amount * currencyInfo[to]).toFixed(2);
      setConvertedAmount(result);
    }
  };

  useEffect(() => {
    if (!currencyInfo[to]) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currencyInfo, to]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-purple-400">
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 backdrop-blur-sm bg-white/30 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOption={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>

          <div className="relative w-full h-0.5 my-4">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-3 py-0.5"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisble={true}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white px-6 py-3 rounded-lg text-xl font-bold shadow-xl transition-all duration-300 ease-in-out transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            }`}
          >
            {loading ? "Loading..." : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
