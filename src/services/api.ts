
/**
 * API Service for School Management App
 * This service provides endpoints for integration with backend systems
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.schoolmanagement.example';

// Authentication endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),
  
  logout: () => fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' }),
  
  getCurrentUser: () => fetch(`${API_BASE_URL}/auth/me`)
};

// Classes endpoints
export const classesAPI = {
  getAllClasses: () => fetch(`${API_BASE_URL}/classes`),
  
  getClassById: (id: number) => fetch(`${API_BASE_URL}/classes/${id}`),
  
  createClass: (classData: {
    name: string;
    teacher: string;
    subjects: number[];
    students?: number;
  }) => fetch(`${API_BASE_URL}/classes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(classData)
  }),
  
  updateClass: (id: number, classData: Partial<{
    name: string;
    teacher: string;
    subjects: number[];
    students: number;
  }>) => fetch(`${API_BASE_URL}/classes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(classData)
  }),
  
  deleteClass: (id: number) => fetch(`${API_BASE_URL}/classes/${id}`, { method: 'DELETE' })
};

// Teachers endpoints
export const teachersAPI = {
  getAllTeachers: () => fetch(`${API_BASE_URL}/teachers`),
  
  getTeacherById: (id: number) => fetch(`${API_BASE_URL}/teachers/${id}`),
  
  createTeacher: (teacherData: {
    name: string;
    subjects: string[];
    classes?: number;
  }) => fetch(`${API_BASE_URL}/teachers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacherData)
  }),
  
  updateTeacher: (id: number, teacherData: Partial<{
    name: string;
    subjects: string[];
    classes: number;
  }>) => fetch(`${API_BASE_URL}/teachers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacherData)
  }),
  
  deleteTeacher: (id: number) => fetch(`${API_BASE_URL}/teachers/${id}`, { method: 'DELETE' })
};

// Subjects endpoints
export const subjectsAPI = {
  getAllSubjects: () => fetch(`${API_BASE_URL}/subjects`),
  
  getSubjectById: (id: number) => fetch(`${API_BASE_URL}/subjects/${id}`),
  
  createSubject: (subjectData: {
    name: string;
    teachers: number;
    classes: number;
  }) => fetch(`${API_BASE_URL}/subjects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subjectData)
  }),
  
  updateSubject: (id: number, subjectData: Partial<{
    name: string;
    teachers: number;
    classes: number;
  }>) => fetch(`${API_BASE_URL}/subjects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subjectData)
  }),
  
  deleteSubject: (id: number) => fetch(`${API_BASE_URL}/subjects/${id}`, { method: 'DELETE' })
};

// Communication endpoints
export const communicationAPI = {
  // Announcements
  getAllAnnouncements: () => fetch(`${API_BASE_URL}/announcements`),
  
  createAnnouncement: (announcementData: {
    title: string;
    content: string;
    target: string;
    sender: string;
  }) => fetch(`${API_BASE_URL}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(announcementData)
  }),
  
  // Messages
  getAllConversations: () => fetch(`${API_BASE_URL}/messages/conversations`),
  
  getConversationById: (id: number) => fetch(`${API_BASE_URL}/messages/conversations/${id}`),
  
  getMessagesByConversationId: (conversationId: number) => 
    fetch(`${API_BASE_URL}/messages/conversations/${conversationId}/messages`),
  
  sendMessage: (messageData: {
    conversationId: number;
    content: string;
    senderId: number;
  }) => fetch(`${API_BASE_URL}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData)
  })
};

// Analytics endpoints
export const analyticsAPI = {
  getPerformanceData: (classId?: number) => 
    fetch(`${API_BASE_URL}/analytics/performance${classId ? `?classId=${classId}` : ''}`),
  
  getAttendanceData: (period: 'day' | 'week' | 'month' | 'year' = 'week') => 
    fetch(`${API_BASE_URL}/analytics/attendance?period=${period}`),
  
  getSubjectPerformance: () => fetch(`${API_BASE_URL}/analytics/subjects-performance`),
  
  getClassComparison: () => fetch(`${API_BASE_URL}/analytics/class-comparison`),
  
  getStudentPerformanceTrends: (classId?: number) => 
    fetch(`${API_BASE_URL}/analytics/student-trends${classId ? `?classId=${classId}` : ''}`)
};

// Settings endpoints
export const settingsAPI = {
  getGeneralSettings: () => fetch(`${API_BASE_URL}/settings/general`),
  
  updateGeneralSettings: (settings: any) => fetch(`${API_BASE_URL}/settings/general`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  }),
  
  getUserSettings: () => fetch(`${API_BASE_URL}/settings/user`),
  
  updateUserSettings: (settings: any) => fetch(`${API_BASE_URL}/settings/user`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
};
