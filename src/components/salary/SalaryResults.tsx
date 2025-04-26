
import ResultRow from './ResultRow';
import { SalaryState } from '@/types/salary';

interface SalaryResultsProps {
  state: SalaryState;
}

const SalaryResults = ({ state }: SalaryResultsProps) => {
  return (
    <div className="space-y-4">
      <ResultRow label="Basic Pay" value={state.basicPay} />
      <ResultRow 
        label="Dearness Allowance (DA)" 
        value={state.da} 
        rate={state.daRate === 'Custom' ? `${state.customDaRate}%` : state.daRate} 
      />
      <ResultRow label="House Rent Allowance (HRA)" value={state.hra} rate={state.hraClass} />
      <ResultRow 
        label="Transport Allowance (TA with DA)" 
        value={state.ta} 
        rate={state.taType} 
      />
      <div className="border-t pt-4 mt-4">
        <ResultRow label="Total Salary" value={state.total} isBold={true} />
      </div>
    </div>
  );
};

export default SalaryResults;
