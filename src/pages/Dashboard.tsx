
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Calendar, CheckCircle, Clock, Users } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Dashboard = () => {
  // In a real app, these would come from an API
  const adminName = "John Doe";
  const currentTime = new Date();
  const hours = currentTime.getHours();

  // Determine greeting based on time of day
  let greeting = "Good Morning";
  if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
  } else if (hours >= 17) {
    greeting = "Good Evening";
  }

  const statCards = [
    { 
      title: "Total Students", 
      value: "1,284", 
      icon: Users, 
      change: "+14%", 
      color: "text-blue-500" 
    },
    { 
      title: "Attendance Today", 
      value: "94%", 
      icon: CheckCircle, 
      change: "+2%", 
      color: "text-green-500" 
    },
    { 
      title: "Upcoming Events", 
      value: "8", 
      icon: Calendar, 
      change: "", 
      color: "text-indigo-500" 
    },
    { 
      title: "Performance", 
      value: "86%", 
      icon: BarChart, 
      change: "+5%", 
      color: "text-amber-500" 
    }
  ];

  const pendingActions = [
    { title: "Teacher Leave Requests", count: 3 },
    { title: "Fee Payment Approvals", count: 12 },
    { title: "New Student Admissions", count: 7 },
    { title: "Parent Meeting Requests", count: 5 }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Meeting", date: "Apr 15", time: "2:00 PM" },
    { title: "Science Exhibition", date: "Apr 18", time: "9:00 AM" },
    { title: "Annual Sports Day", date: "Apr 22", time: "8:00 AM" }
  ];

  const { theme } = useTheme();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="text-left">
        <h1 className="text-2xl font-bold tracking-tight">
          {greeting}, {adminName}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening across your school today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}>
                    {stat.change}
                  </span> from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span>Pending Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{action.title}</span>
                  <span className="inline-flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-amber-700 dark:text-amber-400">
                    {action.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <span>Upcoming Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{event.title}</span>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{event.date}</span>
                    <span>•</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly School Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Academic Performance</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Attendance Rate</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Teacher Engagement</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Parent Participation</span>
                <span>63%</span>
              </div>
              <Progress value={63} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
