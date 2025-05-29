<script setup>
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'

  import { useThemeStore } from '@/stores/themeStore'
  import { useTheme } from 'vuetify'

  const router = useRouter()

  const themeStore = useThemeStore()
  const theme = useTheme()


  const colors = ref([
    {
      name: 'Vermelho',
      value: 'red',
    },
    {
      name: 'Amarelo',
      value:'yellow',
    },
    {
      name: 'Verde',
      value:'green',
    },
    {
      name: 'Azul',
      value:'blue',
    },
    {
      name: 'Roxo',
      value:'purple',
    },
    {
      name: 'Rosa',
      value:'pink',
    },
    {
      name: 'Laranja',
      value:'orange',
    },
    {
      name: 'Turquesa',
      value:'cyan',
    },
    {
      name: 'Marrom',
      value:'brown',
    },
  ])

  watch(() => themeStore.themeColor, newColor => {
    const isDark = themeStore.isDark
    theme.global.name.value = `${newColor}${isDark ? 'Dark' : 'Light'}`
  }, { immediate: true })

  watch(
    () => themeStore.currentTheme,
    newTheme => {
      theme.global.name.value = newTheme
    },
    { immediate: true }
  )

  const themeDialog = ref(false)

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

    <v-dialog
      v-model="themeDialog"
      fullscreen="true"
      transition="slide-y-transition"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          class=" rounded-circle border-md"
          color="accent3"
          icon="bi bi-circle-half"
          v-bind="activatorProps"
        />
      </template>

      <v-card class="pa-7">
        <v-card-title>MUDAR COR DO TEMA</v-card-title>
        <v-divider color="accent-3 mb-5" />
        <v-row class="d-flex">
          <v-col cols="12" md="4" sm="6">
            <v-select
              v-model="themeStore.themeColor"
              item-title="name"
              item-value="value"
              :items="colors"
              label="Cor do tema:"
            />
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-switch
              v-model="themeStore.isDark"
              :label="themeStore.isDark ? 'Tema Escuro' : 'Tema Claro'"
              @click="themeStore.toggleTheme()"
            />
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-btn
              class="w-100"
              color="base"
              text="exemplo"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
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
