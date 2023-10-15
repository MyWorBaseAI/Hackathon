import api from "."

export const get_posts = () => api.get('/posts')

export const get_post_by_id = (id: string) => api.get(`/posts/${id}`)

export const create_post = (data: FormData) => api.post('/posts', data)