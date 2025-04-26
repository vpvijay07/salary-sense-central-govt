
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IndianRupee } from "lucide-react";

const SalaryCalculator = () => {
  const [basicPay, setBasicPay] = useState<number>(0);
  const [da, setDa] = useState<number>(0);
  const [hra, setHra] = useState<number>(0);
  const [ta, setTa] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // Current DA rate (42% as of 2024)
  const DA_RATE = 0.42;
  // HRA rate (24% for X class cities)
  const HRA_RATE = 0.24;
  // TA fixed amount (can be adjusted based on city classification)
  const TA_AMOUNT = 3600;

  useEffect(() => {
    // Calculate DA
    const daAmount = basicPay * DA_RATE;
    setDa(daAmount);

    // Calculate HRA
    const hraAmount = basicPay * HRA_RATE;
    setHra(hraAmount);

    // Set TA (fixed amount)
    setTa(TA_AMOUNT);

    // Calculate total
    setTotal(basicPay + daAmount + hraAmount + TA_AMOUNT);
  }, [basicPay]);

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Central Government Salary Calculator
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Basic Pay Input</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="basicPay" className="text-gray-700">Basic Pay</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input
                    id="basicPay"
                    type="number"
                    placeholder="Enter Basic Pay"
                    className="pl-10"
                    value={basicPay || ''}
                    onChange={(e) => setBasicPay(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Salary Components</h2>
            <div className="space-y-4">
              <ResultRow label="Dearness Allowance (DA)" value={da} rate={`${DA_RATE * 100}%`} />
              <ResultRow label="House Rent Allowance (HRA)" value={hra} rate={`${HRA_RATE * 100}%`} />
              <ResultRow label="Transport Allowance (TA)" value={ta} rate="Fixed" />
              <div className="border-t pt-4 mt-4">
                <ResultRow label="Total Salary" value={total} isBold={true} />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>DA is calculated at {DA_RATE * 100}% of Basic Pay (current rate)</li>
            <li>HRA is calculated at {HRA_RATE * 100}% of Basic Pay (X class cities)</li>
            <li>Transport Allowance is fixed at ₹{TA_AMOUNT} per month</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

const ResultRow = ({ label, value, rate, isBold = false }: { 
  label: string;
  value: number;
  rate?: string;
  isBold?: boolean;
}) => (
  <div className={`flex justify-between items-center ${isBold ? 'font-bold text-lg' : ''}`}>
    <span className="text-gray-700">{label}</span>
    <div className="flex items-center gap-2">
      {rate && !isBold && (
        <span className="text-sm text-gray-500">({rate})</span>
      )}
      <span className="text-blue-900">₹{value.toFixed(2)}</span>
    </div>
  </div>
);

export default SalaryCalculator;
