import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home.vue'),
    },
    {
      path: '/gestao-rotas',
      name: 'gestao-de-rotas',
      component: () => import('@/pages/routes.vue'),
    },
    {
      path: '/monitoramento-e-manutencao',
      name: 'monitoramento-e-manutencao',
      component: () => import('@/pages/maintenance.vue'),
    },
    {
      path: '/relatorios-e-analises',
      name: 'relatorios-e-analises',
      component: () => import('@/pages/analysis.vue'),
    },
    {
      path: '/alertas-e-notificacoes',
      name: 'alertas-e-notificacoes',
      component: () => import('@/pages/alerts.vue'),
    },
  ],
})

export default router
