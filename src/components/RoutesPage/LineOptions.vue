<script setup>
  import { ref } from 'vue';
  import { useStationStore } from '@/stores/stationStore'
  import { useUserStore } from '@/stores/userStore';

  const stationStore = useStationStore()
  const userStore = useUserStore()

  const expansionPanels = ref(false)
  const driver = ref('')
  const justification = ref('')

  const commercialLoad = ref({
    name: '',
    type: '',
    enterprise: '',
    weight: 0,
    volume: 0,
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
</script>

<template>
  <v-row>
    <v-col cols="12" md="5">
      <v-select
        v-model="stationStore.stationId"
        item-title="name"
        item-value="id"
        :items="stationStore.stations"
        label="Selecione a Estação"
        variant="underlined"
      />
    </v-col>

    <v-col cols="12" md="5">
      <v-select
        v-if="stationStore.stationId != null"
        v-model="stationStore.selectedLine"
        item-title="name"
        item-value="id"
        :items="stationStore.stationLines"
        label="Selecione a Linha"
        variant="underlined"
      />
    </v-col>
    <v-col
      v-if="stationStore.selectedLine"
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
    <v-expansion-panels class="py-5 px-1" :disabled="expansionPanels === false">
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
</template>
