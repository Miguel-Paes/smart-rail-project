<script setup>
  import { VTimePicker } from 'vuetify/labs/VTimePicker';

  import { useStationStore } from '@/stores/stationStore';
  import { useWarningStore } from '@/stores/warningsStore';

  const warningStore = useWarningStore();
  const stationStore = useStationStore();

  const newWarning = ref({ ...warningStore.defaultWarning })

  const dialog = ref(false)

  const modal2 = ref(false)

  function createWarning () {
    dialog.value = false
    if (newWarning.value.message === undefined) {
      newWarning.value.message = 'Aviso sem mensagem'
    }
    warningStore.warnings.push({ ...newWarning.value })
    warningStore.warningID += 1
    Object.assign(newWarning.value, warningStore.defaultWarning)
    // newWarning.value = structuredClone(warningStore.defaultWarning)
  }
</script>

<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="true"
    transition="dialog-bottom-transition"
  >
    <template #activator="{ props: activatorProps }">
      <v-col class="d-flex justify-center mt-4 mb-4" cols="12" md="4" sm="6">
        <v-btn class="w-100" v-bind="activatorProps" color="accent3" variant="tonal">Criar Aviso</v-btn>
      </v-col>
    </template>

    <v-card class="pa-12">
      <v-card-title class="text-accent3">Criar Aviso</v-card-title>

      <v-form>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="newWarning.message" class="text-accent3" label="Mensagem" variant="underlined" />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="newWarning.notificationType"
              class="text-accent3"
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
              class="text-accent3"
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
              class="text-accent3"
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
                        class="text-accent3"
                        color="accent3"
                        title="Horário de Início"
                      />
                    </v-col>
                    <v-col class="d-flex justify-center" cols="12" sm="6">
                      <v-time-picker
                        v-if="modal2"
                        v-model="newWarning.duration.end"
                        ampm-in-title
                        class="text-accent3"
                        color="accent3"
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
            <v-btn class="w-100" color="accent3" variant="tonal" @click="createWarning(newWarning)">Criar aviso</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>
