import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import moment from 'moment';
import PriceInfo from './PriceInfo';
import TimeframeSelector from './TimeframeSelector';

interface TradingChartProps {
  coinValue: number;
}

const TradingChart: React.FC<TradingChartProps> = ({ coinValue }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [currentTimeframe, setCurrentTimeframe] = useState('5m');
  const [currentPrice, setCurrentPrice] = useState(coinValue);
  const [highPrice, setHighPrice] = useState(coinValue);
  const [lowPrice, setLowPrice] = useState(0);

  const generateTimePoints = (timeframe: string) => {
    const points = {
      '5m': 60,
      '15m': 40,
      '30m': 30,
      '1h': 24,
      '4h': 12,
      '1d': 30,
      '1w': 52
    }[timeframe] || 60;

    const unit = timeframe.includes('m') ? 'minutes' : 
                timeframe.includes('h') ? 'hours' : 
                timeframe.includes('d') ? 'days' : 'weeks';

    return Array.from({ length: points }, (_, i) => {
      return moment().subtract(points - i - 1, unit);
    });
  };

  const generatePriceData = (timeframe: string) => {
    const timePoints = generateTimePoints(timeframe);
    const data = [];
    const step = coinValue / timePoints.length;
    
    timePoints.forEach((time, index) => {
      // Generate gradually increasing price from 0 to coinValue
      const price = step * (index + 1);
      
      data.push({
        x: time,
        y: parseFloat(price.toFixed(5))
      });
    });

    return data;
  };

  const updateChart = (timeframe: string) => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data = generatePriceData(timeframe);
    
    setCurrentPrice(coinValue);
    setHighPrice(coinValue);
    setLowPrice(0);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'BTZ/USD',
          data: data,
          borderColor: '#2962FF',
          backgroundColor: 'transparent',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: timeframe.includes('m') ? 'minute' : 
                    timeframe.includes('h') ? 'hour' : 
                    timeframe.includes('d') ? 'day' : 'week'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#787b86'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#787b86',
              callback: (value) => `$${Number(value).toFixed(5)}`
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(19, 23, 34, 0.9)',
            titleColor: '#d1d4dc',
            bodyColor: '#d1d4dc',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => `Price: $${context.parsed.y.toFixed(5)}`
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    updateChart(currentTimeframe);
    const interval = setInterval(() => {
      updateChart(currentTimeframe);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentTimeframe]);

  return (
    <Card className="bg-[#131722] p-4">
      <PriceInfo
        currentPrice={currentPrice}
        highPrice={highPrice}
        lowPrice={lowPrice}
      />
      
      <div className="mb-4 mt-4">
        <TimeframeSelector
          currentTimeframe={currentTimeframe}
          onTimeframeChange={setCurrentTimeframe}
        />
      </div>

      <div className="h-[400px] relative">
        <canvas ref={chartRef} />
      </div>
    </Card>
  );
};

export default TradingChart;