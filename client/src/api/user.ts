import api from ".";

export const edit_user = (data: any) => api.put('/users/edit', data)

export const get_user = (id: string) => api.get(`/users/${id}`)