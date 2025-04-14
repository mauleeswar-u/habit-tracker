
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Habit } from "@/components/habits/HabitCard";
import { v4 as uuidv4 } from "uuid";

const habitSchema = z.object({
  name: z.string().min(1, { message: "Habit name is required." }).max(50),
  type: z.enum(["good", "bad"], { required_error: "Select habit type." }),
  target: z.coerce.number().min(1, { message: "Target must be at least 1." }).max(365),
});

type HabitFormValues = z.infer<typeof habitSchema>;

interface HabitFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  habitToEdit?: Habit;
}

export function HabitForm({ open, onClose, onSave, habitToEdit }: HabitFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!habitToEdit;

  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: habitToEdit?.name || "",
      type: habitToEdit?.type || "good",
      target: habitToEdit?.target || 21,
    },
  });

  function onSubmit(data: HabitFormValues) {
    setIsSubmitting(true);

    try {
      const habit: Habit = {
        id: habitToEdit?.id || uuidv4(),
        name: data.name,
        type: data.type,
        target: data.target,
        streak: habitToEdit?.streak || 0,
        progress: habitToEdit?.progress || 0,
        daysCompleted: habitToEdit?.daysCompleted || 0,
        completedToday: habitToEdit?.completedToday || false,
      };

      onSave(habit);
      onClose();
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Habit" : "Add New Habit"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Morning Meditation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Habit Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="good" id="good" />
                        <Label htmlFor="good">Good Habit</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bad" id="bad" />
                        <Label htmlFor="bad">Bad Habit</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="21"
                      min={1}
                      max={365}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-purple-400 hover:bg-purple-500">
                {isSubmitting ? "Saving..." : isEditing ? "Update Habit" : "Add Habit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
