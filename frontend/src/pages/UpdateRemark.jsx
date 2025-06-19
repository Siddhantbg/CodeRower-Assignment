import React, { useState } from 'react';
import { Edit3, Loader2, MessageSquare, Database } from 'lucide-react';
import toast from 'react-hot-toast';

const UpdateRemark = () => {
  const [configId, setConfigId] = useState('');
  const [remark, setRemark] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!configId.trim()) {
      newErrors.configId = 'Configuration ID is required';
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

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Configuration ${configId} has been updated with your remark.`);
      
      // Reset form after successful submission
      setConfigId('');
      setRemark('');
      setErrors({});
    } catch (error) {
      toast.error('Failed to update remark. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setConfigId('');
    setRemark('');
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Edit3 className="h-12 w-12 text-violet-600 mr-3" />
          <h1 className="text-4xl font-bold gradient-purple bg-clip-text text-transparent">
            Update Remark
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Add or update remarks for your configuration entries. 
          Provide detailed information to help track changes and maintain documentation.
        </p>
      </div>

      {/* Form Card */}
      <div className="card-glass rounded-2xl p-8">
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
              <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.configId}</p>
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
                <p className="text-sm text-red-600 animate-fade-in">{errors.remark}</p>
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
              type="submit"
              disabled={isLoading}
              className="flex-1 btn-gradient px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Updating Remark...
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
  );
};

export default UpdateRemark;