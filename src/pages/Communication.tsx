
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Megaphone, MessageSquare, Send, User, Clock, Calendar, Search } from 'lucide-react';
import { communicationAPI } from '@/services/api';
import { useApi } from '@/hooks/use-api';
import { useToast } from '@/hooks/use-toast';

type Announcement = {
  id: number;
  title: string;
  content: string;
  sender: string;
  date: string;
  target: string;
};

type Chat = {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
};

type Message = {
  id: number;
  senderId: string;
  content: string;
  time: string;
};

const Communication = () => {
  const [messageText, setMessageText] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // API hooks
  const { 
    data: conversationsData, 
    loading: conversationsLoading, 
    execute: fetchConversations 
  } = useApi(communicationAPI.getAllConversations);

  const { 
    data: messagesData, 
    loading: messagesLoading, 
    execute: fetchMessages 
  } = useApi(communicationAPI.getMessagesByConversationId);

  const { 
    loading: sendingMessage, 
    execute: sendMessageApi 
  } = useApi(communicationAPI.sendMessage);

  const { 
    data: announcementsData, 
    loading: announcementsLoading, 
    execute: fetchAnnouncements 
  } = useApi(communicationAPI.getAllAnnouncements);

  useEffect(() => {
    // Fetch conversations and announcements on component mount
    fetchConversations().catch(console.error);
    fetchAnnouncements().catch(console.error);
  }, [fetchConversations, fetchAnnouncements]);

  useEffect(() => {
    // Fetch messages when selecting a chat
    if (selectedChat) {
      fetchMessages(selectedChat).catch(console.error);
    }
  }, [selectedChat, fetchMessages]);

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesData]);

  // Sample data for fallback when API data is not yet available
  const announcements: Announcement[] = announcementsData as Announcement[] || [
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

  const chats: Chat[] = conversationsData as Chat[] || [
    { id: 1, name: 'Sarah Johnson', role: 'Teacher', lastMessage: 'Could we discuss the math curriculum?', time: '10:30 AM', unread: 2 },
    { id: 2, name: 'Robert Smith', role: 'Parent', lastMessage: 'Thank you for the updates', time: 'Yesterday', unread: 0 },
    { id: 3, name: 'Emily Davis', role: 'Student', lastMessage: 'I have submitted my assignment', time: 'Yesterday', unread: 0 },
    { id: 4, name: 'Class 5-B Group', role: 'Class Group', lastMessage: 'Don\'t forget to bring your science project materials', time: '2 days ago', unread: 5 },
    { id: 5, name: 'Teachers Lounge', role: 'Group', lastMessage: 'Meeting scheduled for tomorrow at 9 AM', time: '2 days ago', unread: 0 },
  ];

  // Filter chats based on search query
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current chat
  const currentChat = chats.find(chat => chat.id === selectedChat);

  // Sample messages data (would come from API in real app)
  const messages: Message[] = messagesData as Message[] || [
    { id: 1, senderId: 'them', content: 'Good morning! Could we discuss the math curriculum for Class 5-B?', time: '10:30 AM' },
    { id: 2, senderId: 'me', content: 'Of course, I\'ve been reviewing it. Do you have specific concerns?', time: '10:32 AM' },
    { id: 3, senderId: 'them', content: 'Yes, I think we should adjust the difficulty level for some students who are struggling. Can we meet to discuss?', time: '10:34 AM' },
  ];

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedChat) return;
    
    try {
      await sendMessageApi({
        conversationId: selectedChat,
        content: messageText,
        senderId: 999, // This would be the current user's ID in a real app
      });
      
      // Refresh messages
      fetchMessages(selectedChat);
      
      // Clear message input
      setMessageText('');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      console.error("Failed to send message:", error);
    }
  };

  const handleCreateAnnouncement = async (formData: FormData) => {
    try {
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const target = formData.get('target') as string;
      
      if (!title || !content || !target) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      await communicationAPI.createAnnouncement({
        title,
        content,
        target,
        sender: 'Current User', // This would be dynamic in a real app
      });
      
      toast({
        title: "Success",
        description: "Announcement published successfully",
      });
      
      // Refresh announcements
      fetchAnnouncements();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish announcement. Please try again.",
        variant: "destructive"
      });
      console.error("Failed to create announcement:", error);
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
              {announcementsLoading ? (
                <div className="flex justify-center py-10">Loading announcements...</div>
              ) : (
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
              )}
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
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateAnnouncement(new FormData(e.currentTarget));
                  }}>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="title">Title</label>
                      <Input id="title" name="title" placeholder="Announcement title" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="content">Content</label>
                      <Textarea id="content" name="content" placeholder="Write your announcement here..." rows={4} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="target">Target Audience</label>
                      <Select name="target" defaultValue="all">
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
                    <Button type="submit" className="w-full">Publish Announcement</Button>
                  </form>
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
                  <div className="mt-2 relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search chats..." 
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto p-2">
                  <div className="space-y-2">
                    {conversationsLoading ? (
                      <div className="flex justify-center py-10">Loading conversations...</div>
                    ) : (
                      filteredChats.map((chat) => (
                        <div 
                          key={chat.id} 
                          className={`flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer ${selectedChat === chat.id ? 'bg-muted' : ''}`}
                          onClick={() => setSelectedChat(chat.id)}
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
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className="h-[70vh] flex flex-col">
                {selectedChat ? (
                  <>
                    <CardHeader className="pb-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">{currentChat?.name.charAt(0)}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{currentChat?.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{currentChat?.role} • Online</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-4">
                      {messagesLoading ? (
                        <div className="flex justify-center py-10">Loading messages...</div>
                      ) : (
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div 
                              key={message.id} 
                              className={`flex items-end gap-2 ${message.senderId === 'me' ? 'justify-end' : ''}`}
                            >
                              {message.senderId !== 'me' && (
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-xs text-primary">{currentChat?.name.charAt(0)}</span>
                                </div>
                              )}
                              <div className={`${
                                message.senderId === 'me' 
                                  ? 'bg-primary text-primary-foreground rounded-lg rounded-br-none' 
                                  : 'bg-muted rounded-lg rounded-bl-none'
                                } p-3 max-w-[80%]`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <div className={`flex items-center mt-1 text-xs ${
                                  message.senderId === 'me'
                                    ? 'justify-end text-primary-foreground/80'
                                    : 'text-muted-foreground'
                                }`}>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{message.time}</span>
                                </div>
                              </div>
                              {message.senderId === 'me' && (
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                  <span className="font-semibold text-xs text-primary-foreground">Y</span>
                                </div>
                              )}
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </CardContent>
                    <div className="p-3 border-t">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button size="icon" onClick={handleSendMessage} disabled={sendingMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">No Conversation Selected</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Select a conversation from the sidebar to start chatting
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communication;
