import { checkFraud } from '../services/fraudService.js';

export const predictTransaction = async (req, res) => {
    try {
        const result = await checkFraud(req.body);

        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: 'Prediction failed'
        });
    }
};