import React from 'react';
import { Button } from '@/components/ui/button';

interface TradingActionsProps {
  isConnected: boolean;
  onConnectWallet: () => Promise<void>;
  onOpenBuyDialog: () => void;
  onSell: () => void;
}

const TradingActions: React.FC<TradingActionsProps> = ({
  isConnected,
  onConnectWallet,
  onOpenBuyDialog,
  onSell,
}) => {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      {!isConnected && (
        <Button
          onClick={onConnectWallet}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Connect Wallet
        </Button>
      )}
      <Button 
        onClick={onOpenBuyDialog}
        className="bg-green-500 text-white hover:bg-green-600"
      >
        Buy BTZ
      </Button>
      <Button 
        onClick={onSell}
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Sell BTZ
      </Button>
    </div>
  );
};

export default TradingActions;