<script setup>
import TitleSection from "@/components/template/TitleSection.vue";
import LineOptions from "@/components/RoutesPage/LineOptions.vue";
import StationOptions from "@/components/RoutesPage/StationOptions.vue";
import ItineraryOptions from "@/components/RoutesPage/ItineraryOptions.vue";

import { useDisplayStore } from "@/stores/displayStore";
import { useThemeStore } from "@/stores/themeStore";
import SensorOptions from "@/components/RoutesPage/SensorOptions.vue";

const displayStore = useDisplayStore();
const themeStore = useThemeStore();

const firstTabs = ref("line");
const secondTabs = ref("station");
</script>

<template>
  <v-main
    class="pa-0 pt-5"
    :class="
      displayStore.xs
        ? 'px-3 py-1'
        : displayStore.sm
        ? 'px-5 py-2'
        : 'px-7 py-3'
    "
  >
    <title-section title="Gestão de Rotas e Itinerários" />

    <v-card class="mb-7">
      <v-tabs
        v-model="firstTabs"
        :bg-color="themeStore.isDark ? 'darken1' : 'lighten1'"
      >
        <v-tab value="line">Editar Linha</v-tab>
        <v-tab value="itinerary">Editar Itinerário</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="firstTabs">
          <v-tabs-window-item value="line">
            <title-section subtitle="Definir Linha para Editar" />
            <LineOptions />
          </v-tabs-window-item>

          <v-tabs-window-item value="itinerary">
            <title-section subtitle="Definir Itinerário para Editar" />
            <ItineraryOptions />
          </v-tabs-window-item> </v-tabs-window></v-card-text
    ></v-card>

    <title-section title="Gestão de Estações e Sensores" />

    <v-card>
      <v-tabs
        v-model="secondTabs"
        :bg-color="themeStore.isDark ? 'darken1' : 'lighten1'"
      >
        <v-tab value="station">Editar Estação</v-tab>
        <v-tab value="sensors">Editar Sensores</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="secondTabs">
          <v-tabs-window-item value="station">
            <title-section subtitle="Definir Linha para Editar" />
            <StationOptions />
          </v-tabs-window-item>

          <v-tabs-window-item value="sensors">
            <title-section subtitle="Definir Sensor para Editar" />
            <SensorOptions />
          </v-tabs-window-item> </v-tabs-window></v-card-text
    ></v-card>
  </v-main>
</template>
