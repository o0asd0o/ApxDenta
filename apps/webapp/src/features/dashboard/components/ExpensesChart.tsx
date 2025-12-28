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
import React, { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const expenseData = [
  { name: 'Rental Cost', value: 30, amount: 26000, color: '#3b82f6' },
  { name: 'Wages', value: 22, amount: 16500, color: '#10b981' },
  { name: 'Medical Equipment', value: 20, amount: 15640, color: '#f59e0b' },
  { name: 'Supplies', value: 18, amount: 13564, color: '#ef4444' },
  { name: 'Promotion Costs', value: 8, amount: 6464, color: '#8b5cf6' },
  { name: 'Other', value: 2, amount: 1664, color: '#6b7280' },
];

const topExpenses = [
  { name: 'Rental Cost', amount: 26000, color: '#3b82f6' },
  { name: 'Wages', amount: 16500, color: '#10b981' },
  { name: 'Medical Equipment', amount: 15640, color: '#f59e0b' },
  { name: 'Supplies', amount: 13564, color: '#ef4444' },
];

const ExpensesChart: React.FC = () => {
  const [period, setPeriod] = useState('6');
  const totalExpense = 80832;

  return (
    <Card className="gap-4 p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pl-1 pr-0">
        <p className="text-sm font-bold text-gray-900">Expenses</p>
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
        <div className="flex items-center gap-4">
          {/* Donut Chart */}
          <div className="relative w-[140px] h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell
                      key={`cell-${
                        // biome-ignore lint: index used only for key generation
                        index
                      }`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[10px] text-gray-500">Total Expense</p>
              <p className="text-lg font-bold text-gray-900">
                ${totalExpense.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-1.5">
            {expenseData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 truncate max-w-[100px]">
                    {item.name}
                  </span>
                </div>
                <span className="text-gray-900 font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Expenses */}
        <div className="pt-2 border-t">
          <p className="text-xs text-gray-500 uppercase font-bold mb-3">
            Top Expense
          </p>
          <div className="grid grid-cols-2 gap-3">
            {topExpenses.map((expense) => (
              <div key={expense.name} className="flex items-center gap-2">
                <span
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: expense.color }}
                />
                <div>
                  <p className="text-xs text-gray-500">{expense.name}</p>
                  <p className="text-sm font-bold text-gray-900">
                    ${expense.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesChart;
