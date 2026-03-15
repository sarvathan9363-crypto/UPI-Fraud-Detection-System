import express from 'express';
import { predictTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/predict', predictTransaction);

export default router;