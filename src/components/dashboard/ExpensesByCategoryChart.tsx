
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense, ExpenseCategory } from "@/context/ExpenseContext";
import { formatCurrency } from "@/lib/formatters";

const ExpensesByCategoryChart = () => {
  const { expenses } = useExpense();

  const categoryTotals: Record<string, number> = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  const pieData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const COLORS = [
    "#6366F1", // indigo (primary)
    "#8B5CF6", // violet (secondary)
    "#10B981", // emerald
    "#F59E0B", // amber
    "#EF4444", // red
    "#EC4899", // pink
    "#0EA5E9", // sky blue
    "#14B8A6", // teal
    "#F97316", // orange
    "#8B5CF6", // violet
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border border-border rounded-md shadow-md">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-1 row-span-2">
      <CardHeader>
        <CardTitle className="text-base">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesByCategoryChart;
