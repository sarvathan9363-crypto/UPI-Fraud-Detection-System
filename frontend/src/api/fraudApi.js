import axios from 'axios';

export const signupUser = async (data) => {
  const response = await axios.post(
    'http://localhost:5001/api/auth/signup',
    data
  );
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(
    'http://localhost:5001/api/auth/login',
    data
  );
  return response.data;
};

export const checkFraud = async (data) => {
  const response = await axios.post(
    'http://localhost:5001/api/transactions/predict',
    data
  );
  return response.data;
};