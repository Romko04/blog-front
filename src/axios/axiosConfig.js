import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // ваш базовий URL
});

export const getPostsApi = (sortBy) => instance.get(`/posts?sortby=${sortBy}`);
export const registerApi = (data) => instance.post(`/auth/register`,data);
export const loginApi = (data) => instance.post(`/auth/login`,data);
export const authMeApi = (token) => instance.get(`/auth/me`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});



