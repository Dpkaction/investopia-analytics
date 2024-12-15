import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Pickaxe } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: 'users' | 'miners';
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, change, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <Users className="w-4 h-4 text-muted-foreground" />;
      case 'miners':
        return <Pickaxe className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {getIcon()}
      </div>
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