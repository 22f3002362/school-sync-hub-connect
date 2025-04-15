
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Users, BookOpen, User, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AddClassModal from '@/components/modals/AddClassModal';
import { classesAPI, teachersAPI, subjectsAPI } from '@/services/api';
import { useApi } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const { toast } = useToast();

  // API hooks
  const { 
    data: classesData, 
    loading: classesLoading, 
    error: classesError,
    execute: fetchClasses 
  } = useApi(classesAPI.getAllClasses);

  const { 
    data: teachersData, 
    loading: teachersLoading,
    error: teachersError, 
    execute: fetchTeachers 
  } = useApi(teachersAPI.getAllTeachers);

  const { 
    data: subjectsData, 
    loading: subjectsLoading,
    error: subjectsError, 
    execute: fetchSubjects 
  } = useApi(subjectsAPI.getAllSubjects);

  useEffect(() => {
    // Fetch data on component mount
    const loadData = async () => {
      try {
        await Promise.all([
          fetchClasses(),
          fetchTeachers(),
          fetchSubjects()
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [fetchClasses, fetchTeachers, fetchSubjects]);

  // Sample data for fallback when API data is not yet available
  const classes = classesData || [
    { id: 1, name: 'Class 1-A', students: 32, subjects: 6, teacher: 'Ms. Johnson' },
    { id: 2, name: 'Class 2-B', students: 28, subjects: 7, teacher: 'Mr. Smith' },
    { id: 3, name: 'Class 3-C', students: 35, subjects: 8, teacher: 'Mrs. Davis' },
    { id: 4, name: 'Class 4-A', students: 30, subjects: 9, teacher: 'Mr. Wilson' },
    { id: 5, name: 'Class 5-B', students: 33, subjects: 9, teacher: 'Ms. Brown' },
    { id: 6, name: 'Class 6-C', students: 29, subjects: 10, teacher: 'Mr. Taylor' },
  ];

  const teachers = teachersData || [
    { id: 1, name: 'Sarah Johnson', subjects: ['Mathematics', 'Science'], classes: 2 },
    { id: 2, name: 'Robert Smith', subjects: ['English', 'History'], classes: 3 },
    { id: 3, name: 'Laura Davis', subjects: ['Science', 'Geography'], classes: 2 },
    { id: 4, name: 'Michael Wilson', subjects: ['Physical Education', 'Health'], classes: 4 },
    { id: 5, name: 'Jennifer Brown', subjects: ['Art', 'Music'], classes: 5 },
    { id: 6, name: 'Thomas Taylor', subjects: ['Computer Science', 'Mathematics'], classes: 2 },
  ];

  const subjects = subjectsData || [
    { id: 1, name: 'Mathematics', teachers: 3, classes: 6 },
    { id: 2, name: 'Science', teachers: 2, classes: 5 },
    { id: 3, name: 'English', teachers: 2, classes: 6 },
    { id: 4, name: 'History', teachers: 1, classes: 4 },
    { id: 5, name: 'Geography', teachers: 1, classes: 3 },
    { id: 6, name: 'Physical Education', teachers: 2, classes: 6 },
    { id: 7, name: 'Art', teachers: 1, classes: 5 },
    { id: 8, name: 'Music', teachers: 1, classes: 4 },
    { id: 9, name: 'Computer Science', teachers: 1, classes: 3 },
  ];

  const filteredClasses = classes.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClassAdded = () => {
    // Refresh the classes data
    fetchClasses().catch(err => {
      console.error("Failed to refresh classes:", err);
      toast({
        title: "Error",
        description: "Failed to refresh classes data",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Classes & Teachers</h1>
          <p className="text-muted-foreground">
            Manage your classes, teachers, and subjects.
          </p>
        </div>
        <div className="w-full md:w-auto flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="shrink-0" onClick={() => setIsAddClassModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" /> Add New
          </Button>
        </div>
      </div>

      <Tabs defaultValue="classes">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="classes" className="pt-4">
          {classesLoading ? (
            <div className="flex justify-center py-10">Loading classes...</div>
          ) : classesError ? (
            <div className="text-red-500 py-10 text-center">
              Error loading classes. Please try again.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.map((classItem) => (
                <Card key={classItem.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>{classItem.name}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <User className="h-4 w-4 mr-1" />
                      <span>Class Teacher: {classItem.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{classItem.students} Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">{classItem.subjects} Subjects</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="teachers" className="pt-4">
          {teachersLoading ? (
            <div className="flex justify-center py-10">Loading teachers...</div>
          ) : teachersError ? (
            <div className="text-red-500 py-10 text-center">
              Error loading teachers. Please try again.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTeachers.map((teacher) => (
                <Card key={teacher.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>{teacher.name}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {teacher.subjects.map((subject, idx) => (
                        <Badge key={idx} variant="secondary">{subject}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>Teaching {teacher.classes} classes</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="subjects" className="pt-4">
          {subjectsLoading ? (
            <div className="flex justify-center py-10">Loading subjects...</div>
          ) : subjectsError ? (
            <div className="text-red-500 py-10 text-center">
              Error loading subjects. Please try again.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((subject) => (
                <Card key={subject.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span>{subject.name}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{subject.teachers} Teachers</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{subject.classes} Classes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddClassModal 
        open={isAddClassModalOpen}
        onClose={() => setIsAddClassModalOpen(false)}
        onClassAdded={handleClassAdded}
      />
    </div>
  );
};

export default Classes;
