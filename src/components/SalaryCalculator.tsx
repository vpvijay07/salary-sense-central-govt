import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IndianRupee } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Pay Level ranges as per 7th CPC
const PAY_LEVELS = {
  'Level 1': { min: 18000, max: 56900 },
  'Level 2': { min: 19900, max: 63200 },
  'Level 3': { min: 21700, max: 69100 },
  'Level 4': { min: 25500, max: 81100 },
  'Level 5': { min: 29200, max: 92300 },
  'Level 6': { min: 35400, max: 112400 },
  'Level 7': { min: 44900, max: 142400 },
  'Level 8': { min: 47600, max: 151100 },
  'Level 9': { min: 53100, max: 167800 },
  'Level 10': { min: 56100, max: 177500 },
};

// Updated DA rates
const DA_RATES = {
  'Current (50%)': 0.50,
  'Previous (46%)': 0.46,
  'Custom': -1, // Special value to indicate custom input
};

// Updated HRA rates based on city classification
const HRA_RATES = {
  'X Class (27%)': 0.27,
  'Y Class (18%)': 0.18,
  'Z Class (9%)': 0.09,
};

// Transport Allowance rates
const TA_RATES = {
  'Normal': 3600,
  'High TPTA': 7200,
};

const SalaryCalculator = () => {
  const [basicPay, setBasicPay] = useState<number>(0);
  const [payLevel, setPayLevel] = useState<string>('Level 1');
  const [daRate, setDaRate] = useState<string>('Current (50%)');
  const [customDaRate, setCustomDaRate] = useState<number>(0);
  const [hraClass, setHraClass] = useState<string>('X Class (27%)');
  const [taType, setTaType] = useState<string>('Normal');
  const [da, setDa] = useState<number>(0);
  const [hra, setHra] = useState<number>(0);
  const [ta, setTa] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Calculate DA
    const effectiveDaRate = daRate === 'Custom' 
      ? customDaRate / 100 
      : DA_RATES[daRate as keyof typeof DA_RATES];
    const daAmount = basicPay * effectiveDaRate;
    setDa(daAmount);

    // Calculate HRA
    const hraAmount = basicPay * HRA_RATES[hraClass as keyof typeof HRA_RATES];
    setHra(hraAmount);

    // Calculate TA with DA
    const baseTA = TA_RATES[taType as keyof typeof TA_RATES];
    const taWithDa = baseTA * (1 + effectiveDaRate);
    setTa(taWithDa);

    // Calculate total
    setTotal(basicPay + daAmount + hraAmount + taWithDa);
  }, [basicPay, daRate, customDaRate, hraClass, taType]);

  const handlePayLevelChange = (value: string) => {
    setPayLevel(value);
    setBasicPay(PAY_LEVELS[value as keyof typeof PAY_LEVELS].min);
  };

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          7th CPC Salary Calculator
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Salary Inputs</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="payLevel">Pay Level</Label>
                <Select value={payLevel} onValueChange={handlePayLevelChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Pay Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(PAY_LEVELS).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level} (₹{PAY_LEVELS[level as keyof typeof PAY_LEVELS].min} - ₹{PAY_LEVELS[level as keyof typeof PAY_LEVELS].max})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="basicPay">Basic Pay</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                  <Input
                    id="basicPay"
                    type="number"
                    min={PAY_LEVELS[payLevel as keyof typeof PAY_LEVELS].min}
                    max={PAY_LEVELS[payLevel as keyof typeof PAY_LEVELS].max}
                    placeholder="Enter Basic Pay"
                    className="pl-10"
                    value={basicPay || ''}
                    onChange={(e) => setBasicPay(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="daRate">DA Rate</Label>
                <Select value={daRate} onValueChange={setDaRate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select DA Rate" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(DA_RATES).map((rate) => (
                      <SelectItem key={rate} value={rate}>
                        {rate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {daRate === 'Custom' && (
                <div>
                  <Label htmlFor="customDa">Custom DA Rate (%)</Label>
                  <div className="relative">
                    <Input
                      id="customDa"
                      type="number"
                      min={0}
                      max={100}
                      placeholder="Enter DA percentage"
                      value={customDaRate || ''}
                      onChange={(e) => setCustomDaRate(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="hraClass">City Classification</Label>
                <Select value={hraClass} onValueChange={setHraClass}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select City Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(HRA_RATES).map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="taType">Transport Allowance</Label>
                <Select value={taType} onValueChange={setTaType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select TA Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(TA_RATES).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type} (₹{TA_RATES[type as keyof typeof TA_RATES]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Salary Components</h2>
            <div className="space-y-4">
              <ResultRow label="Basic Pay" value={basicPay} />
              <ResultRow 
                label="Dearness Allowance (DA)" 
                value={da} 
                rate={daRate === 'Custom' ? `${customDaRate}%` : daRate} 
              />
              <ResultRow label="House Rent Allowance (HRA)" value={hra} rate={hraClass} />
              <ResultRow 
                label="Transport Allowance (TA with DA)" 
                value={ta} 
                rate={taType} 
              />
              <div className="border-t pt-4 mt-4">
                <ResultRow label="Total Salary" value={total} isBold={true} />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Information</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Basic Pay ranges are as per 7th Pay Commission Pay Matrix</li>
            <li>DA rates are updated periodically by the government</li>
            <li>HRA rates: X Class (24%), Y Class (16%), Z Class (8%)</li>
            <li>Transport Allowance varies for normal cities and cities with higher TPTA rates</li>
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
