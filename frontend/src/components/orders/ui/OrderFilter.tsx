'use client';

interface OrderFilterProps {
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

const OrderFilter = ({ statusFilter, onStatusChange }: OrderFilterProps) => {
  const statusOptions = [
    { value: 'all', label: 'All Orders', icon: '📦' },
    { value: 'delivered', label: 'Delivered', icon: '✅' },
    { value: 'processing', label: 'Processing', icon: '⏳' },
    { value: 'shipped', label: 'Shipped', icon: '🚚' },
    { value: 'cancelled', label: 'Cancelled', icon: '❌' }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {statusOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onStatusChange(option.value)}
          className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 ${
            statusFilter === option.value
              ? 'bg-gradient-to-r from-stone-600 to-amber-600 text-white shadow-lg'
              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
          }`}
        >
          <span className="mr-2">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default OrderFilter;
