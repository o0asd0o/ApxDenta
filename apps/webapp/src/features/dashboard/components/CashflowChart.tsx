import {
  Card,
  CardContent,
  CardHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components';
import { TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const monthlyData = [
  { month: 'JAN', value: 2100 },
  { month: 'FEB', value: 3200 },
  { month: 'MAR', value: 2800 },
  { month: 'APR', value: 4100 },
  { month: 'MAY', value: 3800 },
  { month: 'JUN', value: 7100, total: 710897 },
  { month: 'JUL', value: 8500 },
  { month: 'AUG', value: 9200 },
  { month: 'SEP', value: 8800 },
  { month: 'OCT', value: 10200 },
  { month: 'NOV', value: 11500 },
  { month: 'DEC', value: 12800 },
];

const CashflowChart: React.FC = () => {
  const [period, setPeriod] = useState('12');

  return (
    <Card className="col-span-2 gap-4 p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pl-1 pr-0">
        <p className="text-sm font-semibold text-gray-900">Cashflow</p>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px] h-7 text-xs">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Last 3 months</SelectItem>
            <SelectItem value="6">Last 6 months</SelectItem>
            <SelectItem value="12">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {/* Stats Row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Total Cash
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-semibold text-gray-900">
                $13,232
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="size-3" />
                4.51%
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500">January 2022 - December 2022</p>
        </div>

        {/* Chart */}
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={monthlyData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                tickFormatter={(value) => `${value / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e3a5f',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                }}
                labelStyle={{ color: 'white' }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  'Total',
                ]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorCashflow)"
                dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashflowChart;
