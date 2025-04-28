import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddExpenseForm from "@/components/forms/AddExpenseForm";

const Expenses = () => {
  const { expenses, deleteExpense } = useExpense();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true;
    if (filter === "recurring") return expense.recurring;
    return expense.category === filter;
  });

  const categories = Array.from(new Set(expenses.map((e) => e.category)));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground">Manage and track your expenses.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Wallet className="mr-2 h-4 w-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <AddExpenseForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex space-x-2 overflow-auto pb-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "recurring" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("recurring")}
          >
            Recurring
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Expense List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredExpenses.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No expenses found.</p>
              ) : (
                filteredExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-3 bg-card border rounded-md"
                  >
                    <div>
                      <h3 className="font-medium">{expense.title}</h3>
                      <div className="text-sm text-muted-foreground flex space-x-2">
                        <span>{formatDate(expense.date)}</span>
                        <span>•</span>
                        <span>{expense.category}</span>
                        {expense.recurring && (
                          <>
                            <span>•</span>
                            <span className="text-primary">Recurring</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteExpense(expense.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Expenses;
