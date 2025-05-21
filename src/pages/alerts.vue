<script setup>
  import { ref } from 'vue';
  import { VTimePicker } from 'vuetify/labs/VTimePicker';

  import { useWarningStore } from '@/stores/warningsStore';
  import { useStationStore } from '@/stores/stationStore';

  const warningStore = useWarningStore();
  const stationStore = useStationStore();
  const warnings = ref(warningStore.warnings)

  const newWarning = ref({ ...warningStore.defaultWarning })

  const dialog = ref(false)

  const modal2 = ref(false)

  function createWarning (warning) {
    console.log(warning)
    dialog.value = false
    warningStore.addWarning(warning)
    newWarning.value = structuredClone(warningStore.defaultWarning.value)
  }

</script>

<template>
  <v-main class="pa-0 pt-1" :class="$vuetify.display.mobile ? 'px-3' : 'px-7'">
    <h2 class="mb-3" :class="$vuetify.display.mobile ? '' : 'text-h4 font-weight-bold'">Alertas e Notificações</h2>

    <v-row class="d-flex justify-center">
      <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
      >
        <template #activator="{ props: activatorProps }">
          <v-col class="d-flex justify-center mt-4 mb-4" cols="12" md="4" sm="6">
            <v-btn class="w-50" v-bind="activatorProps" color="red-accent-3" variant="tonal">Criar Aviso</v-btn>
          </v-col>
        </template>

        <v-card class="pa-12">
          <v-card-title class="text-red-accent-3">Criar Aviso</v-card-title>

          <v-form>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newWarning.message" class="text-red-accent-3" label="Mensagem" variant="underlined" />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newWarning.notificationType"
                  class="text-red-accent-3"
                  item-value="item"
                  :items="warningStore.warningTypes"
                  label="Tipo de Aviso"
                  multiple
                  variant="underlined"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newWarning.station"
                  class="text-red-accent-3"
                  item-title="name"
                  item-value="id"
                  :items="stationStore.stations"
                  label="Estação"
                  variant="underlined"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :active="modal2"
                  class="text-red-accent-3"
                  :focused="modal2"
                  :label="newWarning.duration.start === null && newWarning.duration.end === null ? 'Definir Duração' : `Início: ${newWarning.duration.start} - Término: ${newWarning.duration.end}`"
                  readonly
                  variant="underlined"
                >

                  <span v-if="newWarning.duration.start != null && newWarning.duration.end != null">
                    Início: {{ newWarning.duration.start }} - Término: {{ newWarning.duration.end }}
                  </span>

                  <v-dialog
                    v-model="modal2"
                    activator="parent"
                    max-width="1000"
                  >
                    <v-card class="pa-3 d-flex">
                      <v-row>
                        <v-col class="d-flex justify-center" cols="12" sm="6">
                          <v-time-picker
                            v-if="modal2"
                            v-model="newWarning.duration.start"
                            ampm-in-title
                            color="red-accent-3"
                            title="Horário de Início"
                          />
                        </v-col>
                        <v-col class="d-flex justify-center" cols="12" sm="6">
                          <v-time-picker
                            v-if="modal2"
                            v-model="newWarning.duration.end"
                            ampm-in-title
                            color="red-accent-3"
                            title="Horário de Término"
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-dialog>
                </v-text-field>
                {{ newWarning.type }}
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
              <v-col cols="12" md="2" sm="6">
                <v-btn class="w-100" color="red-accent-3" variant="tonal" @click="createWarning(newWarning)">Criar aviso</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="w-100 h-100 pa-2 border-red-accent-3 rounded rounded-lg" color="red-accent-3" variant="tonal">
          <v-card-title class="text-center">AVISOS DA COMUNIDADE</v-card-title>

          <v-card-item>
            {{ warnings.length === 0 ? 'Nenhum aviso' : '' }}
          </v-card-item>

          <v-card-item v-for="warning in warnings" :key="warning.id">
            {{ warning.id }}. {{ warning.text }}
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="w-100 h-100 pa-2 border-red-accent-3 rounded rounded-lg" color="red-accent-3" variant="tonal">
          <v-card-title class="text-center">AVISOS POSTADOS</v-card-title>

          <v-card-item>
            {{ warnings.length === 0 ? 'Nenhum aviso' : '' }}
          </v-card-item>

          <v-card-item v-for="warning in warnings" :key="warning.id">
            {{ warning.id }}. {{ warning.text }}
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
