import { IChat, IMessage, IUser } from '.'
import { state } from '../store'

export type State = typeof state

export enum MutationTypes {
    SET_CHAT = "SET_CHAT",
    SET_CHATS = "SET_CHATS",
    ADD_CHAT = "ADD_CHAT",
    REMOVE_CHAT = "REMOVE_CHAT",
    APPEND_MESSAGES = "APPEND_MESSAGES",
    OPEN_CHAT = "OPEN_CHAT",
    ADD_MESSAGE = "ADD_MESSAGE",
    EDIT_MESSAGE = "EDIT_MESSAGE",
    DELETE_MESSAGE = "DELETE_MESSAGE",

    LOGOUT = "LOGOUT",
    SET_USER = "SET_USER",
    SET_TOKEN = 'SET_TOKEN'
}

export type Mutations<S = State> = {
    [MutationTypes.SET_CHAT](state: S, chat: IChat | null): void,
    [MutationTypes.SET_CHATS](state: S, chats: IChat[]): void,
    [MutationTypes.ADD_CHAT](state: S, chat: IChat): void,
    [MutationTypes.REMOVE_CHAT](state: S, chatid: string): void,
    [MutationTypes.ADD_MESSAGE](state: S, message: IMessage): void,
    [MutationTypes.EDIT_MESSAGE](state: S, message: IMessage): void,
    [MutationTypes.DELETE_MESSAGE](state: S, payload: IMessage): void,
    [MutationTypes.OPEN_CHAT](state: S, i: number): void,
    [MutationTypes.LOGOUT](state: S, payload: IChat): void,
    [MutationTypes.SET_USER](state: S, user: IUser): void,
    [MutationTypes.SET_TOKEN](state: S, token: string): void,
}