
import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Bell, Users, Calendar, FileText, ClipboardList, 
  Megaphone, CreditCard, BarChart2, Shield, HelpCircle
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose }) => {
  const menuItems = [
    { name: 'Notifications & Alerts', path: '/notifications', icon: Bell },
    { name: 'Student & Teacher Directory', path: '/directory', icon: Users },
    { name: 'School Calendar & Events', path: '/calendar', icon: Calendar },
    { name: 'Assignment & Exam Scheduling', path: '/assignments', icon: FileText },
    { name: 'Attendance Tracking', path: '/attendance', icon: ClipboardList },
    { name: 'Announcements & Circulars', path: '/announcements', icon: Megaphone },
    { name: 'Fee & Finance Management', path: '/finance', icon: CreditCard },
    { name: 'School Performance Analytics', path: '/performance', icon: BarChart2 },
    { name: 'Security & Access Control', path: '/security', icon: Shield },
    { name: 'Support & Helpdesk', path: '/support', icon: HelpCircle },
  ];

  const closeOnEscapeKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:w-64 md:shadow-none md:border-r md:border-gray-200 md:dark:border-gray-700`}
        onKeyDown={closeOnEscapeKey}
        tabIndex={open ? 0 : -1}
      >
        {/* Drawer header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">School Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X size={20} />
          </Button>
        </div>

        {/* Drawer content */}
        <ScrollArea className="flex-1 h-[calc(100vh-64px)]">
          <nav className="p-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `side-menu-item ${isActive ? 'active' : ''}`
                }
                onClick={() => window.innerWidth < 768 && onClose()}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </>
  );
};

export default SideDrawer;
