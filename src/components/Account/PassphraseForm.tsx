import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const TOTAL_LENGTH = 27;
const PREFIX = '021au';
const SUFFIX = '@120btz';
const EXAMPLE_PASSPHRASE = '021auXYZ123ABC456DEF789@120btz';

const PassphraseForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [passphrase, setPassphrase] = useState('');

  const validatePassphrase = (value: string): boolean => {
    if (value.length !== TOTAL_LENGTH) return false;
    
    // Check if passphrase starts with "021au" after first 3 characters
    const prefix = value.substring(3, 8);
    if (prefix !== PREFIX) return false;
    
    // Check if passphrase ends with "@120btz"
    const suffix = value.substring(TOTAL_LENGTH - 7);
    if (suffix !== SUFFIX) return false;
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassphrase(passphrase)) {
      toast({
        title: "Invalid Passphrase",
        description: "Please enter a valid 27-character passphrase with the required format.",
        variant: "destructive",
      });
      return;
    }
    
    onLogin();
  };

  const handleNewUserClick = () => {
    toast({
      title: "Registration Coming Soon",
      description: "New user registration will be available soon. Please check back later.",
    });
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
          placeholder="Enter 27-character passphrase"
        />
        <p className="text-sm text-muted-foreground mt-2">
          Example format: {EXAMPLE_PASSPHRASE}
        </p>
      </div>
      <Button type="submit" className="w-full">Login</Button>
      <p className="text-sm text-center mt-4">
        New user?{" "}
        <button
          type="button"
          onClick={handleNewUserClick}
          className="text-primary hover:underline focus:outline-none"
        >
          Click here to register
        </button>
      </p>
    </form>
  );
};

export default PassphraseForm;