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

const patientsData = {
  newPatients: 21,
  newPatientsPercent: 36.52,
  returningPatients: 142,
  returningPatientsPercent: 61.41,
};

const PatientsCard: React.FC = () => {
  const [period, setPeriod] = useState('month');

  // Generate stripes for the progress bars
  const generateStripes = (count: number, filled: boolean, prefix: string) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: index used only for static stripe generation
        key={`${prefix}-${i}`}
        className={`w-1 h-3 rounded-[2px] ${
          filled ? 'bg-blue-500' : 'bg-gray-200'
        }`}
      />
    ));
  };

  const newPatientsStripes = Math.round(patientsData.newPatientsPercent / 5);
  const returningPatientsStripes = Math.round(
    patientsData.returningPatientsPercent / 3,
  );

  return (
    <Card className="gap-2 p-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pl-1 pr-0">
        <p className="text-sm font-semibold text-gray-900">Patients</p>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px] h-7 text-xs">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-0">
        {/* Patient Stats */}
        <div className="flex">
          {/* New Patients */}
          <div className="flex-1 pr-4 border-r border-gray-200">
            <p className="text-2xl font-semibold text-gray-900">
              {patientsData.newPatients}
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-500">
                {patientsData.newPatientsPercent}%
              </p>
              <p className="text-xs text-gray-400 font-medium">New patients</p>
            </div>
            {/* Striped Progress */}
            <div className="flex gap-0.5 mt-3">
              {generateStripes(newPatientsStripes, true, 'new-filled')}
              {generateStripes(20 - newPatientsStripes, false, 'new-empty')}
            </div>
          </div>

          {/* Returning Patients */}
          <div className="flex-1 pl-4">
            <p className="text-2xl font-semibold text-gray-900">
              {patientsData.returningPatients}
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-500">
                {patientsData.returningPatientsPercent}%
              </p>
              <p className="text-xs text-gray-400 font-medium">
                Returning patients
              </p>
            </div>
            {/* Striped Progress */}
            <div className="flex gap-0.5 mt-3">
              {generateStripes(
                returningPatientsStripes,
                true,
                'returning-filled',
              )}
              {generateStripes(
                20 - returningPatientsStripes,
                false,
                'returning-empty',
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientsCard;
