<script setup>
  import { useDisplayStore } from '@/stores/displayStore.js';
  import { useUserStore } from '@/stores/userStore';
  import { useStationStore } from '@/stores/stationStore';

  const userStore = useUserStore()
  const displayStore = useDisplayStore()
  const stationStore = useStationStore()

  const expansionPanels = ref(false)
  const driver = ref('')
  const justification = ref('')

  function defineDriver () {
    stationStore.selectedLine.driver = driver.value
  }

  function defineJustification () {
    stationStore.selectedLine.justification = justification.value
    console.log(stationStore.selectedLine.justification)
  }

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
          v-model="stationStore.currentStation"
          item-title="name"
          item-value="id"
          :items="stationStore.stations"
          label="Selecione a Estação"
          variant="underlined"
          @update:model-value="stationStore.getStationLines"
        />
      </v-col>

      <v-col cols="12" md="4" sm="6">
        <v-select
          v-if="stationStore.currentStation != null"
          item-title="name"
          item-value="id"
          :items="stationStore.stationLines"
          label="Selecione a Linha"
          variant="underlined"
          @update:model-value="stationStore.selectStationInRoutes"
        />
      </v-col>

      <v-col
        v-if="stationStore.selectedLine != null"
        class="d-flex justify-center"
        cols="12"
        md="4"
      >
        <v-btn
          color="base"
          :disabled="stationStore.selectedLine === null"
          text="Pesquisar"
          @click="expansionPanels = true"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-expansion-panels :disabled="expansionPanels === false">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template #default="{ expanded }">
              <v-row>
                <v-col class="d-flex justify-start" cols="4">
                  Definir Maquinista
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="driver"
                  item-title="name"
                  item-value="id"
                  :items="userStore.employee"
                  label="Selecione o Maquinista"
                  variant="underlined"
                />
              </v-col>

              <v-col class="d-flex px-8" cols="12" sm="6">
                <v-btn
                  color="base"
                  :disabled="stationStore.selectedLineDriver === null"
                  text="Definir Maquinista"
                  @click="defineDriver()"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>Bloquear Rota</v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="justification"
                  label="Justificativa"
                  variant="underlined"
                />
              </v-col>

              <v-col class="d-flex px-8" cols="12" sm="6">
                <v-btn
                  color="base"
                  :disabled="stationStore.selectedLineJustification === null"
                  text="Definir Justificativa"
                  @click="defineJustification()"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-text></v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-main>
</template>
