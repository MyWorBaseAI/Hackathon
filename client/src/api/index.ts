import axios from "axios"
import store from '../store'

export const uri = 'http://localhost:4000'

const api = axios.create({ baseURL: uri })

// api.interceptors.request.use(
//   (config) => {
//     checkToken();
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     if (error.response && error.response.status === 401) {
//       store.commit("LOGOUT");
//     }
//     return Promise.reject(error);
//   }
// );

export function checkToken(){
  const token = store.getters.token
  if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

checkToken()

export default api