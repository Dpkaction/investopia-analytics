import React from 'react';

interface PriceInfoProps {
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
}

const PriceInfo: React.FC<PriceInfoProps> = ({
  currentPrice,
  highPrice,
  lowPrice
}) => {
  return (
    <div className="flex gap-8 p-4 bg-[#131722] rounded-t-lg">
      <div className="price-item">
        <span className="text-sm text-[#787b86]">BTZ/USD</span>
        <span className="text-lg font-medium text-[#d1d4dc]">
          ${currentPrice.toFixed(5)}
        </span>
      </div>
      <div className="price-item">
        <span className="text-sm text-[#787b86]">24h High</span>
        <span className="text-lg font-medium text-[#d1d4dc]">
          ${highPrice.toFixed(5)}
        </span>
      </div>
      <div className="price-item">
        <span className="text-sm text-[#787b86]">24h Low</span>
        <span className="text-lg font-medium text-[#d1d4dc]">
          ${lowPrice.toFixed(5)}
        </span>
      </div>
    </div>
  );
};

export default PriceInfo;