
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen,
  Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Analytics = () => {
  // Sample data for charts
  const performanceData = [
    { name: 'Class 1', score: 85 },
    { name: 'Class 2', score: 78 },
    { name: 'Class 3', score: 92 },
    { name: 'Class 4', score: 80 },
    { name: 'Class 5', score: 87 },
    { name: 'Class 6', score: 76 },
  ];

  const attendanceData = [
    { name: 'Mon', students: 95, teachers: 100 },
    { name: 'Tue', students: 92, teachers: 98 },
    { name: 'Wed', students: 90, teachers: 100 },
    { name: 'Thu', students: 93, teachers: 97 },
    { name: 'Fri', students: 88, teachers: 99 },
  ];

  const subjectPerformanceData = [
    { name: 'Math', score: 82 },
    { name: 'Science', score: 88 },
    { name: 'English', score: 75 },
    { name: 'History', score: 70 },
    { name: 'Geography', score: 65 },
    { name: 'Art', score: 95 },
    { name: 'Music', score: 90 },
    { name: 'P.E.', score: 85 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Monitor school performance and track important metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="quarter">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>Total Students</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+2.5%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span>Average Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              <span>Average GPA</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.6/4.0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+0.2</span> from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-500" />
              <span>Performance Index</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78/100</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">+5</span> from last assessment
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="academic">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Analysis</TabsTrigger>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5 text-primary" />
                <span>Class-wise Academic Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Top Performing Class</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">Class 3</div>
                    <p className="text-xs text-muted-foreground">Average Score: 92%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Class Needing Attention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">Class 6</div>
                    <p className="text-xs text-muted-foreground">Average Score: 76%</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Weekly Attendance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="students" name="Students" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="teachers" name="Teachers" fill="#26A69A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Days with Highest Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">Monday</div>
                    <p className="text-xs text-muted-foreground">Student Attendance: 95%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Days with Lowest Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">Friday</div>
                    <p className="text-xs text-muted-foreground">Student Attendance: 88%</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Subject-wise Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#81C784" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Strongest Subject</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">Art</div>
                    <p className="text-xs text-muted-foreground">Average Score: 95%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Subject Needing Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">Geography</div>
                    <p className="text-xs text-muted-foreground">Average Score: 65%</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
