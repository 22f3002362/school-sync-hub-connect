
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { classesAPI } from '@/services/api';
import { useApi } from '@/hooks/use-api';

type AddClassModalProps = {
  open: boolean;
  onClose: () => void;
  onClassAdded: () => void;
};

const AddClassModal = ({ open, onClose, onClassAdded }: AddClassModalProps) => {
  const [className, setClassName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { toast } = useToast();
  
  const { loading, execute: createClass } = useApi(classesAPI.createClass);

  // Sample data - in a real app, these would come from API calls
  const availableSubjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'English' },
    { id: 4, name: 'History' },
    { id: 5, name: 'Geography' },
    { id: 6, name: 'Physical Education' },
    { id: 7, name: 'Art' },
    { id: 8, name: 'Music' },
    { id: 9, name: 'Computer Science' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!className || !teacherName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await createClass({
        name: className,
        teacher: teacherName,
        subjects: selectedSubjects.map(s => parseInt(s)),
      });

      toast({
        title: "Success",
        description: `Class ${className} has been created`,
      });
      
      onClassAdded();
      onClose();
      
      // Reset form
      setClassName('');
      setTeacherName('');
      setSelectedSubjects([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create class. Please try again.",
        variant: "destructive"
      });
      console.error("Failed to create class:", error);
    }
  };

  const handleSubjectChange = (value: string) => {
    if (selectedSubjects.includes(value)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== value));
    } else {
      setSelectedSubjects([...selectedSubjects, value]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="className">Class Name</Label>
            <Input
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g., Class 1-A"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teacherName">Class Teacher</Label>
            <Input
              id="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="e.g., Ms. Johnson"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select subjects" />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id.toString()}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSubjects.map((subjectId) => {
                const subject = availableSubjects.find(s => s.id.toString() === subjectId);
                return (
                  <Button
                    key={subjectId}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSubjectChange(subjectId)}
                    type="button"
                  >
                    {subject?.name} ✕
                  </Button>
                );
              })}
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Class'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassModal;
