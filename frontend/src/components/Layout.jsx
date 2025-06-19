import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <Navigation />
      
      <main className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-96 -left-32 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-violet-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with ❤️ by{' '}
              <span className="gradient-purple bg-clip-text text-transparent font-semibold">
                Siddhant Bhagat
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Secure Configuration Management Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;