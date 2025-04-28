
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency, calculateProgress } from "@/lib/formatters";
import ProgressBar from "../ui/ProgressBar";

const SavingsGoalsOverview = () => {
  const { savingsGoals } = useExpense();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {savingsGoals.map((goal) => {
            const percentage = calculateProgress(goal.currentAmount, goal.targetAmount);
            
            return (
              <div key={goal.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{goal.title}</span>
                  <span>
                    {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                  </span>
                </div>
                <ProgressBar
                  value={goal.currentAmount}
                  max={goal.targetAmount}
                  color="bg-success"
                  showPercentage={true}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalsOverview;
