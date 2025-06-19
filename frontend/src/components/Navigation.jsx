import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Fetch Config', path: '/fetch-config' },
    { name: 'Update Remark', path: '/update-remark' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Settings className="h-8 w-8 text-violet-600 group-hover:rotate-180 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-bold gradient-purple bg-clip-text text-transparent">
                CodeRower
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'gradient-purple text-white shadow-lg'
                    : 'text-gray-700 hover:text-violet-600 hover:bg-violet-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-violet-600 hover:bg-violet-50 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'gradient-purple text-white shadow-lg'
                      : 'text-gray-700 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;