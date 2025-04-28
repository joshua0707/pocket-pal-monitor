
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency, formatDate, getCategoryColorClass } from "@/lib/formatters";

const RecentExpenses = () => {
  const { expenses } = useExpense();

  // Get the 5 most recent expenses
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Expenses</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0"
            >
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${getCategoryColorClass(expense.category)}`} />
                <div>
                  <p className="font-medium">{expense.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(expense.date)}</p>
                </div>
              </div>
              <span className="font-medium">{formatCurrency(expense.amount)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
