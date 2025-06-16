<script setup>
  import { useDisplayStore } from '@/stores/displayStore.js';
  import { useUserStore } from '@/stores/userStore';
  import { useStationStore } from '@/stores/stationStore';

  const userStore = useUserStore()
  const displayStore = useDisplayStore()
  const stationStore = useStationStore()

  const expansionPanels = ref(false)
  const expansionPanels2 = ref(false)
  const driver = ref('')
  const justification = ref('')

  const commercialLoad = ref({
    name: '',
    type: '',
    enterprise: '',
    weight: 0,
    volume: 0,
  })

  const newLine = ref({
    name: '',
    stop: '',
    finalDestination: '',
    driver: '',
  })

  function defineDriver () {
    stationStore.selectedLine.driver = driver.value
  }

  function defineJustification () {
    stationStore.selectedLine.justification = justification.value
    console.log(stationStore.selectedLine.justification)
  }

  function addComercialLoad () {
    if (stationStore.selectedLine.commercialLoads === undefined) {
      stationStore.selectedLine.commercialLoads = []
    }
    stationStore.selectedLine.commercialLoads.push({
      name: commercialLoad.value.name,
      type: commercialLoad.value.type,
      enterprise: commercialLoad.value.enterprise,
      weight: commercialLoad.value.weight,
      volume: commercialLoad.value.volume,
    })

    commercialLoad.value = {
      name: '',
      type: '',
      enterprise: '',
      weight: 0,
      volume: 0,
    }
  }

  function addLine () {
    if (stationStore.stationLines === undefined) {
      stationStore.stationLines = []
    }
    stationStore.stationLines.push({
      name: newLine.value.name,
      stop: newLine.value.stop,
      finalDestination: newLine.value.finalDestination,
      driver: newLine.value.driver,
    })

    newLine.value = {
      name: '',
      stop: '',
      finalDestination: '',
      driver: '',
    }
  }

</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <h2 class="mb-3 font-weight-regular" :class="displayStore.xs ? 'text-h6' : displayStore.sm ? 'text-h5' : 'text-h4'">Gestão de Rotas e Estações</h2>

    <v-row>
      <v-card-title>
        Definir Linha para Editar
      </v-card-title>
    </v-row>

    <v-row>
      <v-col cols="12" md="5">
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

      <v-col cols="12" md="5">
        <v-select
          v-if="stationStore.currentStation != null"
          item-title="name"
          item-value="id"
          :items="stationStore.stationLines"
          label="Selecione a Linha"
          variant="underlined"
          @update:model-value="stationStore.selectStationInLines"
        />
      </v-col>

      <v-col
        v-if="stationStore.selectedLine != null"
        class="d-flex justify-center"
        cols="12"
        md="2"
      >
        <v-btn
          color="base"
          :disabled="stationStore.selectedLine === null"
          icon="mdi-magnify"
          @click="expansionPanels = true"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-expansion-panels :disabled="expansionPanels === false">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template #default="{}">
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
          <v-expansion-panel-title>
            <template #default="{}">
              <v-row>
                <v-col class="d-flex justify-start" cols="4">
                  Bloquear Rota
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
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
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>
            <template #default="{}">
              <v-row>
                <v-col class="d-flex justify-start" cols="4">
                  Informar Carga Comercial
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="commercialLoad.type"
                  label="Tipo de carga"
                  variant="underlined"
                />
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="commercialLoad.name"
                  label="Nome da carga"
                  variant="underlined"
                />
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="commercialLoad.enterprise"
                  label="Empresa responsável"
                  variant="underlined"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="5" sm="6">
                <v-text-field
                  v-model="commercialLoad.weight"
                  label="Peso da carga"
                  variant="underlined"
                />
              </v-col>
              <v-col cols="12" md="5" sm="6">
                <v-text-field
                  v-model="commercialLoad.volume"
                  label="Volume da carga"
                  variant="underlined"
                />
              </v-col>

              <v-col cols="12" md="2">
                <v-btn
                  color="base"
                  prepend-icon="mdi-zip-box"
                  text="Adicionar Carga"
                  @click="addComercialLoad()"
                />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row class="mt-10">
      <v-card-title>
        Definir Estação para Editar
      </v-card-title>
    </v-row>

    <v-row>
      <v-col cols="12" md="5">
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

      <v-col
        class="d-flex justify-center"
        cols="12"
        md="1"
      >
        <v-btn
          color="base"
          :disabled="stationStore.currentStation === null"
          icon="mdi-magnify"
          @click="expansionPanels2 = true"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-expansion-panels :disabled="expansionPanels2 === false">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <template #default="{}">
              <v-row>
                <v-col class="d-flex justify-start" cols="4">
                  Criar rota
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="newLine.name"
                  label="Nome da rota"
                  variant="underlined"
                />
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="newLine.stop"
                  label="Parada da rota"
                  variant="underlined"
                />
              </v-col>

              <v-col cols="12" md="4" sm="6">
                <v-text-field
                  v-model="newLine.finalDestination"
                  label="Destino da rota"
                  variant="underlined"
                />
              </v-col>

              <v-row class="d-flex align-center pl-4">
                <v-col cols="12" md="4" sm="6">
                  <v-select
                    v-model="newLine.driver"
                    item-title="name"
                    item-value="id"
                    :items="userStore.employee"
                    label="Maquinista da rota"
                    variant="underlined"
                  />
                </v-col>

                <v-col class="d-flex px-8" cols="12" sm="6">
                  <v-btn
                    color="base"
                    :disabled="stationStore.selectedLineJustification === null"
                    text="Criar Rota"
                    @click="addLine()"
                  />
                </v-col>
              </v-row>

            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-main>
</template>
