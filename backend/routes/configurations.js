import express from 'express';
const router = express.Router();
import { check } from 'express-validator';
import { getConfigurationById, updateConfigurationRemark } from '../controllers/configurationController.js';

// @route   GET /api/configurations/:id
// @desc    Get configuration by ID
// @access  Public
router.get(
  '/:id',
  [
    check('id', 'Configuration ID is required').not().isEmpty()
  ],
  getConfigurationById
);

// @route   PUT /api/configurations/:id
// @desc    Update configuration remark
// @access  Public
router.put(
  '/:id',
  [
    check('id', 'Configuration ID is required').not().isEmpty(),
    check('remark', 'Remark is required').not().isEmpty()
  ],
  updateConfigurationRemark
);

export default router;