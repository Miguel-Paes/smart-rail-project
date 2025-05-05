<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { useThemeStore } from '@/stores/themeStore'

  const router = useRouter()

  const themeStore = useThemeStore()

  const items = [
    {
      title: 'Dashboard',
      value: 'home',
    },
    {
      title: 'Rotas',
      value: 'gestao-de-rotas',
    },
    {
      title: 'Manutenção',
      value: 'monitoramento-e-manutencao',
    },
    {
      title: 'Relatórios',
      value: 'relatorios-e-analises',
    },
    {
      title: 'Notificações',
      value: 'alertas-e-notificacoes',
    },
  ]

  const alterPage = page => {
    router.push({ name: page })
  }

  const drawer = ref(false)
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

    <v-toolbar-title>Smart Rail</v-toolbar-title>

    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon="mdi-magnify" variant="text" />

      <v-btn icon="mdi-filter" variant="text" />
    </template>

    <v-btn :icon="themeStore.isDark ? 'bi bi-moon' : 'bi bi-brightness-high-fill'" variant="text" @click="themeStore.toggleTheme()" />
    <v-btn icon="bi bi-person-circle" variant="text" />

  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" @click="alterPage(item.value)">
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
