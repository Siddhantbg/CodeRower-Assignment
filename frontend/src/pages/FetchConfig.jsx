import React, { useState, useEffect } from 'react';
import { Search, Loader2, Database } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { usePageAnimation, useButtonHover, useInputFocus, useResultsAnimation } from '../hooks/useGSAP';

const mockConfigData = [
  ["sym1", "sym2", "sym3"],
  ["sym4", "sym6", "sym8"], 
  ["sym5", "sym1", "sym0"]
];

const FetchConfig = () => {
  const [configId, setConfigId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [configData, setConfigData] = useState(null);
  const [errors, setErrors] = useState({});

  const pageRef = usePageAnimation();
  const { buttonRef, handleMouseEnter, handleMouseLeave } = useButtonHover();
  const { handleFocus, handleBlur } = useInputFocus();
  const { resultsRef, animateResults } = useResultsAnimation();

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
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setConfigData(mockConfigData);
      toast.success(`Successfully retrieved configuration for ID: ${configId}`);
      
      // Trigger results animation after state update
      setTimeout(() => {
        animateResults();
      }, 100);
    } catch (error) {
      toast.error('Failed to fetch configuration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setConfigId('');
    setConfigData(null);
    setErrors({});
  };

  return (
    <Layout>
      <div ref={pageRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 opacity-0">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-violet-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Fetch Configuration
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Retrieve configuration data by entering a valid configuration ID. 
            The system will return a structured data array for your reference.
          </p>
        </div>

        {/* Form Card */}
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
                  placeholder="Enter configuration ID (e.g., qwertyuiop)"
                  disabled={isLoading}
                />
                <Database className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              {errors.configId && (
                <p className="mt-2 text-sm text-red-600">{errors.configId}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                ref={buttonRef}
                type="submit"
                disabled={isLoading}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="flex-1 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Fetching Configuration...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Fetch Configuration
                  </div>
                )}
              </button>
              
              {configData && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results Card */}
        {configData && (
          <div ref={resultsRef} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 opacity-0">
            <div className="flex items-center mb-6">
              <Database className="h-6 w-6 text-violet-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Configuration Data</h2>
              <div className="ml-auto px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Success
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
                      {row.map((item, itemIndex) => (
                        <span
                          key={itemIndex}
                          className="px-3 py-1 bg-violet-100 text-violet-800 rounded-lg text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Configuration ID: <span className="font-medium text-violet-600">{configId}</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FetchConfig;