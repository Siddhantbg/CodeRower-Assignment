import React, { useState, useEffect } from 'react';
import { Edit3, Loader2, MessageSquare, Database, AlertCircle, Wifi, WifiOff, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import { usePageAnimation, useButtonHover, useInputFocus } from '../hooks/useGSAP';
import { updateConfiguration, checkBackendHealth } from '../services/api';

const UpdateRemark = () => {
  const [configId, setConfigId] = useState('');
  const [remark, setRemark] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendStatus, setBackendStatus] = useState(null);
  const [lastSuccess, setLastSuccess] = useState(null);

  const pageRef = usePageAnimation();
  const { buttonRef, handleMouseEnter, handleMouseLeave } = useButtonHover();
  const { handleFocus, handleBlur } = useInputFocus();

  // Check backend health on component mount
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
    } else if (configId.trim().length < 3) {
      newErrors.configId = 'Configuration ID must be at least 3 characters';
    }
    
    if (!remark.trim()) {
      newErrors.remark = 'Remark is required';
    } else if (remark.trim().length < 10) {
      newErrors.remark = 'Remark must be at least 10 characters long';
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
    
    try {
      const response = await updateConfiguration(configId.trim(), remark.trim());
      
      // Check if response indicates success
      if (response && (response.message === 'success' || response.success)) {
        toast.success(`Configuration ${configId} has been updated successfully!`);
        
        // Store success info
        setLastSuccess({
          configId: configId.trim(),
          remark: remark.trim(),
          timestamp: new Date().toLocaleString()
        });
        
        // Reset form after successful submission
        setConfigId('');
        setRemark('');
        setErrors({});
      } else {
        throw new Error('Unexpected response format from server');
      }
      
    } catch (error) {
      toast.error(error.message || 'Failed to update remark');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setConfigId('');
    setRemark('');
    setErrors({});
    setLastSuccess(null);
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

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Edit3 className="h-12 w-12 text-violet-600 mr-3" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              Update Remark
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Add or update remarks for your configuration entries in the MongoDB database. 
            Provide detailed information to help track changes and maintain documentation.
          </p>
        </div>

        {/* Success Message */}
        {lastSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-green-800">Last Update Successful!</h3>
            </div>
            <div className="text-sm text-green-700">
              <p><strong>Configuration ID:</strong> {lastSuccess.configId}</p>
              <p><strong>Remark:</strong> {lastSuccess.remark}</p>
              <p><strong>Updated:</strong> {lastSuccess.timestamp}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Configuration ID Field */}
            <div>
              <label htmlFor="configId" className="block text-sm font-semibold text-gray-700 mb-2">
                Configuration ID <span className="text-red-500">*</span>
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
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.configId}
                </p>
              )}
            </div>

            {/* Remark Field */}
            <div>
              <label htmlFor="remark" className="block text-sm font-semibold text-gray-700 mb-2">
                Remark <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  rows={6}
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-500/20 resize-none ${
                    errors.remark 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-violet-500'
                  }`}
                  placeholder="Enter your remark here... (minimum 10 characters)

Example:
- Updated configuration parameters for production environment
- Fixed issue with authentication settings
- Added new security protocols"
                  disabled={isLoading}
                />
                <MessageSquare className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex justify-between items-center mt-2">
                {errors.remark ? (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.remark}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Minimum 10 characters required
                  </p>
                )}
                <span className={`text-sm ${remark.length >= 10 ? 'text-green-600' : 'text-gray-400'}`}>
                  {remark.length}/10+
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                    Updating Database...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Edit3 className="h-5 w-5 mr-2" />
                    Update Remark
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={isLoading}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Form
              </button>
            </div>
          </form>

          {/* Form Guidelines */}
          <div className="mt-8 p-4 bg-violet-50 rounded-xl border border-violet-100">
            <h3 className="font-semibold text-violet-800 mb-2 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Remark Guidelines
            </h3>
            <ul className="text-sm text-violet-700 space-y-1">
              <li>• Be specific about what changes were made</li>
              <li>• Include relevant dates or version numbers if applicable</li>
              <li>• Mention any potential impacts or dependencies</li>
              <li>• Use clear, professional language for better documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateRemark;