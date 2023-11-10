import api from "."

export const get_posts = () => api.get('/posts')

export const get_post_by_id = (id: string, sorting: string) => api.get(`/posts/${id}?sort=${sorting}`)

export const create_post = (data: FormData) => api.post('/posts', data)

export const view_post = (id: string) => api.put(`/posts/view/${id}`)