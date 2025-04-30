import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/home.vue'),
    },

    {
      path: '/gestaorotas',
      name: 'gestao-de-rotas',
      component: () => import('../pages/routes.vue'),
    },

    {
      path: '/monitoramentoemanutenção',
      name: 'monitoramento-e-manutencao',
      component: () => import('../pages/manutention.vue'),
    },

    {
      path: '/relotorioseanalises',
      name: 'relatorios-e-analises',
      component: () => import('../pages/analysis.vue'),
    },

    {
      path: '/alertasenotificacoes',
      name: 'alertas-e-notificacoes',
      component: () => import('../pages/alerts.vue'),
    },
  ],
})

export default router
