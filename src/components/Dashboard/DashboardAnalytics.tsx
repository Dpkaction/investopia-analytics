import React from 'react';
import { Card } from '@/components/ui/card';

const DashboardAnalytics = () => {
  const COIN_VALUE = 0.00035; // Fixed coin value in dollars

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Price</h3>
        <p className="text-2xl font-semibold">${COIN_VALUE}</p>
        <p className="text-sm text-muted-foreground mt-1">Per BTZ Token</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">24h Volume</h3>
        <p className="text-2xl font-semibold">1,234 BTZ</p>
        <p className="text-sm text-green-500">+5.67%</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">Market Cap</h3>
        <p className="text-2xl font-semibold">$350,000</p>
        <p className="text-sm text-muted-foreground mt-1">Total Value Locked</p>
      </Card>
    </div>
  );
};

export default DashboardAnalytics;