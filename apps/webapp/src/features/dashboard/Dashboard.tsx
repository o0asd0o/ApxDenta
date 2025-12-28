import React from 'react';
import CashflowChart from './components/CashflowChart';
import ExpensesChart from './components/ExpensesChart';
import IncomeExpenseChart from './components/IncomeExpenseChart';
import PatientsCard from './components/PatientsCard';
import PopularTreatmentsCard from './components/PopularTreatmentsCard';
import StockAvailabilityCard from './components/StockAvailabilityCard';

const Dashboard: React.FC = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours();

  const getGreeting = () => {
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, John!
        </h1>
        <p className="text-sm text-gray-500 mt-1">{formatDate(currentDate)}</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cashflow Chart - spans 2 columns */}
        <CashflowChart />

        {/* Expenses Chart */}
        <ExpensesChart />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income & Expense - taller card */}
        <div className="min-h-[370px]">
          <IncomeExpenseChart />
        </div>

        {/* Patients & Popular Treatments - stacked */}
        <div className="flex flex-col gap-6 min-h-[370px]">
          <PatientsCard />
          <PopularTreatmentsCard />
        </div>

        {/* Stock Availability - taller card */}
        <div className="min-h-[370px]">
          <StockAvailabilityCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
