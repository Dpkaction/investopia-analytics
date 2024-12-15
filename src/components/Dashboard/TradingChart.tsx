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
  const [timeFrame, setTimeFrame] = useState('1d');

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
    const maxInvestors = 100000;
    const maxValue = Math.min(value, 0.035); // Cap at 0.035
    
    const getTimePoints = () => {
      switch(timeFrame) {
        case '1h':
          return Array.from({length: steps}, (_, i) => `${i * 3}min`);
        case '1d':
          return Array.from({length: steps}, (_, i) => `${i}h`);
        case '1w':
          return Array.from({length: steps}, (_, i) => `Day ${i + 1}`);
        default:
          return Array.from({length: steps}, (_, i) => `${i}h`);
      }
    };

    const timePoints = getTimePoints();
    
    for (let i = 0; i < steps; i++) {
      const progress = i / (steps - 1);
      const currentValue = progress * maxValue;
      const investors = Math.floor(progress * maxInvestors);
      
      data.push({
        time: timePoints[i],
        value: Number(currentValue.toFixed(3)),
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
      <div className="chart-area">
        <div className="flex justify-between mb-4">
          <div className="space-x-2">
            {['1h', '1d', '1w'].map((time) => (
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
          <LineChart data={data} margin={{ right: 50 }}>
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
              yAxisId="left"
              orientation="left"
              domain={[0, 'auto']}
              tickFormatter={formatInvestors}
              label={{ 
                value: 'Investors', 
                angle: -90, 
                position: 'insideLeft',
                offset: 10
              }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 0.035]}
              tickFormatter={formatYAxis}
              label={{ 
                value: 'Price', 
                angle: 90, 
                position: 'insideRight',
                offset: 10
              }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'value') {
                  return [`$${value.toFixed(3)}`, 'Price'];
                }
                return [`${formatInvestors(value)}`, 'Investors'];
              }}
            />
            {showLine && (
              <>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1000}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="investors"
                  stroke="#22C55E"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1000}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TradingChart;