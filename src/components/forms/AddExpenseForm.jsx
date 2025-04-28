
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useExpense } from "@/context/ExpenseContext";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  amount: z.string().transform((val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  }),
  date: z.string(),
  category: z.string(),
  recurring: z.boolean().default(false),
});

const AddExpenseForm = ({ onSuccess }) => {
  const { addExpense } = useExpense();
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      category: "",
      recurring: false,
    },
  });

  const onSubmit = (values) => {
    addExpense({
      title: values.title,
      amount: values.amount,
      date: values.date,
      category: values.category,
      recurring: values.recurring,
    });
    toast.success("Expense added successfully!");
    form.reset();
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expense Title</FormLabel>
              <FormControl>
                <Input placeholder="Groceries" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="50.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Food" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recurring"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Recurring Expense</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">Add Expense</Button>
      </form>
    </Form>
  );
};

export default AddExpenseForm;
