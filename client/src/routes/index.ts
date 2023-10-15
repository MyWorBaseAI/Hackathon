import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import History from '../pages/History.vue'
import Create from '../pages/Create.vue'
import Chat from '../pages/Chat.vue'
import Forum from '../pages/Forum.vue'
import Profile from '../pages/Profile.vue'
import Auth from '../pages/Auth.vue'
import store from '../store'

const beforeEnter = (_: strinrg, __: string, next: any) => {
    // if(!store.getters.logged) return next('/login')
    next()
}

const routes: RouteRecordRaw[] = [
    { path: "/login", component: Login },
    { path: "/register", component: Register, beforeEnter },
    { path: "/", component: History, beforeEnter },
    { path: "/create", component: Create, beforeEnter },
    { path: "/chats", component: Chat, beforeEnter },
    { path: "/forum/:id", component: Forum, beforeEnter },
    { path: "/profile/:id", component: Profile, beforeEnter },
    { path: '/api/oauth/google', component: Auth }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})