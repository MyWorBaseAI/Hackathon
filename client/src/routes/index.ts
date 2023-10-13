import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../pages/Login.vue'
import Confermation from '../pages/Confermation.vue'
import Register from '../pages/Register.vue'
import Index from '../pages/Index.vue'

const routes: RouteRecordRaw[] = [
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/verify", component: Confermation },
    { path: "/", component: Index },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})