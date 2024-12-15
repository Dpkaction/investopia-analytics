import React from 'react';
import { Card } from '@/components/ui/card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  onChange?: (value: string) => void;
  isInput?: boolean;
  isFixed?: boolean;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, onChange, isInput, isFixed }) => {
  return (
    <Card className="metrics-card">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      {isInput && !isFixed ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-background border border-input rounded-md px-3 py-2 text-lg font-semibold"
          placeholder="Enter value..."
        />
      ) : (
        <p className="text-lg font-semibold">{value}</p>
      )}
    </Card>
  );
};

export default MetricsCard;