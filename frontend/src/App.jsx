import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import FetchConfig from './pages/FetchConfig';
import UpdateRemark from './pages/UpdateRemark';
import Loader from './components/Loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fetch-config" element={<FetchConfig />} />
          <Route path="/update-remark" element={<UpdateRemark />} />
        </Routes>
      </BrowserRouter>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#8B5CF6',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
};

export default App;