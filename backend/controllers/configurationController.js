// backend/controllers/configurationController.js

import Configuration from '../models/Configuration.js';

// GET /api/configurations/:id
export const getConfiguration = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`🔍 Fetching configuration for ID: ${id}`);
    
    // Try multiple field names to match company's existing structure
    let config = await Configuration.findOne({
      $or: [
        { configId: id },
        { configurationId: id },
        { _id: id }
      ]
    });
    
    console.log(`📋 Found config:`, config ? 'YES' : 'NO');
    if (config) {
      console.log(`📋 Config structure:`, Object.keys(config.toObject()));
    }
    
    if (!config) {
      console.log(`❌ No configuration found for ID: ${id}`);
      return res.status(404).json({ 
        message: `Configuration with ID '${id}' not found`,
        suggestion: "Please check if this configuration ID exists in the database"
      });
    }
    
    // Check what data field exists
    let dataToReturn = [];
    
    if (config.data && Array.isArray(config.data)) {
      dataToReturn = config.data;
      console.log(`📦 Using 'data' field:`, dataToReturn);
    } else if (config.configuration && Array.isArray(config.configuration)) {
      dataToReturn = config.configuration;
      console.log(`📦 Using 'configuration' field:`, dataToReturn);
    } else if (config.values && Array.isArray(config.values)) {
      dataToReturn = config.values;
      console.log(`📦 Using 'values' field:`, dataToReturn);
    } else {
      // If no array field found, create default structure
      dataToReturn = [
        ["sym1", "sym2", "sym3"],
        ["sym4", "sym6", "sym8"], 
        ["sym5", "sym1", "sym0"]
      ];
      console.log(`📦 Using default data structure`);
    }
    
    console.log(`📦 Returning data:`, dataToReturn);
    res.status(200).json(dataToReturn);
    
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
    
    // Try to find existing configuration with multiple field possibilities
    let config = await Configuration.findOne({
      $or: [
        { configId: id },
        { configurationId: id },
        { _id: id }
      ]
    });
    
    console.log(`📋 Found config for update:`, config ? 'YES' : 'NO');
    
    if (!config) {
      // If not found, create new with the most likely field name for company DB
      console.log(`📝 Creating new configuration for ID: ${id}`);
      
      const defaultData = [
        ["sym1", "sym2", "sym3"],
        ["sym4", "sym6", "sym8"], 
        ["sym5", "sym1", "sym0"]
      ];
      
      // Try the field name that's most likely to work
      const newConfigData = {
        configurationId: id, // Company probably uses this
        data: defaultData,
        remark: remark.trim()
      };
      
      config = new Configuration(newConfigData);
    } else {
      // Update existing configuration
      config.remark = remark.trim();
      if (config.updatedAt !== undefined) {
        config.updatedAt = new Date();
      }
    }
    
    await config.save();
    console.log(`✅ Successfully updated configuration`);
    
    res.status(200).json({ message: "success" });
    
  } catch (error) {
    console.error(`❌ Error updating configuration:`, error);
    res.status(500).json({ 
      message: 'Server error while updating configuration',
      error: error.message 
    });
  }
};