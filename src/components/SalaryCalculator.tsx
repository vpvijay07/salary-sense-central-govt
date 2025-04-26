
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import SalaryInputs from './salary/SalaryInputs';
import SalaryResults from './salary/SalaryResults';
import { DA_RATES, HRA_RATES, TA_RATES } from '@/constants/salaryConstants';
import { SalaryState } from '@/types/salary';

const SalaryCalculator = () => {
  const [state, setState] = useState<SalaryState>({
    basicPay: 0,
    payLevel: 'Level 1',
    daRate: 'Current (50%)',
    customDaRate: 0,
    hraClass: 'X Class (30%)',
    taType: 'Normal',
    da: 0,
    hra: 0,
    ta: 0,
    total: 0
  });

  useEffect(() => {
    // Calculate DA
    const effectiveDaRate = state.daRate === 'Custom' 
      ? state.customDaRate / 100 
      : DA_RATES[state.daRate as keyof typeof DA_RATES];
    const daAmount = state.basicPay * effectiveDaRate;

    // Calculate HRA
    const hraAmount = state.basicPay * HRA_RATES[state.hraClass as keyof typeof HRA_RATES];

    // Calculate TA with DA
    const baseTA = TA_RATES[state.taType as keyof typeof TA_RATES];
    const taWithDa = baseTA * (1 + effectiveDaRate);

    // Update state with new calculations
    setState(prev => ({
      ...prev,
      da: daAmount,
      hra: hraAmount,
      ta: taWithDa,
      total: state.basicPay + daAmount + hraAmount + taWithDa
    }));
  }, [state.basicPay, state.daRate, state.customDaRate, state.hraClass, state.taType]);

  const handleStateChange = (key: keyof SalaryState, value: number | string) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          7th CPC Salary Calculator
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Salary Inputs</h2>
            <SalaryInputs state={state} onStateChange={handleStateChange} />
          </Card>

          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Salary Components</h2>
            <SalaryResults state={state} />
          </Card>
        </div>

        <Card className="p-6 shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Basic Pay ranges are as per 7th Pay Commission Pay Matrix</li>
            <li>DA rates are updated periodically by the government</li>
            <li>HRA rates: X Class (30%), Y Class (20%), Z Class (10%)</li>
            <li>Transport Allowance varies for normal cities and cities with higher TPTA rates</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default SalaryCalculator;
