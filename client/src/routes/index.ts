import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import History from '../pages/History.vue'
import Create from '../pages/Create.vue'
import Chat from '../pages/Chat.vue'
import Forum from '../pages/Forum.vue'
import Profile from '../pages/Profile.vue'
import Auth from '../pages/Auth.vue'
import Settings from '../pages/Settings.vue'
import Verify from '../pages/Verify.vue'
import store from '../store'

const beforeEnter = (to: string, from: string, next: any) => {
    if(!store.getters.logged) return next('/login')
    // else if(store.getters.user?.registered !== true) next('/register')
    // else if(to.meta.role0)
    else next()
}

const routes: RouteRecordRaw[] = [
    { path: "/login", component: Login },
    { path: "/verify", component: Verify },
    { path: "/register", component: Register, beforeEnter },
    { path: "/", component: History, beforeEnter },
    { path: "/create", component: Create, beforeEnter, meta: { role: 'patient' } },
    { path: "/chats", component: Chat, beforeEnter },
    { path: "/settings", component: Settings, beforeEnter },
    { path: "/forum/:id", component: Forum, beforeEnter },
    { path: "/profile/:id", component: Profile, beforeEnter },
    // { path: '/api/oauth/google', component: Auth }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})