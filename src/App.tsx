
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import { useState } from "react";

import Dashboard from "./pages/Index";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";
import Savings from "./pages/Savings";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a client inside the component to ensure it's created in the React lifecycle
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ExpenseProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ExpenseProvider>
    </QueryClientProvider>
  );
};

export default App;
