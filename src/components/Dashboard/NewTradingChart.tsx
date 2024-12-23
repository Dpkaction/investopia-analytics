import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Card } from '@/components/ui/card';
import ChartHeader from './ChartHeader';
import TimeframeSelector from './TimeframeSelector';
import { generatePriceData, getChartOptions } from '@/utils/chartUtils';

interface NewTradingChartProps {
  coinValue: number;
}

const NewTradingChart: React.FC<NewTradingChartProps> = ({ coinValue }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [currentTimeframe, setCurrentTimeframe] = useState('5m');
  const [currentPrice, setCurrentPrice] = useState(coinValue);

  const updateChart = (timeframe: string) => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data = generatePriceData(timeframe);
    setCurrentPrice(data[data.length - 1].y);

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
      options: getChartOptions(timeframe)
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
  }, [currentTimeframe]);

  return (
    <Card className="chart-container bg-[#131722] p-6">
      <ChartHeader currentPrice={currentPrice} />
      <TimeframeSelector
        currentTimeframe={currentTimeframe}
        onTimeframeChange={setCurrentTimeframe}
      />
      <div className="h-[400px] relative mb-4">
        <canvas ref={chartRef} />
      </div>
    </Card>
  );
};

export default NewTradingChart;