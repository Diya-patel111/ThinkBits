
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const uploadResumes = (formData) => api.post('/parse', formData);
export const matchJobs = (data) => api.post('/match', data);
export const getCandidates = () => api.get('/candidates');
  