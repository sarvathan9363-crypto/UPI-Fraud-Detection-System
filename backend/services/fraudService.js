import axios from 'axios';

export const checkFraud = async (transactionData) => {
    const response = await axios.post(
        'http://127.0.0.1:5000/predict',
        transactionData
    );

    return response.data;
};