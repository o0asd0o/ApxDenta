import { Button, Card, CardContent, CardHeader } from '@repo/ui/components';
import React from 'react';

const stockData = {
  totalAsset: 53000,
  totalProduct: 442,
  available: 70,
  lowStock: 20,
  outOfStock: 10,
};

const lowStockItems = [
  { name: 'Dental Brush', qty: 3 },
  { name: 'Charmflex Regular', qty: 2 },
];

const StockAvailabilityCard: React.FC = () => {
  return (
    <Card className="gap-4 h-full p-4">
      <CardHeader className="pb-2 pl-1 pr-0">
        <p className="text-sm font-semibold text-gray-900">
          Stock Availability
        </p>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {/* Stats */}
        <div className="flex gap-6">
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Total Asset
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              ${stockData.totalAsset.toLocaleString()}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Total Product
            </p>
            <p className="text-2xl font-semibold text-gray-900">
              {stockData.totalProduct}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
            <div
              className="bg-emerald-500 transition-all duration-300"
              style={{ width: `${stockData.available}%` }}
            />
            <div
              className="bg-amber-500 transition-all duration-300"
              style={{ width: `${stockData.lowStock}%` }}
            />
            <div
              className="bg-rose-500 transition-all duration-300"
              style={{ width: `${stockData.outOfStock}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-gray-600">Low Stock</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-gray-600">Out of stock</span>
            </div>
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 uppercase font-semibold">
              Low Stock
            </p>
            <Button
              variant="ghost"
              className="text-xs text-blue-600 h-auto p-0 hover:bg-transparent hover:text-blue-700"
            >
              View all
            </Button>
          </div>
          <div className="space-y-2">
            {lowStockItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <span className="text-sm text-gray-700">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Qty: {item.qty}</span>
                  <Button
                    variant="ghost"
                    className="text-xs text-blue-600 h-auto p-0 hover:bg-transparent hover:text-blue-700"
                  >
                    Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockAvailabilityCard;
