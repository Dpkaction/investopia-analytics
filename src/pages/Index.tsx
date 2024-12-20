import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TradingChart from '@/components/Dashboard/TradingChart';
import MetricsCard from '@/components/Dashboard/MetricsCard';
import PassphraseForm from '@/components/Account/PassphraseForm';
import AnalyticsCard from '@/components/Analytics/AnalyticsCard';
import { useToast } from "@/hooks/use-toast";
import { buyBTZ, connectWallet } from '@/utils/web3';

const Index = () => {
  const [coinValue, setCoinValue] = useState('0');
  const [showLine, setShowLine] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [buyAmount, setBuyAmount] = useState('');
  const { toast } = useToast();

  const handleConnectWallet = async () => {
    try {
      const { account } = await connectWallet();
      setWalletAddress(account);
      setIsConnected(true);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${account.slice(0, 6)}...${account.slice(-4)}`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleBuySubmit = async () => {
    try {
      if (!isConnected) {
        await handleConnectWallet();
      }
      
      if (Number(buyAmount) <= 0) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid amount greater than 0",
          variant: "destructive",
        });
        return;
      }

      const receipt = await buyBTZ(buyAmount);
      setBuyDialogOpen(false);
      setBuyAmount('');
      toast({
        title: "Buy Order Placed",
        description: `Successfully bought ${buyAmount} BTZ. Transaction hash: ${receipt.hash.slice(0, 6)}...${receipt.hash.slice(-4)}`,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Transaction Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSell = () => {
    toast({
      title: "Sell Order Placed",
      description: `Successfully placed sell order for ${coinValue} BTZ`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy BTZ Tokens</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="number"
              placeholder="Enter amount to buy"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBuySubmit}>
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            {!isConnected && (
              <button
                onClick={handleConnectWallet}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90"
              >
                Connect Wallet
              </button>
            )}
            <button 
              onClick={() => setBuyDialogOpen(true)} 
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
            >
              Buy BTZ
            </button>
            <button 
              onClick={handleSell}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
            >
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
              title="Owners"
              value="120"
              change="+12.3%"
              icon="users"
            />
            <AnalyticsCard
              title="Mining Groups"
              value="20+"
              change="+5.7%"
              icon="miners"
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