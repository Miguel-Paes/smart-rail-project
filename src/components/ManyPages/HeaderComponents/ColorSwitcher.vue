<script setup>
import { ref } from "vue";

import { useThemeStore } from "@/stores/themeStore";
import { useDisplayStore } from "@/stores/displayStore.js";

const displayStore = useDisplayStore();
const themeStore = useThemeStore();

const colors = ref([
  {
    name: "Verde Lima",
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
</script>

<template>
  <v-dialog
    class="d-flex align-center justify-center dialog_center"
    v-model="themeDialog"
    transition="slide-y-transition"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        class="bg-darken4 rounded-circle border-md"
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
</template>
