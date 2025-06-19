// controllers/configurationController.js
import Configuration from '../models/Configuration.js';

// GET /api/configurations/:id
export const getConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🔍 Fetching configuration with configId: ${id}`);
    
    // Find by configId instead of _id to avoid ObjectId casting error
    const configuration = await Configuration.findOne({ configId: id });
    
    if (!configuration) {
      return res.status(404).json({
        message: 'Configuration not found',
        error: `No configuration found with configId: ${id}`
      });
    }
    
    // Return the 2D array as per assignment requirements
    console.log(`✅ Found configuration, returning data:`, configuration.data);
    res.json(configuration.data);
    
  } catch (error) {
    console.error('❌ Error fetching configuration:', error);
    res.status(500).json({
      message: 'Server error while fetching configuration',
      error: error.message
    });
  }
};

// PUT /api/configurations/:id  
export const updateConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    const { remark } = req.body;
    
    console.log(`📝 Updating remark for configId: ${id} with remark: ${remark}`);
    
    // Validate request body
    if (!remark) {
      return res.status(400).json({
        message: 'Remark is required',
        error: 'Request body must contain a remark field'
      });
    }
    
    // Find and update by configId instead of _id to avoid ObjectId casting error
    const configuration = await Configuration.findOneAndUpdate(
      { configId: id },
      { remark: remark },
      { new: true, runValidators: true }
    );
    
    if (!configuration) {
      return res.status(404).json({
        message: 'Configuration not found', 
        error: `No configuration found with configId: ${id}`
      });
    }
    
    console.log(`✅ Successfully updated remark for configId: ${id}`);
    
    // Return success message as per assignment requirements
    res.json({ message: 'success' });
    
  } catch (error) {
    console.error('❌ Error updating configuration:', error);
    res.status(500).json({
      message: 'Server error while updating configuration',
      error: error.message
    });
  }
};