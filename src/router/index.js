import { createRouter, createWebHistory } from "vue-router/auto";
import FullPage from '@/layouts/fullPage.vue'
import BlankPage from '@/layouts/blankPage.vue'

const routes = [
  {
    path: "/",
    component: FullPage,
    children: [
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
    ]
  },
  {
    path: "/",
    component: BlankPage,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/login.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const publicPages = ['Login']; // Páginas que não requerem autenticação

  if (!publicPages.includes(to.name) && !isAuthenticated) {
    next({ name: "Login" });
  } else if (publicPages.includes(to.name) && isAuthenticated) {
    // Se já está autenticado e tenta acessar login, redireciona para home
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;