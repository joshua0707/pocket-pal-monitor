
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency } from "@/lib/formatters";
import ProgressBar from "../ui/ProgressBar";

const BudgetOverview = () => {
  const { budgets } = useExpense();

  // Sort budgets by spent/limit ratio (highest first)
  const sortedBudgets = [...budgets]
    .sort((a, b) => (b.spent / b.limit) - (a.spent / a.limit))
    .slice(0, 4); // Take top 4

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Budget Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedBudgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <div key={budget.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{budget.category}</span>
                  <span>
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                  </span>
                </div>
                <ProgressBar
                  value={budget.spent}
                  max={budget.limit}
                  color={isOverBudget ? "bg-destructive" : percentage > 80 ? "bg-warning" : "bg-primary"}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetOverview;
