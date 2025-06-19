import React, { useState, useEffect } from 'react';
import { Search, Loader2, Database, AlertCircle, Wifi, WifiOff, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { usePageAnimation, useButtonHover, useInputFocus, useResultsAnimation } from '../hooks/useGSAP';
import { fetchConfiguration, checkBackendHealth } from '../services/api';

const FetchConfig = () => {
  const [configId, setConfigId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [configData, setConfigData] = useState(null);
  const [errors, setErrors] = useState({});
  const [backendStatus, setBackendStatus] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const pageRef = usePageAnimation();
  const { buttonRef, handleMouseEnter, handleMouseLeave } = useButtonHover();
  const { handleFocus, handleBlur } = useInputFocus();
  const { resultsRef, animateResults } = useResultsAnimation();

  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setBackendStatus(isHealthy);
      
      if (!isHealthy) {
        toast.error('Backend server is not running. Please start your backend server on port 8080.');
      }
    };
    
    checkHealth();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!configId.trim()) {
      newErrors.configId = 'Configuration ID is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    if (backendStatus === false) {
      toast.error('Backend server is not available. Please start your backend server.');
      return;
    }

    setIsLoading(true);
    setConfigData(null);
    setIsEmpty(false);
    
    try {
      const data = await fetchConfiguration(configId.trim());
      
      if (Array.isArray(data) && data.length === 0) {
        setIsEmpty(true);
        toast.error(`No configuration found for ID: ${configId}. This ID doesn't exist in the database.`);
        return;
      }
      
      if (Array.isArray(data) && data.length > 0) {
        setConfigData(data);
        toast.success(`Successfully retrieved configuration for ID: ${configId}`);
        
        setTimeout(() => {
          animateResults();
        }, 100);
      }
      else if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
        if (data.data.length === 0) {
          setIsEmpty(true);
          toast.error(`No configuration found for ID: ${configId}`);
          return;
        }
        setConfigData(data.data);
        toast.success(`Successfully retrieved configuration for ID: ${configId}`);
        
        setTimeout(() => {
          animateResults();
        }, 100);
      }
      else {
        throw new Error('Invalid data format received from server');
      }
      
    } catch (error) {
      toast.error(error.message || 'Failed to fetch configuration');
      setConfigData(null);
      setIsEmpty(false);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setConfigId('');
    setConfigData(null);
    setErrors({});
    setIsEmpty(false);
  };

  const handleTryAgain = async () => {
    const isHealthy = await checkBackendHealth();
    setBackendStatus(isHealthy);
    
    if (isHealthy) {
      toast.success('Backend connection restored!');
    } else {
      toast.error('Backend is still not available');
    }
  };

  return (
    <Layout>
      <div ref={pageRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 opacity-0">
        {/* Backend Status Indicator */}
        <div className="mb-6">
          <div className={`flex items-center justify-center p-3 rounded-xl ${
            backendStatus === true 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : backendStatus === false
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
          }`}>
            {backendStatus === true ? (
              <>
                <Wifi className="h-5 w-5 mr-2" />
                Backend Connected (localhost:8080)
              </>
            ) : backendStatus === false ? (
              <>
                <WifiOff className="h-5 w-5 mr-2" />
                Backend Disconnected - Please start your backend server
                <button 
                  onClick={handleTryAgain}
                  className="ml-3 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </>
            ) : (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Checking backend connection...
              </>
            )}
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-violet-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Fetch Configuration
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Retrieve configuration data by entering a valid configuration ID. 
            The system will return a structured data array from your MongoDB database.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="configId" className="block text-sm font-semibold text-gray-700 mb-2">
                Configuration ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="configId"
                  value={configId}
                  onChange={(e) => setConfigId(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 ${
                    errors.configId 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-violet-500'
                  }`}
                  placeholder="Enter configuration ID (e.g., config123)"
                  disabled={isLoading}
                />
                <Database className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.configId && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.configId}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500">
                💡 Enter any configuration ID that exists in your MongoDB database
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isLoading || backendStatus === false}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex-1 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Fetching from Database...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Fetch Configuration
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {isEmpty && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-3">
              <Info className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-yellow-800">No Configuration Found</h3>
            </div>
            <div className="text-sm text-yellow-700">
              <p className="mb-2">The configuration ID "{configId}" doesn't exist in your MongoDB database.</p>
              <p className="font-medium">To test the application:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Check your MongoDB database for existing configuration IDs</li>
                <li>Add a test configuration to your database first</li>
                <li>Or try a different configuration ID</li>
              </ul>
            </div>
          </div>
        )}

        {configData && configData.length > 0 && (
          <div ref={resultsRef} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 opacity-0">
            <div className="flex items-center mb-6">
              <Database className="h-6 w-6 text-violet-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Configuration Data</h2>
              <div className="ml-auto px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Live from MongoDB
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="grid gap-4">
                {configData.map((row, rowIndex) => (
                  <div key={rowIndex} className="result-row flex flex-wrap gap-2 opacity-0">
                    <span className="text-sm font-medium text-gray-500 min-w-16">
                      Row {rowIndex + 1}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(row) ? row.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="px-3 py-1 bg-violet-100 text-violet-800 rounded-lg text-sm font-medium"
                        >
                          {item}
                        </span>
                      )) : (
                        <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-lg text-sm font-medium">
                          {JSON.stringify(row)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Configuration ID: <span className="font-medium text-violet-600">{configId}</span>
              <span className="ml-4 text-green-600">✅ Fetched from live database</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FetchConfig;