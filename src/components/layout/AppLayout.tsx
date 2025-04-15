
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import SideDrawer from './SideDrawer';
import Header from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close sidebar when transitioning from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header onMenuClick={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <SideDrawer open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className={`flex-1 overflow-auto p-4 max-w-full ${isMobile ? 'pb-20' : 'pb-4'}`}>
            <div className="container mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
        <BottomNavigation />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
