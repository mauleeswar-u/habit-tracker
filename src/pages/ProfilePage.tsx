
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  // This would be replaced with actual user data from auth context
  const [user] = useState({
    name: "Demo User",
    email: "user@example.com",
    joinDate: "January 15, 2024",
    avatar: "",
  });
  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // This would be replaced with actual logout logic
    navigate("/");
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader className="space-y-4 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl bg-purple-400 text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm mb-2">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Member
              </div>
              <div className="flex items-center text-sm">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                Joined on {user.joinDate}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Change Password
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Notification Settings
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600">
                <Settings className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle className="text-xl">Analytics Overview</CardTitle>
              <CardDescription>Your habit statistics and achievements</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 text-center">
                <h3 className="text-2xl font-bold text-purple-400">12</h3>
                <p className="text-sm text-muted-foreground">Total Habits</p>
              </div>
              
              <div className="border rounded-md p-4 text-center">
                <h3 className="text-2xl font-bold text-green-500">8</h3>
                <p className="text-sm text-muted-foreground">Current Streaks</p>
              </div>
              
              <div className="border rounded-md p-4 text-center">
                <h3 className="text-2xl font-bold text-blue-400">78%</h3>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
