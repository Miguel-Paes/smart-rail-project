<script setup>
  import TitleSection from '@/components/template/TitleSection.vue';
  import LineOptions from '@/components/template/RoutesPage/LineOptions.vue';
  import StationOptions from '@/components/template/RoutesPage/StationOptions.vue';
  import { useDisplayStore } from '@/stores/displayStore';

  const displayStore = useDisplayStore()

  const tabs = ref(null)

</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <title-section title="Gestão de Rotas e Estações" />

    <v-card>
      <v-tabs
        v-model="tabs"
        bg-color="lighten1"
      >
        <v-tab value="line">Editar Linha</v-tab>
        <v-tab value="station">Editar Estação</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tabs">
          <v-tabs-window-item value="line">
            <title-section subtitle="Definir Linha para Editar" />

            <LineOptions />
          </v-tabs-window-item>

          <v-tabs-window-item value="station">
            <title-section subtitle="Definir Estação para Editar" />

            <StationOptions />
          </v-tabs-window-item>
        </v-tabs-window></v-card-text></v-card>

  </v-main>
</template>
