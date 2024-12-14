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
      const newData = generateChartData(coinValue);
      setData(newData);
    } else {
      setData([]);
    }
  }, [coinValue, showLine]);

  const generateChartData = (value: number) => {
    const data = [];
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const steps = 20;
    
    for (let i = 0; i < steps; i++) {
      const progress = i / (steps - 1);
      data.push({
        month: months[Math.floor((progress * (months.length - 1)))],
        value: progress * value,
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
          <XAxis dataKey="month" />
          <YAxis domain={[0, 'auto']} />
          <Tooltip />
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