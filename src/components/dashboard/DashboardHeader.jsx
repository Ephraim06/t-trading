// ==================== components/dashboard/DashboardHeader.jsx ====================
import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([]);

  return (
    <header className='bg-white border-b border-gray-200 sticky top-0 z-10'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <h1 className='text-lg sm:text-xl font-semibold text-gray-800'>
              Operations Dashboard
            </h1>
          </div>

          <div className='flex items-center gap-3 sm:gap-4'>
            {/* Search */}
            <div className='hidden md:block relative'>
              <MagnifyingGlassIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search...'
                className='pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64 text-sm'
              />
            </div>

            {/* Notifications */}
            <div className='relative'>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className='relative'>
                <BellIcon className='w-6 h-6 text-gray-600' />
                <span className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                  5
                </span>
              </button>

              {showNotifications && (
                <div className='absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20'>
                  <div className='p-3 border-b border-gray-200'>
                    <p className='font-semibold text-gray-900'>Notifications</p>
                  </div>
                  <div className='max-h-96 overflow-y-auto'>
                    {notifications.length === 0 ? (
                      <p className='text-sm text-gray-500 p-4 text-center'>
                        No new notifications
                      </p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className='p-3 hover:bg-gray-50 border-b border-gray-100'>
                          <p className='text-sm text-gray-800'>
                            {notif.message}
                          </p>
                          <p className='text-xs text-gray-500 mt-1'>
                            {notif.time}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <button className='relative hidden sm:block'>
              <EnvelopeIcon className='w-6 h-6 text-gray-600' />
              <span className='absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center'>
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
