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
    
    const getTimePoints = () => {
      switch(timeFrame) {
        case '1d':
          return Array.from({length: steps}, (_, i) => `Day ${i + 1}`);
        case '1w':
          return Array.from({length: steps}, (_, i) => `Week ${Math.floor(i/7) + 1}, Day ${(i % 7) + 1}`);
        case '1M':
          return Array.from({length: steps}, (_, i) => `Month 1, Day ${i + 1}`);
        default:
          return Array.from({length: steps}, (_, i) => `Day ${i + 1}`);
      }
    };

    const timePoints = getTimePoints();
    
    for (let i = 0; i < steps; i++) {
      const progress = i / (steps - 1);
      const currentValue = progress * value;
      
      const formattedValue = Number(currentValue.toFixed(3));
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
    <Card className="chart-container grid grid-cols-1 md:grid-cols-[1fr_250px]">
      <div className="chart-area">
        <div className="flex justify-between mb-4">
          <div className="space-x-2">
            {['1d', '1w', '1M'].map((time) => (
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
              yAxisId="left"
              orientation="left"
              stroke="transparent"
              tickFormatter={formatYAxis}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              domain={[0, 'auto']}
              tickFormatter={formatYAxis}
              label={{ 
                value: 'Price', 
                angle: 90, 
                position: 'insideRight',
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
                yAxisId="right"
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
      </div>
      <div className="pricing-details bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-semibold mb-4">Price Details</h3>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-muted-foreground">{item.time}</span>
              <span className="font-medium">${item.value.toFixed(3)}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TradingChart;