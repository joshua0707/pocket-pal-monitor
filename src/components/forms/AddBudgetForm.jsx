
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useExpense } from "@/context/ExpenseContext";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  category: z.string().min(2, "Category must be at least 2 characters"),
  limit: z.string().transform((val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  }),
  period: z.string(),
});

const AddBudgetForm = ({ onSuccess }) => {
  const { addBudget } = useExpense();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      limit: "",
      period: "monthly",
    },
  });

  const onSubmit = (values) => {
    addBudget({
      category: values.category,
      limit: values.limit,
      period: values.period,
    });
    toast.success("Budget created successfully!");
    form.reset();
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Housing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Limit</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="1000.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Period</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">Create Budget</Button>
      </form>
    </Form>
  );
};

export default AddBudgetForm;
