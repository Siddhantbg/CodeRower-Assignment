import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing secure configuration infrastructure');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Wait a bit then fade out
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev.endsWith('...')) {
          return 'Initializing secure configuration infrastructure';
        }
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center gradient-purple-dark">
      <div className="text-center">
        
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <Settings 
              className="h-20 w-20 text-white animate-spin" 
              style={{ animationDuration: '3s' }}
            />
            <div className="absolute inset-0 animate-pulse-purple rounded-full"></div>
          </div>
        </div>

        
        <h1 className="text-4xl font-bold text-white mb-2">
          CodeRower
        </h1>
        <p className="text-violet-200 text-lg mb-12">
          Configuration Management Platform
        </p>

        
        <div className="w-80 bg-white/20 rounded-full h-2 mb-6 mx-auto overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        
        <div className="text-white text-xl font-semibold mb-4">
          {progress}%
        </div>

       
        <p className="text-violet-200 text-sm max-w-md mx-auto">
          {loadingText}
        </p>
      </div>
    </div>
  );
};

export default Loader;