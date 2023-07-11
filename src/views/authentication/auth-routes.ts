import {RouteConfig} from 'vue-router';

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'signup',
        component: () => import('./signup.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./login.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import('./forgot-password.vue')
    }
]

export default routes;