
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getMonthName(month: number): string {
  const date = new Date();
  date.setMonth(month);
  return date.toLocaleString('default', { month: 'long' });
}

export function calculateProgress(current: number, target: number): number {
  return Math.min(Math.round((current / target) * 100), 100);
}

export function getCategoryColorClass(category: string): string {
  const colorMap: Record<string, string> = {
    Housing: 'bg-blue-500',
    Transportation: 'bg-green-500',
    Food: 'bg-yellow-500',
    Utilities: 'bg-purple-500',
    Healthcare: 'bg-red-500',
    Entertainment: 'bg-pink-500',
    Shopping: 'bg-indigo-500',
    Personal: 'bg-orange-500',
    Debt: 'bg-gray-500',
    Savings: 'bg-emerald-500',
    Other: 'bg-slate-500',
    Travel: 'bg-cyan-500',
    Electronics: 'bg-violet-500'
  };

  return colorMap[category] || 'bg-slate-400';
}
