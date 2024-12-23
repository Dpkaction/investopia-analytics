import React from 'react';

interface ChartHeaderProps {
  currentPrice: number;
}

const ChartHeader: React.FC<ChartHeaderProps> = ({ currentPrice }) => {
  return (
    <div className="flex justify-between items-center mb-4 text-[#d1d4dc]">
      <div className="flex gap-8">
        <div>
          <span className="text-xs text-[#787b86]">BTZ/USD</span>
          <div className="text-lg font-medium">${currentPrice.toFixed(3)}</div>
        </div>
        <div>
          <span className="text-xs text-[#787b86]">24h Change</span>
          <div className="text-lg font-medium text-green-500">+0.005 (+1.45%)</div>
        </div>
        <div>
          <span className="text-xs text-[#787b86]">24h High</span>
          <div className="text-lg font-medium">${(currentPrice * 1.01).toFixed(3)}</div>
        </div>
        <div>
          <span className="text-xs text-[#787b86]">24h Low</span>
          <div className="text-lg font-medium">${(currentPrice * 0.99).toFixed(3)}</div>
        </div>
      </div>
    </div>
  );
};

export default ChartHeader;