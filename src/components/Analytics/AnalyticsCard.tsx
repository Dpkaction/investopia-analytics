import React from 'react';
import { Card } from '@/components/ui/card';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, change }) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      {change && (
        <p className={`text-sm mt-1 ${
          change.startsWith('+') ? 'text-success' : 'text-danger'
        }`}>
          {change}
        </p>
      )}
    </Card>
  );
};

export default AnalyticsCard;