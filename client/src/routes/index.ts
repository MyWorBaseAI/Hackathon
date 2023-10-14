import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login.vue'
import Confermation from '../pages/Confermation.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import History from '../pages/History.vue'
import Create from '../pages/Create.vue'
import Chat from '../pages/Chat.vue'

const routes: RouteRecordRaw[] = [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/verify", component: Confermation },
    { path: "/", component: Dashboard },
    { path: "/history", component: History },
    { path: "/create", component: Create },
    { path: "/chats", component: Chat },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})