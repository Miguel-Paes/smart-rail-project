<script setup>
import { ref } from "vue";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import { useStationStore } from "@/stores/stationStore";
import { useWarningStore } from "@/stores/warningsStore";

const warningStore = useWarningStore();
const stationStore = useStationStore();

const dialog = ref(false);
const modal2 = ref(false);

async function createWarning() {
  try {
    dialog.value = false;

    // Validação básica
    if (!warningStore.newWarning.message?.trim()) {
      warningStore.newWarning.message = "Aviso sem mensagem";
    }

    // Usa o método da store que persiste no Firebase
    await warningStore.addWarning();
    await warningStore.getWarning();

    // A store já deve resetar o newWarning automaticamente
    // Se não resetar, chame: warningStore.resetNewWarning()
  } catch (error) {
    console.error("Erro ao criar aviso:", error);
    // Mostrar mensagem de erro para o usuário
  }
}

function resetForm() {
  warningStore.resetNewWarning();
  dialog.value = false;
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="true"
    transition="dialog-bottom-transition"
    @after-leave="resetForm"
  >
    <template #activator="{ props: activatorProps }">
      <v-col class="d-flex justify-center mt-4 mb-4" cols="12" md="4" sm="6">
        <v-btn
          class="w-100"
          v-bind="activatorProps"
          color="accent3"
          variant="tonal"
        >
          Criar Aviso
        </v-btn>
      </v-col>
    </template>

    <v-card class="pa-12">
      <v-card-title class="text-accent3">
        <v-row>
          <v-col cols="11"><h3>Criar Aviso</h3></v-col>
          <v-col cols="1">
            <v-btn
              @click="dialog = !dialog"
              color="base"
              icon="mdi-window-close"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-form @submit.prevent="createWarning">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="warningStore.newWarning.message"
              class="text-accent3"
              label="Mensagem"
              variant="underlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="warningStore.newWarning.notificationType"
              class="text-accent3"
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
              v-model="warningStore.newWarning.station"
              class="text-accent3"
              item-title="name"
              item-value="id"
              :items="stationStore.stations"
              label="Estação"
              multiple
              variant="underlined"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :active="modal2"
              class="text-accent3"
              :focused="modal2"
              :label="
                warningStore.newWarning.duration.start &&
                warningStore.newWarning.duration.end
                  ? `Início: ${warningStore.newWarning.duration.start} - Término: ${warningStore.newWarning.duration.end}`
                  : 'Definir Duração'
              "
              readonly
              variant="underlined"
            >
              <v-dialog v-model="modal2" activator="parent" max-width="1000">
                <v-card class="pa-3 d-flex">
                  <v-row>
                    <v-col class="d-flex justify-center" cols="12" sm="6">
                      <v-time-picker
                        v-if="modal2"
                        v-model="warningStore.newWarning.duration.start"
                        ampm-in-title
                        class="text-accent3"
                        color="accent3"
                        title="Horário de Início"
                      />
                    </v-col>
                    <v-col class="d-flex justify-center" cols="12" sm="6">
                      <v-time-picker
                        v-if="modal2"
                        v-model="warningStore.newWarning.duration.end"
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
          </v-col>
        </v-row>

        <v-row class="d-flex justify-center">
          <v-col cols="12" md="2" sm="6">
            <v-btn
              class="w-100"
              color="accent3"
              variant="tonal"
              type="submit"
              :loading="warningStore.loading"
            >
              Criar aviso
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>
