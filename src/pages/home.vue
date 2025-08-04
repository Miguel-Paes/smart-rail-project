  <script setup>
  import { useStationStore } from '@/stores/stationStore.js'
  import { useDisplayStore } from '@/stores/displayStore.js'
  import { useWarningStore } from '@/stores/warningsStore';
  
  import FindStationDialog from '@/components/home/FindStationDialog.vue';
  import WarningsList from '@/components/template/WarningsList.vue';

  const stationStore = useStationStore()
  const displayStore = useDisplayStore()
  const warningStore = useWarningStore()
</script>

<template>
    <TitleSection title="Dashboard Geral" />
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
        <WarningsList
          :items="warningStore.warnings"
        />
      </v-col>
    </v-row>
</template>
