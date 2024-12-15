import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TradingChart from '@/components/Dashboard/TradingChart';
import MetricsCard from '@/components/Dashboard/MetricsCard';
import PassphraseForm from '@/components/Account/PassphraseForm';
import AnalyticsCard from '@/components/Analytics/AnalyticsCard';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [coinValue, setCoinValue] = useState('0');
  const [showLine, setShowLine] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleBuy = () => {
    // Add buy logic here
    toast({
      title: "Buy Order Placed",
      description: `Successfully placed buy order for ${coinValue} BTZ`,
      variant: "default",
    });
  };

  const handleSell = () => {
    // Add sell logic here
    toast({
      title: "Sell Order Placed",
      description: `Successfully placed sell order for ${coinValue} BTZ`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Tabs defaultValue="dashboard" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="account">Your Account</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">Trading Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <MetricsCard
              title="Coin Value"
              value={coinValue}
              onChange={(value) => {
                setCoinValue(value);
                setShowLine(true);
              }}
              isInput
            />
            <MetricsCard title="Total Valuation" value="$1,234,567" />
            <MetricsCard title="Total Investors" value="1,234" />
          </div>

          <TradingChart coinValue={Number(coinValue)} showLine={showLine} />

          <div className="flex justify-center space-x-4 mt-8">
            <button onClick={handleBuy} className="buy-button">
              Buy BTZ
            </button>
            <button onClick={handleSell} className="sell-button">
              Sell BTZ
            </button>
          </div>
        </TabsContent>

        <TabsContent value="account">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <PassphraseForm onLogin={() => setIsLoggedIn(true)} />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetricsCard title="BTZ Balance" value="1 BTZ" />
                <div className="flex items-center justify-end">
                  <button className="sell-button">
                    Sell BTZ
                  </button>
                </div>
              </div>
              <TradingChart coinValue={Number(coinValue)} showLine={showLine} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnalyticsCard
              title="Visitors"
              value="12,345"
              change="+12.3%"
            />
            <AnalyticsCard
              title="Transactions"
              value="1,234"
              change="+5.7%"
            />
            <AnalyticsCard
              title="Community Members"
              value="5,678"
              change="+8.9%"
            />
            <AnalyticsCard
              title="Buyer/Seller Ratio"
              value="91% / 9%"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;