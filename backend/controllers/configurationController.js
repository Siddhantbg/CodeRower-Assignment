// backend/controllers/configurationController.js

import Configuration from '../models/Configuration.js';

// GET /api/configurations/:id
export const getConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🔍 Fetching configuration for ID: ${id}`);
    
    // Try to find existing configuration
    let config = await Configuration.findOne({ configurationId: id });
    
    if (!config) {
      // If not found, create a default configuration with sample 2D array data
      console.log(`📝 Creating new configuration for ID: ${id}`);
      
      const defaultData = [
        ["sym1", "sym2", "sym3"],
        ["sym4", "sym6", "sym8"], 
        ["sym5", "sym1", "sym0"]
      ];
      
      config = new Configuration({
        configurationId: id,
        data: defaultData,
        remark: ""
      });
      
      await config.save();
      console.log(`✅ Created new configuration for ID: ${id}`);
    }
    
    console.log(`📦 Returning data:`, config.data);
    
    // Return the 2D array data as specified in the assignment
    res.status(200).json(config.data);
    
  } catch (error) {
    console.error(`❌ Error fetching configuration:`, error);
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
    
    console.log(`📝 Updating remark for ID: ${id}`);
    console.log(`💬 New remark: ${remark}`);
    
    if (!remark || typeof remark !== 'string') {
      return res.status(400).json({
        message: 'Remark is required and must be a string'
      });
    }
    
    // Try to find existing configuration
    let config = await Configuration.findOne({ configurationId: id });
    
    if (!config) {
      // If not found, create a new one with default data
      console.log(`📝 Creating new configuration for ID: ${id}`);
      
      const defaultData = [
        ["sym1", "sym2", "sym3"],
        ["sym4", "sym6", "sym8"], 
        ["sym5", "sym1", "sym0"]
      ];
      
      config = new Configuration({
        configurationId: id,
        data: defaultData,
        remark: remark.trim()
      });
    } else {
      // Update existing configuration
      config.remark = remark.trim();
      config.updatedAt = new Date();
    }
    
    await config.save();
    
    console.log(`✅ Updated configuration for ID: ${id}`);
    
    // Return success message as specified in assignment
    res.status(200).json({ message: "success" });
    
  } catch (error) {
    console.error(`❌ Error updating configuration:`, error);
    res.status(500).json({ 
      message: 'Server error while updating configuration',
      error: error.message 
    });
  }
};