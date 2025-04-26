
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
import { PAY_LEVELS, DA_RATES, HRA_RATES, TA_RATES } from "@/constants/salaryConstants";
import { SalaryState } from "@/types/salary";

interface SalaryInputsProps {
  state: SalaryState;
  onStateChange: (key: keyof SalaryState, value: number | string) => void;
}

const SalaryInputs = ({ state, onStateChange }: SalaryInputsProps) => {
  const handlePayLevelChange = (value: string) => {
    onStateChange('payLevel', value);
    onStateChange('basicPay', PAY_LEVELS[value as keyof typeof PAY_LEVELS].min);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="payLevel">Pay Level</Label>
        <Select value={state.payLevel} onValueChange={handlePayLevelChange}>
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
            min={PAY_LEVELS[state.payLevel as keyof typeof PAY_LEVELS].min}
            max={PAY_LEVELS[state.payLevel as keyof typeof PAY_LEVELS].max}
            placeholder="Enter Basic Pay"
            className="pl-10"
            value={state.basicPay || ''}
            onChange={(e) => onStateChange('basicPay', Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="daRate">DA Rate</Label>
        <Select value={state.daRate} onValueChange={(value) => onStateChange('daRate', value)}>
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

      {state.daRate === 'Custom' && (
        <div>
          <Label htmlFor="customDa">Custom DA Rate (%)</Label>
          <div className="relative">
            <Input
              id="customDa"
              type="number"
              min={0}
              max={100}
              placeholder="Enter DA percentage"
              value={state.customDaRate || ''}
              onChange={(e) => onStateChange('customDaRate', Number(e.target.value))}
            />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="hraClass">City Classification</Label>
        <Select value={state.hraClass} onValueChange={(value) => onStateChange('hraClass', value)}>
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
        <Select value={state.taType} onValueChange={(value) => onStateChange('taType', value)}>
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
  );
};

export default SalaryInputs;
