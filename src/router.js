import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

    {
        path: '/',
        name: 'home',
        component: () => import('./pages/MainPage'),
    },
    {
        path: '/episode/:id',
        name: 'episode',
        component: () => import('./pages/EpisodePage.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
