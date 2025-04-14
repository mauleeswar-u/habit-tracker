
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Medal, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 py-12">
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Your Journey to
            <span className="text-purple-400"> Better Habits</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Track, maintain, and improve your habits with GenX Habit Tracker. Break bad habits, build good ones, and track your progress along the way.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" asChild>
              <Link to="/register" className="px-8">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/login" className="px-8">Sign In</Link>
            </Button>
          </div>
        </div>
        <div 
          className="flex-1 relative max-w-[500px] w-full aspect-square"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-400 to-blue-400 opacity-20 blur-2xl transition-all duration-500 group-hover:opacity-30"></div>
          <div className={`relative border border-border rounded-lg p-6 bg-card shadow-xl flex flex-col gap-4 h-full transition-transform duration-500 ${isHovered ? 'scale-105' : ''}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Habit Dashboard</h3>
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            
            <div className="flex flex-col gap-4 flex-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">Morning Meditation (15 Days)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md">
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center">
                    <Check className="w-3 h-3 text-muted-foreground/50" />
                  </div>
                  <span className="text-sm">Read 30 Minutes</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-orange-600" />
                  </div>
                  <span className="text-sm">No Social Media (5 Days)</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <TrendingUp className="text-green-500 w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">67% Progress</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-yellow-500 w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">5 Streaks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-muted/50 -mx-6 px-6 md:-mx-10 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Habit Tracking</h3>
            <p className="text-muted-foreground">
              Track your daily habits and view progress over time with intuitive visualizations.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Medal className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Streaks & Milestones</h3>
            <p className="text-muted-foreground">
              Build momentum with streaks and celebrate achievements with milestone rewards.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Daily Motivation</h3>
            <p className="text-muted-foreground">
              Get personalized motivation and reminders to keep you on track with your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Habits?</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          Join thousands of users who have successfully built better habits and improved their lives.
        </p>
        <Button size="lg" asChild className="px-8">
          <Link to="/register">Get Started Now</Link>
        </Button>
      </div>
    </div>
  );
}
