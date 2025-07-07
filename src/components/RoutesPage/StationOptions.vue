<script setup>
  import { ref } from 'vue';

  import { useStationStore } from '@/stores/stationStore';
  import { useUserStore } from '@/stores/userStore';

  const stationStore = useStationStore()
  const userStore = useUserStore()

  const expansionPanels = ref(false)
  const excludeDialog = ref(false)

  const newLine = ref({
    name: '',
    stop: '',
    finalDestination: '',
    driver: '',
  })

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

  function excludeLine () {
    stationStore.deleteLine()
    excludeDialog.value = false
  }
</script>

<template>
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
      md="2"
    >
      <v-btn
        color="base"
        :disabled="stationStore.currentStation === null"
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

      <v-expansion-panel>
        <v-expansion-panel-title>
          <template #default="{}">
            <v-row>
              <v-col class="d-flex justify-start" cols="4">
                Excluir Rota
              </v-col>
            </v-row>
          </template>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="stationStore.selectedLine"
                item-title="name"
                item-value="id"
                :items="stationStore.stationLines"
                label="Selecione a Linha"
                variant="underlined"
              />
            </v-col>

            <v-col class="d-flex px-8" cols="12" sm="6">
              <v-btn
                @click="excludeDialog = true"
                color="base"
                text="Excluir Rota"
                variant="flat"
              />
             <v-dialog v-model="excludeDialog" max-width="500">

                <template v-slot:default="{ isActive }">
                  <v-card title="Excluir Rota" class="pa-4">
                    <v-card-text>
                      Tem certeza que deseja excluir a rota selecionada?
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-row>
                        <v-btn
                          text="NÃO"
                          @click="excludeDialog = false"
                        />

                        <v-btn
                          text="SIM"
                          @click="excludeLine()"
                        />
                      </v-row>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>      
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
