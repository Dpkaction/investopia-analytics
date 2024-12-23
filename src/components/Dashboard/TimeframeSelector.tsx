import React from 'react';

interface TimeframeSelectorProps {
  currentTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ currentTimeframe, onTimeframeChange }) => {
  const timeframes = ['5m', '15m', '30m', '1h', '4h', '1d', '1w'];

  return (
    <div className="mb-4">
      <div className="flex bg-[#2a2e39] rounded p-0.5 gap-0.5 w-fit">
        {timeframes.map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => onTimeframeChange(timeframe)}
            className={`px-3 py-1 rounded text-sm ${
              currentTimeframe === timeframe
                ? 'bg-[#363a45] text-[#d1d4dc]'
                : 'text-[#787b86]'
            }`}
          >
            {timeframe}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeframeSelector;