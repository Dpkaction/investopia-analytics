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
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-semibold mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${
              change.startsWith('+') ? 'text-success' : 'text-danger'
            }`}>
              {change}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          {icon === 'users' && <Users className="h-6 w-6 text-primary" />}
          {icon === 'miners' && <Pickaxe className="h-6 w-6 text-primary" />}
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsCard;