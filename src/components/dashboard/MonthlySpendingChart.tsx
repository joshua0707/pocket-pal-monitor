
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency, getMonthName } from "@/lib/formatters";

const MonthlySpendingChart = () => {
  const { expenses } = useExpense();

  const monthlySpendings = Array(6).fill(0).map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5 + i);
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === month && expenseDate.getFullYear() === year;
    });

    const totalSpent = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    return {
      month: getMonthName(month).substring(0, 3),
      spent: totalSpent,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-md">
          <p className="text-sm">{payload[0].payload.month}</p>
          <p className="text-sm font-medium">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-base">Monthly Spending Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySpendings} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="spent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySpendingChart;
