
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, BarChart2, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const BottomNavigation = () => {
  const isMobile = useIsMobile();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Classes', path: '/classes', icon: BookOpen },
    { name: 'Communication', path: '/communication', icon: MessageSquare },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Calculate screen width for extra small devices
  const isExtraSmall = typeof window !== 'undefined' && window.innerWidth < 400;

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center py-2 px-1 ${isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`
            }
          >
            <item.icon size={isExtraSmall ? 16 : 20} className="mb-1" />
            {!isExtraSmall && <span className="text-xs mt-1 truncate">{item.name}</span>}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
