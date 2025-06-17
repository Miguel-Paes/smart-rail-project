<script setup>
  import { useDisplayStore } from '@/stores/displayStore.js';
  import { useUserStore } from '@/stores/userStore';
  import { useStationStore } from '@/stores/stationStore';

  const userStore = useUserStore()
  const displayStore = useDisplayStore()
  const stationStore = useStationStore()

  const justification = ref('')

</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <h2 class="mb-3 font-weight-regular" :class="displayStore.xs ? 'text-h6' : displayStore.sm ? 'text-h5' : 'text-h4'">Gestão de Rotas</h2>

    <v-row>
      <v-card-title>
        Definir Linha para Editar
      </v-card-title>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="6">
        <v-select
          v-model="stationStore.stationId"
          item-title="name"
          item-value="id"
          :items="stationStore.stations"
          label="Selecione a Estação"
          variant="underlined"
        />
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-select
          v-if="stationStore.stationId != null"
          item-title="name"
          item-value="id"
          :items="stationStore.stationLines"
          label="Selecione a Linha"
          variant="underlined"
          @update:model-value="stationStore.selectStationInRoutes"
        />
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-select
          v-if="stationStore.selectedLine != null"
          item-title="name"
          item-value="name"
          :items="userStore.employee"
          label="Selecione o Maquinista"
          variant="underlined"
          @update:model-value="stationStore.getSelectedLineDriver"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-card-title>
        Bloquear Rota
      </v-card-title>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" sm="6">
        <v-text-field
          v-model="justification"
          label="Justificativa de Bloqueio"
        />

        <v-btn>Bloquear</v-btn>
      </v-col>
    </v-row>
  </v-main>
</template>
