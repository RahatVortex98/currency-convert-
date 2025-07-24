// src/hooks/useCurrency.js
import { useEffect, useState } from "react";

const useCurrency = (baseCurrency) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!baseCurrency) return;

    fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`)
      .then((res) => res.json())
      .then((res) => setData(res.rates))
      .catch((error) => {
        console.error("Failed to fetch currency rates:", error);
        setData({});
      });
  }, [baseCurrency]);

  return data;
};

export default useCurrency;
