import axios from 'axios';
export const api = axios.create({ baseURL: 'http://localhost:5000/api' });
export const parseResumes = (formData) => api.post('/parse', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const matchJobs = (jobDescription) => api.post('/match', { jobDescription });
export const getCandidates = () => api.get('/candidates');
