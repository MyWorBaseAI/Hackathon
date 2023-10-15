import api from ".";
import { IChat, IMessage } from "../interfaces";

export const get_chats = () => api.get(`/chats`)

export const create_chats = (chat: IChat) => api.post(`/chats`, chat)

export const open_chat = (id: string) => api.put(`/chats/${id}`)

export const create_message = (message: IMessage) => api.post(`/chats/message`, message)