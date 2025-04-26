
interface ResultRowProps {
  label: string;
  value: number;
  rate?: string;
  isBold?: boolean;
}

const ResultRow = ({ label, value, rate, isBold = false }: ResultRowProps) => (
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

export default ResultRow;
