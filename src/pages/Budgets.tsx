
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency } from "@/lib/formatters";
import ProgressBar from "@/components/ui/ProgressBar";
import { Calendar } from "lucide-react";

const Budgets = () => {
  const { budgets, deleteBudget } = useExpense();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
            <p className="text-muted-foreground">Manage your spending limits.</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Create Budget
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const isOverBudget = percentage > 100;
            
            return (
              <Card key={budget.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">{budget.category}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => deleteBudget(budget.id)}>
                      Delete
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {isOverBudget ? (
                          <span className="text-destructive font-medium">Over budget!</span>
                        ) : (
                          `${budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} limit`
                        )}
                      </span>
                      <span>
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                      </span>
                    </div>
                    <ProgressBar
                      value={budget.spent}
                      max={budget.limit}
                      color={isOverBudget ? "bg-destructive" : percentage > 80 ? "bg-warning" : "bg-primary"}
                      showPercentage
                    />
                    <div className="text-xs text-muted-foreground mt-2">
                      {isOverBudget ? (
                        <span>
                          {formatCurrency(budget.spent - budget.limit)} over budget
                        </span>
                      ) : (
                        <span>
                          {formatCurrency(budget.limit - budget.spent)} remaining
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Budgets;
