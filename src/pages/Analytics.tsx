
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Calendar, Users, GraduationCap, UserCheck, School, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { analyticsAPI } from '@/services/api';
import { useApi } from '@/hooks/use-api';

// Define appropriate types for the data
type PerformanceData = {
  subject: string;
  average: number;
  highest: number;
  lowest: number;
  color: string;
};

type AttendanceData = {
  date: string;
  present: number;
  absent: number;
  total: number;
};

type SubjectPerformance = {
  name: string;
  value: number;
  color: string;
};

type PerformanceTrend = {
  month: string;
  average: number;
  target: number;
};

type ClassPerformance = {
  name: string;
  average: number;
  highest: number;
  improvement: number;
};

const Analytics = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('monthly');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // API hooks
  const { 
    data: performanceData, 
    loading: performanceLoading, 
    execute: fetchPerformanceData 
  } = useApi(analyticsAPI.getPerformanceData);

  const { 
    data: attendanceData, 
    loading: attendanceLoading, 
    execute: fetchAttendanceData 
  } = useApi(analyticsAPI.getAttendanceData);

  const { 
    data: subjectPerformanceData, 
    loading: subjectPerformanceLoading, 
    execute: fetchSubjectPerformance 
  } = useApi(analyticsAPI.getSubjectPerformance);

  const { 
    data: trendData, 
    loading: trendLoading, 
    execute: fetchStudentPerformanceTrends 
  } = useApi(analyticsAPI.getStudentPerformanceTrends);

  // Fetch initial data
  useEffect(() => {
    fetchPerformanceData().catch(console.error);
    fetchAttendanceData().catch(console.error);
    fetchSubjectPerformance().catch(console.error);
    fetchStudentPerformanceTrends().catch(console.error);
  }, [fetchPerformanceData, fetchAttendanceData, fetchSubjectPerformance, fetchStudentPerformanceTrends]);

  // Fetch filtered data when filters change
  useEffect(() => {
    const filters = {
      classId: selectedClass !== 'all' ? selectedClass : undefined,
      timeframe: selectedTimeframe,
      subjectId: selectedSubject !== 'all' ? selectedSubject : undefined
    };
    
    fetchPerformanceData(filters).catch(console.error);
    fetchAttendanceData(filters).catch(console.error);
    fetchStudentPerformanceTrends(filters).catch(console.error);
  }, [selectedClass, selectedTimeframe, selectedSubject, fetchPerformanceData, fetchAttendanceData, fetchStudentPerformanceTrends]);

  // Sample data for when API data is not yet available
  const performance: PerformanceData[] = performanceData as PerformanceData[] || [
    { subject: 'Mathematics', average: 78, highest: 98, lowest: 45, color: '#3b82f6' },
    { subject: 'Science', average: 72, highest: 95, lowest: 40, color: '#10b981' },
    { subject: 'English', average: 84, highest: 100, lowest: 60, color: '#f59e0b' },
    { subject: 'History', average: 76, highest: 92, lowest: 55, color: '#8b5cf6' },
    { subject: 'Geography', average: 68, highest: 88, lowest: 42, color: '#ec4899' },
  ];

  const attendance: AttendanceData[] = attendanceData as AttendanceData[] || [
    { date: 'Mon', present: 450, absent: 20, total: 470 },
    { date: 'Tue', present: 460, absent: 10, total: 470 },
    { date: 'Wed', present: 430, absent: 40, total: 470 },
    { date: 'Thu', present: 455, absent: 15, total: 470 },
    { date: 'Fri', present: 445, absent: 25, total: 470 },
  ];

  const subjectPerformance: SubjectPerformance[] = subjectPerformanceData as SubjectPerformance[] || [
    { name: 'Mathematics', value: 25, color: '#3b82f6' },
    { name: 'Science', value: 20, color: '#10b981' },
    { name: 'English', value: 22, color: '#f59e0b' },
    { name: 'History', value: 18, color: '#8b5cf6' },
    { name: 'Geography', value: 15, color: '#ec4899' },
  ];

  const trends: PerformanceTrend[] = trendData as PerformanceTrend[] || [
    { month: 'Jan', average: 68, target: 70 },
    { month: 'Feb', average: 70, target: 70 },
    { month: 'Mar', average: 72, target: 75 },
    { month: 'Apr', average: 75, target: 75 },
    { month: 'May', average: 74, target: 75 },
    { month: 'Jun', average: 78, target: 80 },
    { month: 'Jul', average: 80, target: 80 },
  ];

  const classPerformance: ClassPerformance[] = [
    { name: 'Class 1-A', average: 82, highest: 98, improvement: 4 },
    { name: 'Class 2-B', average: 78, highest: 95, improvement: 3 },
    { name: 'Class 3-C', average: 80, highest: 96, improvement: 5 },
    { name: 'Class 4-A', average: 75, highest: 92, improvement: 2 },
    { name: 'Class 5-B', average: 79, highest: 94, improvement: 6 },
  ];

  // Filter options (would come from API in a real app)
  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: '1', label: 'Class 1-A' },
    { value: '2', label: 'Class 2-B' },
    { value: '3', label: 'Class 3-C' },
    { value: '4', label: 'Class 4-A' },
    { value: '5', label: 'Class 5-B' },
  ];

  const timeframeOptions = [
    { value: 'weekly', label: 'This Week' },
    { value: 'monthly', label: 'This Month' },
    { value: 'quarterly', label: 'This Quarter' },
    { value: 'yearly', label: 'This Year' },
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: '1', label: 'Mathematics' },
    { value: '2', label: 'Science' },
    { value: '3', label: 'English' },
    { value: '4', label: 'History' },
    { value: '5', label: 'Geography' },
  ];

  // Calculate overall metrics
  const overallAttendance = attendance && attendance.length > 0 ? 
    attendance.reduce((sum, day) => sum + day.present, 0) / 
    attendance.reduce((sum, day) => sum + day.total, 0) * 100 : 0;
  
  const averagePerformance = performance && performance.length > 0 ? 
    performance.reduce((sum, subject) => sum + subject.average, 0) / performance.length : 0;

  const performanceImprovement = 3.5; // This would be calculated from historical data in a real app

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics of school performance and student progress.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-background border rounded-lg p-1 flex items-center gap-1">
            <Filter className="h-4 w-4 text-muted-foreground ml-1" />
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[160px] border-0 h-8">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-background border rounded-lg p-1 flex items-center">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[160px] border-0 h-8">
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-background border rounded-lg p-1 flex items-center">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[160px] border-0 h-8">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold mt-1">{overallAttendance.toFixed(1)}%</h3>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                    1.2%
                  </span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
                <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Performance</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold mt-1">{averagePerformance.toFixed(1)}%</h3>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                    {performanceImprovement}%
                  </span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-900/30">
                <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold mt-1">470</h3>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                    12
                  </span>
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900/30">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">School Ranking</p>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold mt-1">Top 5%</h3>
                  <span className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                    2
                  </span>
                </div>
              </div>
              <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/30">
                <School className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="comparison">Class Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {trendLoading ? (
                  <div className="flex justify-center items-center h-full">Loading data...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trends}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="average" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Average Score"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#f59e0b" 
                        strokeDasharray="5 5" 
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={classPerformance.sort((a, b) => b.average - a.average)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="average" fill="#3b82f6" name="Average Score">
                        {classPerformance.sort((a, b) => b.average - a.average).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Most Improved Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={classPerformance.sort((a, b) => b.improvement - a.improvement)}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="improvement" fill="#f59e0b" name="Improvement %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attendance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {attendanceLoading ? (
                  <div className="flex justify-center items-center h-full">Loading data...</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendance}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="present" stackId="a" fill="#10b981" name="Present" />
                      <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Average Daily Attendance</h4>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">
                    {attendance && attendance.length > 0 
                      ? `${((attendance.reduce((sum, day) => sum + day.present, 0) / 
                          (attendance.length * attendance[0].total)) * 100).toFixed(1)}%` 
                      : '0%'}
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Attendance Days</h4>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1">
                    {attendance ? attendance.length : 0} Days
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Attendance Trend</h4>
                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1 flex items-center">
                    <ArrowUp className="h-5 w-5 mr-1 text-green-600" />
                    {attendance && attendance.length > 0
                      ? `${((attendance[attendance.length - 1].present / attendance[attendance.length - 1].total) - 
                          (attendance[0].present / attendance[0].total)) * 100 * 5}.toFixed(1)%` 
                      : '0%'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subjects" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {performanceLoading ? (
                    <div className="flex justify-center items-center h-full">Loading data...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performance}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" fill="#3b82f6" name="Average Score" />
                        <Bar dataKey="highest" fill="#10b981" name="Highest Score" />
                        <Bar dataKey="lowest" fill="#ef4444" name="Lowest Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  {subjectPerformanceLoading ? (
                    <div>Loading data...</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={subjectPerformance}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {subjectPerformance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={classPerformance}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="average" fill="#3b82f6" name="Average Score" />
                      <Bar dataKey="highest" fill="#10b981" name="Highest Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Highest Performing Class</h4>
                    <p className="text-xl font-bold text-blue-700 dark:text-blue-400 mt-1">
                      {classPerformance.length > 0 ? 
                        classPerformance.sort((a, b) => b.average - a.average)[0].name : "N/A"}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      {classPerformance.length > 0 ? 
                        `${classPerformance.sort((a, b) => b.average - a.average)[0].average}% Average` : ""}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Most Improved</h4>
                    <p className="text-xl font-bold text-green-700 dark:text-green-400 mt-1">
                      {classPerformance.length > 0 ? 
                        classPerformance.sort((a, b) => b.improvement - a.improvement)[0].name : "N/A"}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      {classPerformance.length > 0 ? 
                        `${classPerformance.sort((a, b) => b.improvement - a.improvement)[0].improvement}% Improvement` : ""}
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">Average Performance</h4>
                    <p className="text-xl font-bold text-amber-700 dark:text-amber-400 mt-1">
                      {classPerformance.length > 0 ? 
                        `${(classPerformance.reduce((sum, c) => sum + c.average, 0) / classPerformance.length).toFixed(1)}%` : "N/A"}
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300">Performance Range</h4>
                    <p className="text-xl font-bold text-purple-700 dark:text-purple-400 mt-1">
                      {classPerformance.length > 0 ? 
                        `${Math.min(...classPerformance.map(c => c.average))}% - ${Math.max(...classPerformance.map(c => c.average))}%` : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
