import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const TOTAL_LENGTH = 26;

const PassphraseForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [passphrase, setPassphrase] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passphrase.length !== TOTAL_LENGTH) {
      toast({
        title: "Invalid Passphrase",
        description: "Please enter a 26-character passphrase.",
        variant: "destructive",
      });
      return;
    }
    
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Enter Passphrase</label>
        <Input
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-full"
          placeholder="Enter 26-character passphrase"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Please enter a 26-character passphrase
        </p>
      </div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
};

export default PassphraseForm;