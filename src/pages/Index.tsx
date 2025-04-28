
import { Wallet, PiggyBank, TrendingUp, BarChart } from "lucide-react";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency } from "@/lib/formatters";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/ui/StatCard";
import ExpensesByCategoryChart from "@/components/dashboard/ExpensesByCategoryChart";
import MonthlySpendingChart from "@/components/dashboard/MonthlySpendingChart";
import BudgetOverview from "@/components/dashboard/BudgetOverview";
import RecentExpenses from "@/components/dashboard/RecentExpenses";
import SavingsGoalsOverview from "@/components/dashboard/SavingsGoalsOverview";

const Dashboard = () => {
  const { expenses, totalIncome, budgets, savingsGoals } = useExpense();

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  
  // Calculate remaining balance after expenses
  const remainingBalance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  // Find over-budget categories
  const overBudgetCategories = budgets.filter((budget) => budget.spent > budget.limit).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Your financial overview at a glance.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Income"
            value={formatCurrency(totalIncome)}
            icon={<Wallet />}
            description="Monthly income"
          />
          <StatCard
            title="Total Expenses"
            value={formatCurrency(totalExpense)}
            icon={<BarChart />}
            description={overBudgetCategories > 0 ? `${overBudgetCategories} categories over budget` : "All budgets on track"}
            trend={{
              value: 5,
              isPositive: false,
            }}
          />
          <StatCard
            title="Remaining Balance"
            value={formatCurrency(remainingBalance)}
            icon={<TrendingUp />}
            description="Available funds"
            trend={{
              value: 8,
              isPositive: true,
            }}
          />
          <StatCard
            title="Total Savings"
            value={formatCurrency(totalSavings)}
            icon={<PiggyBank />}
            description={`${savingsRate.toFixed(1)}% of income`}
          />
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ExpensesByCategoryChart />
          <div className="col-span-1 md:col-span-2 space-y-4">
            <MonthlySpendingChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BudgetOverview />
              <SavingsGoalsOverview />
            </div>
          </div>
        </div>

        {/* Recent transactions */}
        <div>
          <RecentExpenses />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
