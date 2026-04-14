// ==================== components/dashboard/DashboardLayout.jsx ====================
import React, { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';

const DashboardLayout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden'
          onClick={closeSidebar}
        />
      )}

      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Mobile Menu Button */}
        <div className='lg:hidden fixed top-4 left-4 z-20'>
          <button
            onClick={toggleSidebar}
            className='p-2 bg-white rounded-lg shadow-lg text-gray-600 hover:text-gray-900'>
            <Bars3Icon className='w-6 h-6' />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
