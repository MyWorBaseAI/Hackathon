import api from ".";
import { IComment } from "../interfaces";

export const get_comments = (id: string) => api.get(`/comments/${id}`)

export const like_comment = (id: string) => api.put(`/comments/like/${id}`)

export const dislike_comment = (id: string) => api.put(`/comments/dislike/${id}`)

export const add_comment = (message: IComment) => api.post(`/comments`, message)