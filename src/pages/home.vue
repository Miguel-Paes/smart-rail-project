  <script setup>
  import { ref } from 'vue';

  import { useStationStore } from '@/stores/stationStore.js'
  import { useDisplayStore } from '@/stores/displayStore.js'
  import { useWarningStore } from '@/stores/warningsStore';
  import FindStationDialog from '@/components/home/FindStationDialog.vue';

  const stationStore = useStationStore()
  const displayStore = useDisplayStore()
  const warningStore = useWarningStore()
  const warnings = ref(warningStore.warnings)
  </script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <h2 class="mb-3 font-weight-regular" :class="displayStore.xs ? 'text-h6' : displayStore.sm ? 'text-h5' : 'text-h4'">Dashboard Geral</h2>

    <v-row class="d-flex">
      <v-col class="d-flex flex-column justify-center" cols="12" md="6">
        <v-row class="d-flex" :class="displayStore.xs ? '' : displayStore.sm ? '' : 'ga-3'" dense>
          <v-col class="d-flex align-center pa-0" cols="12" sm="6">
            <v-select
              v-model="stationStore.stationId"
              item-title="name"
              item-value="id"
              :items="stationStore.stations"
              label="Escolha a estação"
              variant="underlined"
              @update:model-value="stationStore.getStationLines"
            />
          </v-col>

          <v-col
            class="d-flex align-center pa-0"
            :class="displayStore.xs ? 'justify-center' : displayStore.sm ? 'justify-center' : 'justify-start'"
            cols="12"
            sm="5"
          >
            <FindStationDialog />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-table
              v-if="stationStore.stationLines != null"
              fixed-header
            >
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Próx. Parada</th>
                  <th class="text-left">Destino Final</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="line in stationStore.stationLines" :key="line.id">
                  <td>{{ line.name }}</td>
                  <td>{{ line.stop }}</td>
                  <td>{{ line.finalDestination }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="w-100 h-100 pa-2 rounded rounded-lg" color="accent3" variant="tonal">
          <v-card-title class="text-center">AVISOS</v-card-title>

          <v-card-item>
            {{ warnings.length === 0 ? 'Nenhum aviso' : '' }}
          </v-card-item>

          <v-card-item v-for="warning in warnings" :key="warning.id">
            {{ warning.id }}. {{ warning.message }}
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
