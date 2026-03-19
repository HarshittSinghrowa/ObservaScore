import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

API.interceptors.response.use(
  res => res,
  err => {
    const message = err.response?.data?.error || err.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const calculateScore = (data) => API.post('/score/calculate', data);
export const getScore = (id) => API.get(`/score/${id}`);
export const deleteScore = (id) => API.delete(`/score/${id}`);
export const getHistory = (params) => API.get('/history', { params });
export const getStats = () => API.get('/history/stats/summary');
export const getHealth = () => API.get('/health');

export default API;
