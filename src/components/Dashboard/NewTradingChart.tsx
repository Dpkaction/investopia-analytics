import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import moment from 'moment';
import { Card } from '@/components/ui/card';

interface NewTradingChartProps {
  coinValue: number;
}

const NewTradingChart: React.FC<NewTradingChartProps> = ({ coinValue }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [currentTimeframe, setCurrentTimeframe] = useState('5m');

  const generateTimePoints = (timeframe: string) => {
    const points: { [key: string]: number } = {
      '5m': 60,
      '15m': 40,
      '30m': 30,
      '1h': 24,
      '4h': 12,
      '1d': 30,
      '1w': 52
    };

    const unit = timeframe.includes('m') ? 'minutes' : 
                timeframe.includes('h') ? 'hours' : 
                timeframe.includes('d') ? 'days' : 'weeks';

    return Array.from({ length: points[timeframe] || 60 }, (_, i) => {
      return moment().subtract(points[timeframe] - i - 1, unit);
    });
  };

  const generatePriceData = (timeframe: string) => {
    const timePoints = generateTimePoints(timeframe);
    const data = [];
    let value = 0;

    timePoints.forEach(() => {
      value += 0.00001 * (1 + Math.random() * 0.5);
      if (value > coinValue) {
        value = coinValue;
      }
      data.push({
        x: moment(),
        y: parseFloat(value.toFixed(5))
      });
    });

    return data;
  };

  const updateChart = (timeframe: string) => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data = generatePriceData(timeframe);

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
          backgroundColor: 'rgba(41, 98, 255, 0.1)',
          borderWidth: 2,
          fill: true,
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
              callback: function(value) {
                return value.toFixed(5);
              }
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
              label: function(context: any) {
                return `Price: ${context.parsed.y.toFixed(5)}`;
              }
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
    }, 5000);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      clearInterval(interval);
    };
  }, [currentTimeframe, coinValue]);

  return (
    <Card className="chart-container bg-[#131722] p-6">
      <div className="flex justify-between items-center mb-4 text-[#d1d4dc]">
        <div className="flex gap-8">
          <div>
            <span className="text-xs text-[#787b86]">BTZ/USD</span>
            <div className="text-lg font-medium">${coinValue.toFixed(5)}</div>
          </div>
          <div>
            <span className="text-xs text-[#787b86]">24h Change</span>
            <div className="text-lg font-medium text-green-500">+0.00005 (+1.45%)</div>
          </div>
          <div>
            <span className="text-xs text-[#787b86]">24h High</span>
            <div className="text-lg font-medium">${(coinValue * 1.01).toFixed(5)}</div>
          </div>
          <div>
            <span className="text-xs text-[#787b86]">24h Low</span>
            <div className="text-lg font-medium">${(coinValue * 0.99).toFixed(5)}</div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex bg-[#2a2e39] rounded p-0.5 gap-0.5 w-fit">
          {['5m', '15m', '30m', '1h', '4h', '1d', '1w'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setCurrentTimeframe(timeframe)}
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

      <div className="h-[400px] relative mb-4">
        <canvas ref={chartRef} />
      </div>
    </Card>
  );
};

export default NewTradingChart;