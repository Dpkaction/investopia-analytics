import React, { useState, useEffect } from 'react';
import { Line } from 'recharts';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TradingChartProps {
  coinValue: number;
  showLine: boolean;
}

const TradingChart: React.FC<TradingChartProps> = ({ coinValue, showLine }) => {
  const [data, setData] = useState<any[]>([]);
  const [timeFrame, setTimeFrame] = useState('5min');

  useEffect(() => {
    if (showLine) {
      const newData = generateChartData(coinValue, timeFrame);
      setData(newData);
    } else {
      setData([]);
    }
  }, [coinValue, showLine, timeFrame]);

  const generateChartData = (value: number, timeFrame: string) => {
    const data = [];
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const steps = 20;
    const maxInvestors = 100000;
    
    // Calculate time intervals based on timeFrame
    const getTimePoints = () => {
      switch(timeFrame) {
        case '5min':
          return Array.from({length: steps}, (_, i) => `${i * 5}m`);
        case '15min':
          return Array.from({length: steps}, (_, i) => `${i * 15}m`);
        case '30min':
          return Array.from({length: steps}, (_, i) => `${i * 30}m`);
        case '1h':
          return Array.from({length: steps}, (_, i) => `${i}h`);
        case '1d':
          return Array.from({length: steps}, (_, i) => `Day ${i + 1}`);
        case '1M':
          return months;
        case '1Y':
          return Array.from({length: 12}, (_, i) => months[i % months.length]);
        default:
          return Array.from({length: steps}, (_, i) => `${i * 5}m`);
      }
    };

    const timePoints = getTimePoints();
    
    for (let i = 0; i < steps; i++) {
      const progress = i / (steps - 1);
      const currentValue = progress * value;
      
      // Calculate precise decimal values with 3 decimal places
      const formattedValue = Number(currentValue.toFixed(3));
      
      // Calculate investors based on progress (0 to maxInvestors)
      const investors = Math.floor(progress * maxInvestors);
      
      data.push({
        time: timePoints[i],
        value: formattedValue,
        investors: investors,
      });
    }
    return data;
  };

  const formatYAxis = (value: number) => {
    return value.toFixed(3);
  };

  const formatInvestors = (value: number) => {
    return `${(value).toLocaleString()} inv.`;
  };

  return (
    <Card className="chart-container">
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          {['5min', '15min', '30min', '1h', '1d', '1M', '1Y'].map((time) => (
            <button
              key={time}
              onClick={() => setTimeFrame(time)}
              className={`px-2 py-1 rounded ${
                timeFrame === time
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            label={{ 
              value: 'Investors', 
              position: 'bottom',
              offset: 0
            }}
          />
          <YAxis 
            domain={[0, 'auto']}
            tickFormatter={formatYAxis}
            label={{ 
              value: 'Price', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10
            }}
          />
          <Tooltip 
            formatter={(value: number) => [
              `Price: ${value.toFixed(3)}`,
              `Investors: ${formatInvestors(data[data.findIndex(d => d.value === value)]?.investors || 0)}`
            ]}
          />
          {showLine && (
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
              animationDuration={1000}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TradingChart;