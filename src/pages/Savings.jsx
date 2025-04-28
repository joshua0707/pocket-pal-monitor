
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency, formatDate } from "@/lib/formatters";
import ProgressBar from "@/components/ui/ProgressBar";
import { PiggyBank } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddSavingsGoalForm from "@/components/forms/AddSavingsGoalForm";
import { useState } from "react";

const Savings = () => {
  const { savingsGoals, deleteSavingsGoal } = useExpense();
  const [open, setOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Savings Goals</h1>
            <p className="text-muted-foreground">Track and manage your savings targets.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600">
                <PiggyBank className="mr-2 h-4 w-4" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Savings Goal</DialogTitle>
              </DialogHeader>
              <AddSavingsGoalForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savingsGoals.map((goal) => (
            <Card key={goal.id} className="overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-transparent dark:from-violet-900/50 rounded-lg" />
              <CardHeader className="pb-2 relative">
                <div className="flex justify-between">
                  <CardTitle className="text-base">{goal.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteSavingsGoal(goal.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{goal.category}</span>
                    <span className="font-mono">
                      {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <ProgressBar
                    value={goal.currentAmount}
                    max={goal.targetAmount}
                    color="bg-gradient-to-r from-violet-500 to-purple-500"
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
