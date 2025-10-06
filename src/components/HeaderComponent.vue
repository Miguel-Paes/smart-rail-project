<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";

import { useThemeStore } from "@/stores/themeStore";
import { useDisplayStore } from "@/stores/displayStore.js";

const displayStore = useDisplayStore();
const themeStore = useThemeStore();
const theme = useTheme();
const router = useRouter();

const colors = ref([
  {
    name: "Lima",
    value: "lime",
  },
  {
    name: "Vermelho",
    value: "red",
  },
  {
    name: "Amarelo",
    value: "yellow",
  },
  {
    name: "Verde",
    value: "green",
  },
  {
    name: "Azul",
    value: "blue",
  },
  {
    name: "Roxo",
    value: "purple",
  },
  {
    name: "Rosa",
    value: "pink",
  },
  {
    name: "Laranja",
    value: "orange",
  },
  {
    name: "Turquesa",
    value: "cyan",
  },
  {
    name: "Marrom",
    value: "brown",
  },
]);

const gifMap = ref({
  red: "/images/red.gif",
  yellow: "/images/yellow.gif",
  brown: "/images/brown.gif",
  blue: "/images/blue.gif",
  green: "/images/green.gif",
  purple: "/images/purple.gif",
  pink: "/images/pink.gif",
  cyan: "/images/cyan.gif",
  orange: "/images/orange.gif",
});

watch(
  () => themeStore.themeColor,
  (newColor) => {
    const isDark = themeStore.isDark;
    theme.global.name.value = `${newColor}${isDark ? "Dark" : "Light"}`;
  },
  { immediate: true }
);

watch(
  () => themeStore.currentTheme,
  (newTheme) => {
    theme.global.name.value = newTheme;
  },
  { immediate: true }
);

const currentGif = computed(() => {
  const color = themeStore.themeColor?.toLowerCase();
  console.log(color);
  return validThemes.includes(color) ? gifMap[color] : `/images/${color}.gif`; // caso você tenha um fallback
});

const themeDialog = ref(false);

const items = [
  {
    title: "Dashboard",
    value: "home",
  },
  {
    title: "Rotas",
    value: "gestao-de-rotas",
  },
  {
    title: "Manutenção",
    value: "monitoramento-e-manutencao",
  },
  {
    title: "Relatórios",
    value: "relatorios-e-analises",
  },
  {
    title: "Notificações",
    value: "alertas-e-notificacoes",
  },
];

const alterPage = (page) => {
  router.push({ name: page });
};

const drawer = ref(false);
const validThemes = Object.keys(gifMap);
</script>

<template>
  <v-app-bar color="darken4">
    <v-img
      src="/images/background_img.png"
      max-height="50"
      max-width="50"
      class="ml-2"
      @click.stop="drawer = !drawer"
    />

    <v-toolbar-title>Smart Rail</v-toolbar-title>

    <v-dialog
      class="d-flex align-center justify-center dialog_center"
      v-model="themeDialog"
      transition="slide-y-transition"
    >
      <template #activator="{ props: activatorProps }">
        <v-btn
          class="bg-lighten5 rounded-circle border-md"
          color="accent3"
          icon="bi bi-circle-half"
          v-bind="activatorProps"
        />
      </template>

      <v-card class="pa-10" width="500" min-height="300">
        <v-row class="d-flex align-center justify-space-between mb-4">
          <v-card-title>MUDAR COR DO TEMA</v-card-title>
          <v-btn
            class="text-h6 align-center justify-center d-flex"
            color="base"
            icon="mdi-window-close"
            @click="themeDialog = false"
          />
        </v-row>
        <v-divider color="accent-3 mb-5" />
        <v-row class="d-flex space-between">
          <v-col class="pa-0 h-0 mb-2" cols="12" md="4" sm="6">
            <v-select
              v-model="themeStore.themeColor"
              item-title="name"
              item-value="value"
              :items="colors"
              label="Cor do tema:"
            />
          </v-col>
          <v-col
            class="pa-0 h-0 mb-2"
            :class="displayStore.mdAndUp ? 'switch_lateral' : ''"
            cols="12"
            md="4"
            sm="6"
          >
            <v-switch
              v-model="themeStore.isDark"
              color="lighten1"
              :label="themeStore.isDark ? 'Tema Escuro' : 'Tema Claro'"
              @click="themeStore.toggleTheme()"
            />
          </v-col>
          <v-col class="h-0 mb-2 d-flex justify-end" cols="12" md="4" sm="6">
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-btn
      :icon="themeStore.isDark ? 'bi bi-moon' : 'bi bi-brightness-high-fill'"
      variant="text"
      @click="themeStore.toggleTheme()"
    />
    <v-btn icon="bi bi-person-circle" variant="text" />
  </v-app-bar>

  <v-navigation-drawer v-if="!displayStore.xs" v-model="drawer" temporary>
    <v-img :src="currentGif" />
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        @click="alterPage(item.value)"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-if="displayStore.xs"
    v-model="drawer"
    location="top"
    temporary
  >
    <v-img :src="currentGif" @error="handleImageError">
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="alterPage(item.value)"
        >
          {{ item.title }}
        </v-list-item>
      </v-list>
    </v-img>
  </v-navigation-drawer>
</template>

<style scoped>
.switch_lateral {
  position: relative;
  left: 25%;
}

.dialog_center {
  position: center;
  left: 35%;
}
</style>
