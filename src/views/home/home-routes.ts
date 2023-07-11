import {RouteConfig} from 'vue-router';

const routes: Array<RouteConfig> = [
    {
        path: '/home',
        name: 'home',
        component: () => import('./index.vue')
    },
]

export default routes;