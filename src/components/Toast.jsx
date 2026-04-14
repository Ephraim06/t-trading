// ==================== components/Toast.jsx ====================
import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const animationStyles = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes progress {
    0% { width: 0%; }
    100% { width: 100%; }
  }
  .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
  .animate-progress { animation: progress 3s linear forwards; }
`;

const Toast = ({ toast }) => {
  if (!toast) return null;

  return (
    <>
      <style>{animationStyles}</style>
      <div className='fixed top-20 right-4 z-50 animate-slide-in-right'>
        <div
          className={`flex items-center gap-3 ${
            toast.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          } border rounded-lg p-4 shadow-lg`}>
          <CheckCircleIcon
            className={`w-5 h-5 ${
              toast.type === 'success' ? 'text-green-500' : 'text-blue-500'
            }`}
          />
          <p className='text-sm font-medium flex-1'>{toast.message}</p>
          <div className='w-16 h-1 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className={`h-full ${
                toast.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              } animate-progress`}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
