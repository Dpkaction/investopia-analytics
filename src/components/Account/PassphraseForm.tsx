import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const TOTAL_LENGTH = 26;
const PREFIX = '021au';
const SUFFIX = '120btz';
const EXAMPLE_PASSPHRASE = '021auXXXXXXXXXXXXXXXX120btz';

const PassphraseForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [passphrase, setPassphrase] = useState('');

  const validatePassphrase = (value: string): boolean => {
    if (value.length !== TOTAL_LENGTH) return false;
    if (!value.substring(5, 10).includes(PREFIX)) return false;
    if (!value.substring(TOTAL_LENGTH - 8, TOTAL_LENGTH - 3).includes(SUFFIX)) return false;
    return true;
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validatePassphrase(passphrase)) {
      toast({
        title: "Invalid Passphrase",
        description: "Please enter a valid 26-character passphrase with the required format.",
        variant: "destructive",
      });
      return;
    }
    
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="passphrase" className="block text-sm font-medium mb-2">Enter Passphrase</label>
        <Input
          id="passphrase"
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="w-full"
          placeholder="Enter 26-character passphrase"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Example passphrase format: {EXAMPLE_PASSPHRASE}
        </p>
      </div>
      <Button type="submit" className="w-full">Login</Button>
      <div className="text-center">
        <a href="#" className="text-sm text-primary hover:underline">
          New user? Click here to register
        </a>
      </div>
    </form>
  );
};

export default PassphraseForm;