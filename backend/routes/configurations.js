// routes/configurations.js
import express from 'express';
import { getConfiguration, updateConfiguration } from '../controllers/configurationController.js';

const router = express.Router();

router.get('/:id', getConfiguration);

router.put('/:id', updateConfiguration);

export default router;