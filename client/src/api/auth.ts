import api from ".";

export const login = (data: any) => api.post('/auth/login', data)

export const verify = (data: any) => api.post(`/auth/verify`, data)