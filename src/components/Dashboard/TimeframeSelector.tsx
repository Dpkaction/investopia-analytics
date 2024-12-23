import React from 'react';

interface TimeframeSelectorProps {
  currentTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  currentTimeframe,
  onTimeframeChange
}) => {
  const timeframes = ['5m', '15m', '30m', '1h', '4h', '1d', '1w'];

  return (
    <div className="flex gap-1 bg-[#2a2e39] p-1 rounded-md">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onTimeframeChange(timeframe)}
          className={`px-3 py-1 text-sm rounded ${
            currentTimeframe === timeframe
              ? 'bg-[#363a45] text-[#d1d4dc]'
              : 'text-[#787b86] hover:bg-[#363a45] hover:text-[#d1d4dc]'
          }`}
        >
          {timeframe.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;