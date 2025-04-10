
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Megaphone, MessageSquare, Send, User, Clock, Calendar } from 'lucide-react';

const Communication = () => {
  const [messageText, setMessageText] = useState('');

  // Sample data
  const announcements = [
    { 
      id: 1, 
      title: 'Annual Sports Day', 
      content: 'The annual sports day will be held on April 22nd. All students must participate in at least one event.',
      sender: 'Principal', 
      date: 'Apr 10', 
      target: 'All' 
    },
    { 
      id: 2, 
      title: 'Parent Teacher Meeting', 
      content: 'PTM will be conducted on April 15th from 2:00 PM to 5:00 PM. Please ensure attendance.',
      sender: 'Vice Principal', 
      date: 'Apr 8', 
      target: 'Parents' 
    },
    { 
      id: 3, 
      title: 'Science Exhibition', 
      content: 'Science exhibition projects must be submitted by April 16th. Exhibition will be on April 18th.',
      sender: 'Science Department', 
      date: 'Apr 5', 
      target: 'Students' 
    },
  ];

  const chats = [
    { id: 1, name: 'Sarah Johnson', role: 'Teacher', lastMessage: 'Could we discuss the math curriculum?', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Robert Smith', role: 'Parent', lastMessage: 'Thank you for the updates', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Emily Davis', role: 'Student', lastMessage: 'I have submitted my assignment', time: 'Yesterday', unread: 0 },
    { id: 4, name: 'Class 5-B Group', role: 'Class Group', lastMessage: 'Don\'t forget to bring your science project materials', time: '2 days ago', unread: 5 },
    { id: 5, name: 'Teachers Lounge', role: 'Group', lastMessage: 'Meeting scheduled for tomorrow at 9 AM', time: '2 days ago', unread: 0 },
  ];

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      // In a real app, this would send the message to an API
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Communication</h1>
        <p className="text-muted-foreground">
          Manage announcements and chat with teachers, parents, and students.
        </p>
      </div>

      <Tabs defaultValue="announcements">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="announcements" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <Badge variant={
                          announcement.target === 'All' ? 'default' :
                          announcement.target === 'Parents' ? 'secondary' : 'outline'
                        }>
                          {announcement.target}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{announcement.content}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{announcement.sender}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{announcement.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-primary" />
                    <span>Create Announcement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="title">Title</label>
                    <Input id="title" placeholder="Announcement title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="content">Content</label>
                    <Textarea id="content" placeholder="Write your announcement here..." rows={4} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="target">Target Audience</label>
                    <Select>
                      <SelectTrigger id="target">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="teachers">Teachers</SelectItem>
                        <SelectItem value="parents">Parents</SelectItem>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Publish Announcement</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="messages" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <Card className="h-[70vh] flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>Conversations</span>
                  </CardTitle>
                  <div className="mt-2">
                    <Input placeholder="Search chats..." />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-2">
                  <div className="space-y-2">
                    {chats.map((chat) => (
                      <div 
                        key={chat.id} 
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="font-semibold text-primary">{chat.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                            {chat.unread > 0 && (
                              <span className="inline-flex items-center justify-center h-5 w-5 text-xs rounded-full bg-primary text-primary-foreground">
                                {chat.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-[70vh] flex flex-col">
                <CardHeader className="pb-2 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-semibold text-primary">S</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                      <p className="text-xs text-muted-foreground">Math Teacher • Online</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-xs text-primary">S</span>
                      </div>
                      <div className="bg-muted rounded-lg rounded-bl-none p-3 max-w-[80%]">
                        <p className="text-sm">Good morning! Could we discuss the math curriculum for Class 5-B?</p>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>10:30 AM</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-end gap-2">
                      <div className="bg-primary text-primary-foreground rounded-lg rounded-br-none p-3 max-w-[80%]">
                        <p className="text-sm">Of course, I've been reviewing it. Do you have specific concerns?</p>
                        <div className="flex items-center justify-end mt-1 text-xs text-primary-foreground/80">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>10:32 AM</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-xs text-primary-foreground">Y</span>
                      </div>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-xs text-primary">S</span>
                      </div>
                      <div className="bg-muted rounded-lg rounded-bl-none p-3 max-w-[80%]">
                        <p className="text-sm">Yes, I think we should adjust the difficulty level for some students who are struggling. Can we meet to discuss?</p>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>10:34 AM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-3 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communication;
