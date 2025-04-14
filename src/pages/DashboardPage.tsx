
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Award, TrendingUp, Calendar, CheckSquare, XSquare } from "lucide-react";
import { HabitCard, type Habit } from "@/components/habits/HabitCard";
import { HabitForm } from "@/components/habits/HabitForm";
import { Progress } from "@/components/ui/progress";

// Sample data - would be replaced with actual data from backend
const SAMPLE_HABITS: Habit[] = [
  {
    id: "1",
    name: "Morning Meditation",
    type: "good",
    streak: 15,
    target: 30,
    progress: 15,
    daysCompleted: 15,
    completedToday: true
  },
  {
    id: "2",
    name: "Reading",
    type: "good",
    streak: 3,
    target: 21,
    progress: 10,
    daysCompleted: 10,
    completedToday: false
  },
  {
    id: "3",
    name: "No Social Media",
    type: "bad",
    streak: 5,
    target: 14,
    progress: 5,
    daysCompleted: 5,
    completedToday: true
  },
  {
    id: "4",
    name: "Exercise",
    type: "good",
    streak: 0,
    target: 30,
    progress: 7,
    daysCompleted: 7,
    completedToday: false
  }
];

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>(SAMPLE_HABITS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState<Habit | undefined>();
  const [activeTab, setActiveTab] = useState("all");

  const goodHabits = habits.filter(habit => habit.type === "good");
  const badHabits = habits.filter(habit => habit.type === "bad");
  
  const displayedHabits = activeTab === "all" 
    ? habits 
    : activeTab === "good" 
      ? goodHabits 
      : badHabits;
  
  const completedToday = habits.filter(habit => habit.completedToday).length;
  const completionRate = habits.length > 0 ? (completedToday / habits.length) * 100 : 0;
  
  // Longest streak calculation
  const longestStreak = habits.length > 0 
    ? Math.max(...habits.map(habit => habit.streak))
    : 0;
  
  // Habit with longest streak
  const habitWithLongestStreak = habits.find(habit => habit.streak === longestStreak);

  const handleSaveHabit = (habit: Habit) => {
    if (habitToEdit) {
      setHabits(habits.map(h => h.id === habit.id ? habit : h));
    } else {
      setHabits([...habits, habit]);
    }
    setHabitToEdit(undefined);
  };

  const handleEditHabit = (habit: Habit) => {
    setHabitToEdit(habit);
    setIsFormOpen(true);
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completedToday = !habit.completedToday;
        // Update streak and progress logic
        let streak = habit.streak;
        let progress = habit.progress;
        
        if (completedToday) {
          // If marking as complete
          streak += 1;
          progress += 1;
        } else {
          // If unmarking as complete
          streak = Math.max(0, streak - 1);
          progress = Math.max(0, progress - 1);
        }
        
        return {
          ...habit,
          completedToday,
          streak,
          progress,
        };
      }
      return habit;
    }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button onClick={() => {
            setHabitToEdit(undefined);
            setIsFormOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" /> New Habit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
              <CardDescription>
                {completedToday} of {habits.length} habits completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Progress value={completionRate} className="h-2" />
                <span className="text-xs font-medium ml-2">{Math.round(completionRate)}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
              <CardDescription>
                {habitWithLongestStreak ? habitWithLongestStreak.name : "No habits yet"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Award className="h-5 w-5 text-orange-500 mr-2" />
              <span className="font-bold">{longestStreak} days</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
              <CardDescription>
                Good vs Bad habits breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckSquare className="h-5 w-5 text-green-500 mr-1" />
                <span>{goodHabits.length} Good</span>
              </div>
              <div className="flex items-center">
                <XSquare className="h-5 w-5 text-orange-500 mr-1" />
                <span>{badHabits.length} Bad</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all" className="flex gap-1 items-center">
                <Calendar className="h-4 w-4" />
                <span>All Habits</span>
              </TabsTrigger>
              <TabsTrigger value="good" className="flex gap-1 items-center">
                <CheckSquare className="h-4 w-4" />
                <span>Good Habits</span>
              </TabsTrigger>
              <TabsTrigger value="bad" className="flex gap-1 items-center">
                <XSquare className="h-4 w-4" />
                <span>Bad Habits</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedHabits.length > 0 ? (
                displayedHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onEdit={handleEditHabit}
                    onDelete={handleDeleteHabit}
                    onToggle={toggleHabitCompletion}
                  />
                ))
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No habits yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Get started by adding your first habit to track
                  </p>
                  <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Your First Habit
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="good" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goodHabits.length > 0 ? (
                goodHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onEdit={handleEditHabit}
                    onDelete={handleDeleteHabit}
                    onToggle={toggleHabitCompletion}
                  />
                ))
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                  <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No good habits yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start building positive habits by adding one now
                  </p>
                  <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Good Habit
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="bad" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badHabits.length > 0 ? (
                badHabits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onEdit={handleEditHabit}
                    onDelete={handleDeleteHabit}
                    onToggle={toggleHabitCompletion}
                  />
                ))
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                  <XSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bad habits tracked</h3>
                  <p className="text-muted-foreground mb-4">
                    Track habits you want to break by adding one now
                  </p>
                  <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Bad Habit
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <HabitForm
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setHabitToEdit(undefined);
          }}
          onSave={handleSaveHabit}
          habitToEdit={habitToEdit}
        />
      </div>
    </Layout>
  );
}
