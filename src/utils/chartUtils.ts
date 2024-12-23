import moment from 'moment';

export const generateTimePoints = (timeframe: string) => {
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

export const generatePriceData = (timeframe: string) => {
  const timePoints = generateTimePoints(timeframe);
  const data = [];
  let value = 0;

  timePoints.forEach(() => {
    value += 0.001 * (1 + Math.random() * 0.5);
    data.push({
      x: moment(),
      y: parseFloat(value.toFixed(3))
    });
  });

  return data;
};

export const getChartOptions = (timeframe: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  scales: {
    x: {
      type: 'time' as const,
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
        callback: (value: number) => value.toFixed(3)
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'rgba(19, 23, 34, 0.9)',
      titleColor: '#d1d4dc',
      bodyColor: '#d1d4dc',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (context: any) => `Price: ${context.parsed.y.toFixed(3)}`
      }
    }
  }
});