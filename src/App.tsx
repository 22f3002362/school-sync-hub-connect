
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Classes from "@/pages/Classes";
import Communication from "@/pages/Communication";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="classes" element={<Classes />} />
              <Route path="communication" element={<Communication />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              {/* Secondary navigation routes */}
              <Route path="notifications" element={<div>Notifications & Alerts</div>} />
              <Route path="directory" element={<div>Student & Teacher Directory</div>} />
              <Route path="calendar" element={<div>School Calendar & Events</div>} />
              <Route path="assignments" element={<div>Assignment & Exam Scheduling</div>} />
              <Route path="attendance" element={<div>Attendance Tracking</div>} />
              <Route path="announcements" element={<div>Announcements & Circulars</div>} />
              <Route path="finance" element={<div>Fee & Finance Management</div>} />
              <Route path="performance" element={<div>School Performance Analytics</div>} />
              <Route path="security" element={<div>Security & Access Control</div>} />
              <Route path="support" element={<div>Support & Helpdesk</div>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
