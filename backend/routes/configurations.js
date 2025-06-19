// routes/configurations.js
import express from 'express';
import { getConfiguration, updateConfiguration } from '../controllers/configurationController.js';

const router = express.Router();

// GET /api/configurations/:id - Fetch configuration data
router.get('/:id', getConfiguration);

// PUT /api/configurations/:id - Update configuration remark
router.put('/:id', updateConfiguration);

export default router;