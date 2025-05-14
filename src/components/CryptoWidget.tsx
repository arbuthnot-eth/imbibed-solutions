import { useState, useEffect } from 'react';
import axios from 'axios';

interface CryptoPrice {
  symbol: string;
  price: number;
}

export const CryptoWidget = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

  const cryptoSymbols = {
    BTC: '₿',
    ETH: 'Ξ'
  };

  useEffect(() => {
    const fetchPrices = async () => {
      console.log('Fetching crypto prices...');
      try {
        const [btcRes, ethRes, solRes, suiRes] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'),
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'),
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'),
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd')
        ]);

        const newPrices = [
          { symbol: 'BTC', price: Math.round(btcRes.data.bitcoin.usd) },
          { symbol: 'ETH', price: Math.round(ethRes.data.ethereum.usd) },
          { symbol: 'SOL', price: Math.round(solRes.data.solana.usd) },
          { symbol: 'SUI', price: Number(suiRes.data.sui.usd.toFixed(2)) }
        ];
        console.log('Fetched prices:', newPrices);
        setPrices(newPrices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  console.log('Rendering CryptoWidget:', { loading, prices });

  return (
    <div className="fixed bottom-6 right-6 backdrop-blur-lg bg-black/50 rounded-lg p-6 border border-[#f7b93a]/20 hover:border-[#f7b93a] hover:animate-neon-pulse transition-all duration-300 z-[100] min-w-[300px] shadow-lg">
      {loading ? (
        <div className="text-[#f7b93a] text-3xl">Loading prices...</div>
      ) : (
        <div className="flex flex-col space-y-4">
          {prices.map((crypto) => (
            <div key={crypto.symbol} className="flex justify-between items-center space-x-4">
              <div className="text-[#f7b93a] font-medium text-3xl whitespace-nowrap">
                {cryptoSymbols[crypto.symbol as keyof typeof cryptoSymbols] && 
                 `${cryptoSymbols[crypto.symbol as keyof typeof cryptoSymbols]} `}{crypto.symbol}:
              </div>
              <div className="text-[#f7b93a] text-3xl">${crypto.price.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 