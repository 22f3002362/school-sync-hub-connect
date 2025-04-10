
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, MessageSquare, BarChart2, Settings } from 'lucide-react';

const BottomNavigation = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Classes', path: '/classes', icon: BookOpen },
    { name: 'Communication', path: '/communication', icon: MessageSquare },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : 'text-gray-500 dark:text-gray-400'}`
            }
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
