import Configuration from '../models/Configuration.js';
import { validationResult } from 'express-validator';

/**
 * @desc    Get configuration by ID
 * @route   GET /api/configurations/:id
 * @access  Public
 */
const getConfigurationById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const configuration = await Configuration.findOne({ configurationId: req.params.id });

    if (!configuration) {
      res.status(404);
      throw new Error('Configuration not found');
    }

    res.json(configuration.data);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

/**
 * @desc    Update configuration remark
 * @route   PUT /api/configurations/:id
 * @access  Public
 */
const updateConfigurationRemark = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { remark } = req.body;

    const configuration = await Configuration.findOne({ configurationId: req.params.id });

    if (!configuration) {
      res.status(404);
      throw new Error('Configuration not found');
    }

    configuration.remark = remark;
    await configuration.save();

    res.json({ message: 'success' });
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({ message: error.message });
  }
};

export { getConfigurationById, updateConfigurationRemark };