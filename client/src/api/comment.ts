import api from ".";
import { IComment } from "../interfaces";

export const get_comments = (id: string) => api.get(`/comments/${id}`)

export const add_comment = (message: IComment) => api.post(`/comments`, message)