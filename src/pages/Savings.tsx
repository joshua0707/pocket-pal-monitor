
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency, formatDate } from "@/lib/formatters";
import ProgressBar from "@/components/ui/ProgressBar";
import { PiggyBank } from "lucide-react";

const Savings = () => {
  const { savingsGoals, deleteSavingsGoal } = useExpense();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground">Track and manage your savings targets.</p>
          </div>
          <Button>
            <PiggyBank className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savingsGoals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{goal.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => deleteSavingsGoal(goal.id)}>
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.category}</span>
                    <span>
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.currentAmount}
                    max={goal.targetAmount}
                    color="bg-success"
                    showPercentage
                  />
                  {goal.targetDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Target date: {formatDate(goal.targetDate)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Savings;
