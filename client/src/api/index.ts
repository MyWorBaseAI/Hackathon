import axios from "axios"
import store from '../store'

const api = axios.create({ baseURL: 'http://localhost:4000' })

export function checkToken(){
  const token = store.getters.token
  if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

checkToken()

export default api