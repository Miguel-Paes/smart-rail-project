<script setup>
  import { useDisplayStore } from '@/stores/displayStore';
  import { useTrainStore } from '@/stores/trainsStore';
  import TrainsList from '@/components/Manutention/TrainsList.vue';

  const displayStore = useDisplayStore()
  const trainStore = useTrainStore();

  const operatingTrains = trainStore.operatingTrains
  console.log(operatingTrains.value)
  const inoperativeTrains = trainStore.inoperativeTrains
  const inMaintenanceTrains = trainStore.inMaintenanceTrains
</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <TitleSection title="Monitoramento e Manutenção" />

      <v-card class="pa-3 d-flex ga-3">
        <v-row>
          <v-col cols="12" xs="6" sm="4">
        <v-card class="pa-3">
          <TrainsList
          items="operatingTrains"
          title="Trens Operando"
        />
        </v-card>
          </v-col>

          <v-col cols="12" xs="6" sm="4">
        <v-card class="pa-3"></v-card>
          </v-col>

          <v-col cols="12" xs="6" sm="4">
        <v-card class="pa-3"></v-card>
          </v-col>
        </v-row>
      </v-card>
  </v-main>
</template>
