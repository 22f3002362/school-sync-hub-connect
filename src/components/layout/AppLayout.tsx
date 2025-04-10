
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import SideDrawer from './SideDrawer';
import Header from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <SideDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 overflow-auto p-4 pb-16 md:pb-4">
            <Outlet />
          </main>
        </div>
        <BottomNavigation />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
