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
    const steps = 20;
    
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
          return Array.from({length: steps}, (_, i) => `Month ${i + 1}`);
        case '1Y':
          return Array.from({length: steps}, (_, i) => `Year ${i + 1}`);
        default:
          return Array.from({length: steps}, (_, i) => `${i * 5}m`);
      }
    };

    const timePoints = getTimePoints();
    const volatility = 0.0001; // Small price fluctuation
    
    for (let i = 0; i < steps; i++) {
      // Generate price with small random fluctuations around the fixed value
      const randomFactor = 1 + (Math.random() - 0.5) * volatility;
      const price = value * randomFactor;
      
      data.push({
        time: timePoints[i],
        value: Number(price.toFixed(6)),
      });
    }
    return data;
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
              value: 'Time', 
              position: 'bottom',
              offset: 0
            }}
          />
          <YAxis 
            domain={[
              (dataMin: number) => dataMin * 0.9999,
              (dataMax: number) => dataMax * 1.0001
            ]}
            tickFormatter={(value) => value.toFixed(6)}
            label={{ 
              value: 'Price ($)', 
              angle: -90, 
              position: 'insideLeft',
              offset: 10
            }}
          />
          <Tooltip 
            formatter={(value: number) => [`$${value.toFixed(6)}`, 'Price']}
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