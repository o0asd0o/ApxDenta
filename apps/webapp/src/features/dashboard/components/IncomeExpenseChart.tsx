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
import { TrendingDown, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const incomeExpenseData = [
  { month: 'JAN', income: 4800, expense: 3200 },
  { month: 'FEB', income: 5200, expense: 4100 },
  { month: 'MAR', income: 7500, expense: 5800 },
  { month: 'APR', income: 4200, expense: 3100 },
  { month: 'MAY', income: 5800, expense: 4500 },
  { month: 'JUN', income: 6200, expense: 5100 },
];

const IncomeExpenseChart: React.FC = () => {
  const [period, setPeriod] = useState('6');

  return (
    <Card className="gap-4 h- p-4 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pl-1 pr-0">
        <p className="text-sm font-bold text-gray-900">Income & Expense</p>
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
        {/* Summary */}
        <div className="flex items-center gap-6 w-full justify-between px-2">
          <div className="flex items-start gap-2 flex-col">
            <div className="relative flex pl-5">
              <span className="w-3 h-1 rounded-full bg-emerald-500 absolute left-0 top-1.5" />
              <span className="text-xs text-gray-500 font-bold uppercase">
                Total Income
              </span>
            </div>
            <div className="flex gap-1 pl-5">
              <span className="text-sm font-bold text-gray-900">$1,412</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                <TrendingUp className="size-3" />
                4.51%
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 flex-col">
            <div className="relative flex pl-5">
              <span className="w-3 h-1 rounded-full bg-amber-500 absolute left-0 top-1.5" />
              <span className="text-xs text-gray-500 font-bold uppercase">
                Total Expenses
              </span>
            </div>

            <div className="flex gap-1 pl-5">
              <span className="text-sm font-bold text-gray-900">$612.34</span>
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-red-500">
                <TrendingDown className="size-3" />
                2.41%
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={incomeExpenseData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              barGap={4}
            >
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
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  '',
                ]}
              />
              <Bar
                dataKey="income"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
                barSize={20}
                name="Income"
              />
              <Bar
                dataKey="expense"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                barSize={20}
                name="Expense"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;
