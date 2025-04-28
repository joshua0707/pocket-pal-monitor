
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useExpense } from "@/context/ExpenseContext";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  targetAmount: z.string().transform((val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  }),
  targetDate: z.string().optional(),
  category: z.string(),
});

const AddSavingsGoalForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { addSavingsGoal } = useExpense();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      targetAmount: "",
      targetDate: "",
      category: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addSavingsGoal({
      title: values.title,
      targetAmount: values.targetAmount,
      currentAmount: 0,
      targetDate: values.targetDate,
      category: values.category,
    });
    toast.success("Savings goal added successfully!");
    form.reset();
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Title</FormLabel>
              <FormControl>
                <Input placeholder="Emergency Fund" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="5000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Date (Optional)</FormLabel>
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
                <Input placeholder="Savings" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Add Goal</Button>
      </form>
    </Form>
  );
};

export default AddSavingsGoalForm;
