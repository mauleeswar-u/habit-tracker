
import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Edit, Flame, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export interface Habit {
  id: string;
  name: string;
  type: "good" | "bad";
  streak: number;
  target: number;
  progress: number;
  daysCompleted: number;
  completedToday: boolean;
}

interface HabitCardProps {
  habit: Habit;
  onDelete: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onToggle: (id: string) => void;
}

export function HabitCard({ habit, onDelete, onEdit, onToggle }: HabitCardProps) {
  const [expanded, setExpanded] = useState(false);

  const progressPercentage = (habit.progress / habit.target) * 100;
  const isGoodHabit = habit.type === "good";

  return (
    <Card className={`${isGoodHabit ? "border-l-4 border-l-green-500" : "border-l-4 border-l-orange-400"}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{habit.name}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="p-0 h-8 w-8"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
        <CardDescription>
          {isGoodHabit 
            ? `Building for ${habit.daysCompleted} days` 
            : `Breaking for ${habit.daysCompleted} days`
          }
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Progress value={progressPercentage} className={`h-2 ${isGoodHabit ? "bg-green-100" : "bg-orange-100"}`} />
          <span className="text-xs font-medium">{Math.round(progressPercentage)}%</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-sm">
            <Flame className={`h-4 w-4 ${isGoodHabit ? "text-green-500" : "text-orange-400"}`} />
            <span>
              {habit.streak} day{habit.streak !== 1 ? "s" : ""} streak
            </span>
          </div>

          <Button
            variant={habit.completedToday ? "outline" : (isGoodHabit ? "default" : "destructive")}
            size="sm"
            className={habit.completedToday ? "" : (isGoodHabit ? "bg-green-500 hover:bg-green-600" : "")}
            onClick={() => onToggle(habit.id)}
          >
            <Check className="mr-1 h-4 w-4" />
            {habit.completedToday 
              ? "Completed" 
              : (isGoodHabit ? "Complete" : "Break")
            }
          </Button>
        </div>

        {expanded && (
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="font-medium">Goal: </span>
              {isGoodHabit ? `Complete ${habit.target} times` : `Break habit for ${habit.target} days`}
            </p>
            <p>
              <span className="font-medium">Progress: </span>
              {habit.progress} / {habit.target}
            </p>
          </div>
        )}
      </CardContent>

      {expanded && (
        <CardFooter className="pt-0 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(habit)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(habit.id)} className="text-red-500 hover:text-red-600">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
