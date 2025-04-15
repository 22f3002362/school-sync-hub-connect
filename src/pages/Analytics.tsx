
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart as BarChartIcon, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen,
  Activity,
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApi } from '@/hooks/use-api';
import { analyticsAPI } from '@/services/api';

const Analytics = () => {
  const [period, setPeriod] = useState('quarter');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  // API hooks
  const { 
    data: performanceData, 
    loading: performanceLoading, 
    execute: fetchPerformance 
  } = useApi(analyticsAPI.getPerformanceData);

  const { 
    data: attendanceData, 
    loading: attendanceLoading, 
    execute: fetchAttendance 
  } = useApi(analyticsAPI.getAttendanceData);

  const { 
    data: subjectPerformanceData, 
    loading: subjectPerformanceLoading, 
    execute: fetchSubjectPerformance 
  } = useApi(analyticsAPI.getSubjectPerformance);

  const { 
    data: studentTrendsData, 
    loading: studentTrendsLoading, 
    execute: fetchStudentTrends 
  } = useApi(analyticsAPI.getStudentPerformanceTrends);

  useEffect(() => {
    // Fetch analytics data on component mount
    fetchPerformance().catch(console.error);
    fetchAttendance('week').catch(console.error);
    fetchSubjectPerformance().catch(console.error);
    fetchStudentTrends().catch(console.error);
  }, [fetchPerformance, fetchAttendance, fetchSubjectPerformance, fetchStudentTrends]);

  useEffect(() => {
    // Fetch attendance data when period changes
    fetchAttendance(period === 'week' ? 'week' : 
                   period === 'month' ? 'month' : 
                   period === 'quarter' ? 'quarter' : 'year')
      .catch(console.error);
  }, [period, fetchAttendance]);

  useEffect(() => {
    // Fetch performance data when selected class changes
    if (selectedClass) {
      fetchPerformance(parseInt(selectedClass)).catch(console.error);
      fetchStudentTrends(parseInt(selectedClass)).catch(console.error);
    } else {
      fetchPerformance().catch(console.error);
      fetchStudentTrends().catch(console.error);
    }
  }, [selectedClass, fetchPerformance, fetchStudentTrends]);

  // Sample data for fallback when API data is not yet available
  const performance = performanceData || [
    { name: 'Class 1-A', score: 85 },
    { name: 'Class 2-B', score: 78 },
    { name: 'Class 3-C', score: 92 },
    { name: 'Class 4-A', score: 80 },
    { name: 'Class 5-B', score: 87 },
    { name: 'Class 6-C', score: 76 },
    { name: 'Class 7-A', score: 82 },
    { name: 'Class 8-B', score: 88 },
    { name: 'Class 9-C', score: 75 },
    { name: 'Class 10-A', score: 89 },
    { name: 'Class 11-B', score: 81 },
    { name: 'Class 12-C', score: 93 },
  ];

  const attendance = attendanceData || [
    { name: 'Mon', students: 95, teachers: 100 },
    { name: 'Tue', students: 92, teachers: 98 },
    { name: 'Wed', students: 90, teachers: 100 },
    { name: 'Thu', students: 93, teachers: 97 },
    { name: 'Fri', students: 88, teachers: 99 },
  ];

  const subjectPerformance = subjectPerformanceData || [
    { name: 'Math', score: 82 },
    { name: 'Science', score: 88 },
    { name: 'English', score: 75 },
    { name: 'History', score: 70 },
    { name: 'Geography', score: 65 },
    { name: 'Art', score: 95 },
    { name: 'Music', score: 90 },
    { name: 'P.E.', score: 85 },
  ];

  const studentTrends = studentTrendsData || [
    { month: 'Jan', average: 76, topPerformer: 95, lowPerformer: 60 },
    { month: 'Feb', average: 78, topPerformer: 97, lowPerformer: 62 },
    { month: 'Mar', average: 81, topPerformer: 98, lowPerformer: 65 },
    { month: 'Apr', average: 79, topPerformer: 96, lowPerformer: 63 },
    { month: 'May', average: 82, topPerformer: 99, lowPerformer: 68 },
    { month: 'Jun', average: 84, topPerformer: 100, lowPerformer: 70 },
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6B6B'];

  // Get top and bottom performers
  const sortedPerformance = [...performance].sort((a, b) => b.score - a.score);
  const topPerformer = sortedPerformance[0];
  const bottomPerformer = sortedPerformance[sortedPerformance.length - 1];

  // Attendance averages
  const studentAttendanceAvg = attendance.reduce((sum, entry) => sum + entry.students, 0) / attendance.length;
  const teacherAttendanceAvg = attendance.reduce((sum, entry) => sum + entry.teachers, 0) / attendance.length;

  // All available classes for filter
  const allClasses = performance.map((p, index) => ({
    id: index + 1,
    name: p.name
  }));

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
          <Select value={period} onValueChange={setPeriod}>
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
          
          <Select value={selectedClass || ""} onValueChange={val => setSelectedClass(val || null)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Classes</SelectItem>
              {allClasses.map(cls => (
                <SelectItem key={cls.id} value={cls.id.toString()}>{cls.name}</SelectItem>
              ))}
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
            <div className="text-2xl font-bold">{studentAttendanceAvg.toFixed(1)}%</div>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="academic">Academic Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Analysis</TabsTrigger>
          <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
          <TabsTrigger value="trends">Student Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5 text-primary" />
                <span>{selectedClass ? `${allClasses.find(c => c.id.toString() === selectedClass)?.name} Performance` : 'Class-wise Academic Performance'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {performanceLoading ? (
                <div className="flex justify-center py-10">Loading performance data...</div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Top Performing Class</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{topPerformer?.name || 'N/A'}</div>
                    <p className="text-xs text-muted-foreground">Average Score: {topPerformer?.score || 0}%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Class Needing Attention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{bottomPerformer?.name || 'N/A'}</div>
                    <p className="text-xs text-muted-foreground">Average Score: {bottomPerformer?.score || 0}%</p>
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
                <span>{
                  period === 'week' ? 'Weekly' : 
                  period === 'month' ? 'Monthly' : 
                  period === 'quarter' ? 'Quarterly' : 'Yearly'
                } Attendance Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {attendanceLoading ? (
                <div className="flex justify-center py-10">Loading attendance data...</div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" name="Students" fill="#1E88E5" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="teachers" name="Teachers" fill="#26A69A" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Student Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{studentAttendanceAvg.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">
                      {studentAttendanceAvg > 90 ? 'Excellent attendance rate' : 
                       studentAttendanceAvg > 80 ? 'Good attendance rate' : 
                       'Needs improvement'}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Teacher Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{teacherAttendanceAvg.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">
                      {teacherAttendanceAvg > 95 ? 'Excellent commitment' : 'Good commitment'}
                    </p>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {subjectPerformanceLoading ? (
                  <div className="flex justify-center py-10 col-span-2">Loading subject data...</div>
                ) : (
                  <>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={subjectPerformance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="score" fill="#81C784" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={subjectPerformance}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="score"
                            nameKey="name"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {subjectPerformance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Strongest Subject</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {subjectPerformance.sort((a, b) => b.score - a.score)[0]?.name || 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Average Score: {subjectPerformance.sort((a, b) => b.score - a.score)[0]?.score || 0}%
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Subject Needing Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">
                      {subjectPerformance.sort((a, b) => a.score - b.score)[0]?.name || 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Average Score: {subjectPerformance.sort((a, b) => a.score - b.score)[0]?.score || 0}%
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <span>Student Performance Trends {selectedClass ? `(${allClasses.find(c => c.id.toString() === selectedClass)?.name})` : ''}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {studentTrendsLoading ? (
                <div className="flex justify-center py-10">Loading trend data...</div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="average" stroke="#8884d8" activeDot={{ r: 8 }} name="Class Average" />
                      <Line type="monotone" dataKey="topPerformer" stroke="#82ca9d" name="Top Performer" />
                      <Line type="monotone" dataKey="lowPerformer" stroke="#ff7300" name="Low Performer" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-green-500">Improving</div>
                    <p className="text-xs text-muted-foreground">
                      Average score increased by {
                        studentTrends.length > 1 ? 
                        (studentTrends[studentTrends.length - 1].average - studentTrends[0].average).toFixed(1) : 
                        0
                      }% over the period
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Gap Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold">{
                      studentTrends.length > 0 ? 
                      (studentTrends[studentTrends.length - 1].topPerformer - 
                       studentTrends[studentTrends.length - 1].lowPerformer).toFixed(1) : 
                      0
                    }%</div>
                    <p className="text-xs text-muted-foreground">
                      Current gap between top and low performers
                    </p>
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
