<script setup>
  import { useDisplayStore } from '@/stores/displayStore.js';
  import { useUserStore } from '@/stores/userStore';
  import { useStationStore } from '@/stores/stationStore';

  const userStore = useUserStore()
  const displayStore = useDisplayStore()
  const stationStore = useStationStore()

</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <h2 class="mb-3 font-weight-regular" :class="displayStore.xs ? 'text-h6' : displayStore.sm ? 'text-h5' : 'text-h4'">Gestão de Rotas</h2>

    <v-row>
      <v-col cols="12" md="4" sm=6>
        <v-select
          item-title="name"
          item-value="id"
          :items="stationStore.stations"
          variant="underlined"
          label="Selecione a Estação"
          v-model="stationStore.currentStation"
          @update:model-value="stationStore.getStationLines"
        />
      </v-col>

        <v-col cols="12" md="4" sm="6">
          <v-select
            item-title="name"
            :items="stationStore.stationLines"
            v-if="stationStore.currentStation != null"
            variant="underlined"
            label="Selecione a Linha"
            @update:model-value="stationStore.getSelectedLine"
          />
        </v-col>

    </v-row>
  </v-main>
</template>
