import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const TOTAL_LENGTH = 26;
const PASSPHRASE_PATTERN = /^.{5}021au.*120btz.{3}$/;

const PassphraseForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [passphrase, setPassphrase] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passphrase.length !== TOTAL_LENGTH || !PASSPHRASE_PATTERN.test(passphrase)) {
      toast({
        title: "Invalid Passphrase",
        description: "Please enter a valid 26-digit passphrase with the correct pattern.",
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
          placeholder="Enter 26-digit passphrase"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Format: XXXXX021auXXXXXXXXXXXX120btzXXX (26 digits)
        </p>
      </div>
      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
};

export default PassphraseForm;