import Configuration from '../models/Configuration.js';

// GET /api/configurations/:id
export const getConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    
    const configuration = await Configuration.findOne({ configId: id });
    
    if (!configuration) {
      return res.status(404).json({
        message: 'Configuration not found',
        error: `No configuration found with configId: ${id}`
      });
    }
    
    res.json(configuration.data);
    
  } catch (error) {
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
    
    // Validate request body
    if (!remark) {
      return res.status(400).json({
        message: 'Remark is required',
        error: 'Request body must contain a remark field'
      });
    }
    
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
    
    res.json({ message: 'success' });
    
  } catch (error) {
    res.status(500).json({
      message: 'Server error while updating configuration',
      error: error.message
    });
  }
};