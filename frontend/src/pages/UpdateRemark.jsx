import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { VALIDATION, TOAST_MESSAGES } from '../utils/constants';
import Loader from '../components/Loader';

const UpdateRemark = () => {
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    setLoading(true);
    setUpdateSuccess(false);
    
    try {
      // Simulate API call (will be implemented in Sprint 5)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Placeholder success response
      setUpdateSuccess(true);
      toast.success(TOAST_MESSAGES.UPDATE_SUCCESS);
      reset(); // Clear form after successful update
    } catch (error) {
      toast.error(TOAST_MESSAGES.UPDATE_ERROR);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-primary mb-6">Update Configuration Remark</h2>
        
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
          
          <div>
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
              Remark
            </label>
            <textarea
              id="remark"
              rows="4"
              className="form-input"
              placeholder="Enter new remark"
              {...register('remark', { required: VALIDATION.REMARK_REQUIRED })}
            />
            {errors.remark && (
              <p className="mt-1 text-sm text-red-600">{errors.remark.message}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Remark'}
          </button>
        </form>
        
        {loading && <Loader />}
        
        {updateSuccess && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              Remark updated successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateRemark;