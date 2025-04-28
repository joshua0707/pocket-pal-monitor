
import { createContext, useContext, useState, ReactNode } from "react";

export type ExpenseCategory = 
  | "Housing" 
  | "Transportation" 
  | "Food" 
  | "Utilities" 
  | "Healthcare" 
  | "Entertainment" 
  | "Shopping" 
  | "Personal" 
  | "Debt"
  | "Savings"
  | "Other";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  recurring: boolean;
  notes?: string;
}

export interface Budget {
  id: string;
  category: ExpenseCategory;
  limit: number;
  period: "weekly" | "monthly" | "yearly";
  spent: number;
}

export interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  category?: string;
  iconType?: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  totalIncome: number;
  addExpense: (expense: Omit<Expense, "id">) => void;
  addBudget: (budget: Omit<Budget, "id" | "spent">) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, "id">) => void;
  updateSavingsAmount: (id: string, amount: number) => void;
  deleteExpense: (id: string) => void;
  deleteBudget: (id: string) => void;
  deleteSavingsGoal: (id: string) => void;
  setTotalIncome: (amount: number) => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Sample data
const sampleExpenses: Expense[] = [
  {
    id: "1",
    title: "Rent",
    amount: 1200,
    date: "2025-04-01",
    category: "Housing",
    recurring: true,
  },
  {
    id: "2",
    title: "Groceries",
    amount: 150,
    date: "2025-04-10",
    category: "Food",
    recurring: false,
  },
  {
    id: "3",
    title: "Electricity Bill",
    amount: 80,
    date: "2025-04-15",
    category: "Utilities",
    recurring: true,
  },
  {
    id: "4",
    title: "Movie Night",
    amount: 35,
    date: "2025-04-18",
    category: "Entertainment",
    recurring: false,
  },
  {
    id: "5",
    title: "Gas",
    amount: 45,
    date: "2025-04-20",
    category: "Transportation",
    recurring: false,
  },
];

const sampleBudgets: Budget[] = [
  {
    id: "1",
    category: "Housing",
    limit: 1500,
    spent: 1200,
    period: "monthly",
  },
  {
    id: "2",
    category: "Food",
    limit: 500,
    spent: 320,
    period: "monthly",
  },
  {
    id: "3",
    category: "Transportation",
    limit: 200,
    spent: 180,
    period: "monthly",
  },
  {
    id: "4",
    category: "Entertainment",
    limit: 150,
    spent: 85,
    period: "monthly",
  },
];

const sampleSavingsGoals: SavingsGoal[] = [
  {
    id: "1",
    title: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 4500,
    category: "Savings",
  },
  {
    id: "2",
    title: "Vacation",
    targetAmount: 3000,
    currentAmount: 1200,
    targetDate: "2025-12-31",
    category: "Travel",
  },
  {
    id: "3",
    title: "New Computer",
    targetAmount: 2000,
    currentAmount: 800,
    targetDate: "2025-08-15",
    category: "Electronics",
  },
];

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [budgets, setBudgets] = useState<Budget[]>(sampleBudgets);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(sampleSavingsGoals);
  const [totalIncome, setTotalIncome] = useState<number>(4000);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses([...expenses, newExpense]);

    // Update budget spent amount
    const relevantBudget = budgets.find((b) => b.category === expense.category);
    if (relevantBudget) {
      const updatedBudgets = budgets.map((b) =>
        b.id === relevantBudget.id ? { ...b, spent: b.spent + expense.amount } : b
      );
      setBudgets(updatedBudgets);
    }
  };

  const addBudget = (budget: Omit<Budget, "id" | "spent">) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
      spent: calculateCategorySpending(budget.category),
    };
    setBudgets([...budgets, newBudget]);
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, "id">) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    setSavingsGoals([...savingsGoals, newGoal]);
  };

  const calculateCategorySpending = (category: ExpenseCategory) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const categoryExpenses = expenses.filter(
      (expense) => expense.category === category &&
      new Date(expense.date).getMonth() === currentMonth &&
      new Date(expense.date).getFullYear() === currentYear
    );
    return categoryExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const updateSavingsAmount = (id: string, amount: number) => {
    const updatedGoals = savingsGoals.map((goal) =>
      goal.id === id ? { ...goal, currentAmount: amount } : goal
    );
    setSavingsGoals(updatedGoals);
  };

  const deleteExpense = (id: string) => {
    const expenseToDelete = expenses.find((e) => e.id === id);
    if (expenseToDelete) {
      const relevantBudget = budgets.find((b) => b.category === expenseToDelete.category);
      if (relevantBudget) {
        const updatedBudgets = budgets.map((b) =>
          b.id === relevantBudget.id ? { ...b, spent: b.spent - expenseToDelete.amount } : b
        );
        setBudgets(updatedBudgets);
      }
    }
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter((budget) => budget.id !== id));
  };

  const deleteSavingsGoal = (id: string) => {
    setSavingsGoals(savingsGoals.filter((goal) => goal.id !== id));
  };

  const value = {
    expenses,
    budgets,
    savingsGoals,
    totalIncome,
    addExpense,
    addBudget,
    addSavingsGoal,
    updateSavingsAmount,
    deleteExpense,
    deleteBudget,
    deleteSavingsGoal,
    setTotalIncome,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
