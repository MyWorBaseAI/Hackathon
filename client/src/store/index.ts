import { createStore, GetterTree, MutationTree } from 'vuex'
import { Mutations, MutationTypes, State } from '../interfaces/store-types'
import { IChat, IUser } from '../interfaces'
import cookies from 'js-cookie'

export const state: {
  chat: IChat | null,
  chats: IChat[],
  user: IUser,
  token: string,
} = {
  chat: null,
  chats: [],
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  token: cookies.get('token') || '',
}

export const getters: GetterTree<State, State> = {
  chat: (state: State) => state.chat,
  chats: (state: State) => state.chats,
  current_chat: (state: State) => state.chat ? state.chats.find(c => c._id === state.chat?._id) : {},

  user: (state: State) => state.user,
  token: (state: State) => state.token,
  logged: (state: State) => !!state.token,
  role: (state: State) => state.user.role,
  userid: (state: State) => state.user._id,
}

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_CHAT](state, chat) {
    if(chat!==null) state.chat = chat
    else state.chat = null
  },
  [MutationTypes.SET_CHATS](state, chats): void {
    state.chats = chats
  },
  [MutationTypes.OPEN_CHAT](state, index): void {
    state.chats[index].open = true
  },
  [MutationTypes.ADD_CHAT](state, chat): void {
    state.chats.unshift(chat)
  },
  [MutationTypes.REMOVE_CHAT](state, chatid): void {
    const index = state.chats.findIndex(c => c._id === chatid)
    state.chats.splice(index, 1)
  },
  [MutationTypes.ADD_MESSAGE](state, message): void {
    const index = state.chats.findIndex(c => c._id === message.chat)
    state.chats[index].messages?.push(message)
    state.chats[index].last_message = message
    const temp = {...state.chats[index]}
    state.chats.splice(index, 1)
    state.chats.unshift(temp)
  },
  [MutationTypes.EDIT_MESSAGE](state, message): void {
    const index = state.chats.findIndex(c => c._id === message.chat)
    const messageIndex = state.chats[index].messages?.findIndex(m => m._id === message._id)
    // Object.assign(state.chats[index].messages.[messageIndex], message)

    // if(state.chats[index]?.messages[0]_.id === message.id) state.chats[index].messages[0].text = message.text
  },
  [MutationTypes.DELETE_MESSAGE](state, payload): void {
    // const index = state.chats.findIndex(c => c.id === chat_id)
    // if(!state.chats[index]?.chatmessages) return
    // let lenght = state.chats[index].chatmessages.length - messages.length
    // state.chats[index].chatmessages = state.chats[index].chatmessages.filter(message => !messages.includes(message.id))
    // state.chats[index].messages = [state.chats[index].chatmessages[lenght-1]]
  },
  [MutationTypes.LOGOUT](state): void {
    state.token = ''
    state.user = {} as any
    localStorage.removeItem('user')
    cookies.remove('token')
    window.location.href = '/login'
  },
  [MutationTypes.SET_USER](state, user): void {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user));
  },
  [MutationTypes.SET_TOKEN](state, token): void {
    state.token = token
    const expires = new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
    cookies.set('token', token, { expires })
  },
}

export default new createStore({
  state,
  getters,
  mutations
})