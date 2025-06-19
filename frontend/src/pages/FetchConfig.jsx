import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { VALIDATION, TOAST_MESSAGES } from '../utils/constants';
import Loader from '../components/Loader';

const FetchConfig = () => {
  const [loading, setLoading] = useState(false);
  const [configData, setConfigData] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      // Simulate API call (will be implemented in Sprint 5)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Placeholder data for now
      setConfigData({
        configurationId: data.configId,
        data: [
          ['Row 1, Col 1', 'Row 1, Col 2'],
          ['Row 2, Col 1', 'Row 2, Col 2'],
          ['Row 3, Col 1', 'Row 3, Col 2']
        ]
      });
      
      toast.success(TOAST_MESSAGES.FETCH_SUCCESS);
    } catch (error) {
      toast.error(TOAST_MESSAGES.FETCH_ERROR);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card mb-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Fetch Configuration</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="configId" className="block text-sm font-medium text-gray-700 mb-1">
              Configuration ID
            </label>
            <input
              id="configId"
              type="text"
              className="form-input"
              placeholder="Enter configuration ID"
              {...register('configId', { required: VALIDATION.CONFIG_ID_REQUIRED })}
            />
            {errors.configId && (
              <p className="mt-1 text-sm text-red-600">{errors.configId.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Fetch Configuration'}
          </button>
        </form>
      </div>
      
      {loading ? (
        <Loader />
      ) : configData ? (
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-4">
            Configuration: {configData.configurationId}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gradient-main text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Column 1</th>
                  <th className="py-3 px-4 text-left">Column 2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {configData.data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-3 px-4">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FetchConfig;