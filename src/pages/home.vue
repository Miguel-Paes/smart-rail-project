  <script setup>
  import { ref } from 'vue';

  const stations = ref([
    { id: 1, name: 'Estação Central' },
    { id: 2, name: 'Estação Norte' },
    { id: 3, name: 'Estação Sul' },
    { id: 4, name: 'Estação Leste' },
    { id: 5, name: 'Estação Oeste' },
  ]
  )
  </script>

<template>
  <v-main class="pa-0 pt-1" :class="$vuetify.display.mobile ? 'px-3' : 'px-7'">
    <h2 class="mb-3" :class="$vuetify.display.mobile ? '' : 'text-h4 font-weight-bold'">Dashboard Geral</h2>

    <v-row class="d-flex" :class="$vuetify.display.mobile ? '' : 'ga-10'" dense>
      <v-col class="d-flex align-center pa-0" cols="12" lg="4" md="6">
        <v-select item-title="name" :items="stations" label="Escolha a estação" variant="underlined" />
      </v-col>

      <v-col
        class="d-flex align-center pa-0"
        :class="$vuetify.display.mobile ? 'justify-center' : 'justify-start'"
        cols="12"
        lg="2"
        md="6"
      >
        <v-dialog>
          <template #activator="{ props: activatorProps }">
            <v-btn
              class="pa-2 d-flex align-center bg-deep-purple-accent-3 h-75"
              :class="$vuetify.display.mobile ? 'w-100 h-25' : 'h-50 w-100' "
              v-bind="activatorProps"
              variant="outlined"
            >
              Não sei a estação mais próxima
            </v-btn>
          </template>

          <template #default="{ isActive }">
            <v-card :class="$vuetify.display.mobile ? 'pa-3' : 'pa-7'" title="Digite as informações">
              <v-form>
                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="CEP" variant="underlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="Número" variant="underlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="Cidade" variant="underlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="Estado" variant="underlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="Rua" variant="underlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="Complemento" variant="underlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="Ponto de Referência" variant="underlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field placeholder="Horário de Saída" variant="underlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex justify-center">
                  <v-btn class="bg-deep-purple-darken-4" color="deep-purple-lighten-4" variant="flat" @click="isActive.value = false">
                    Descobrir estação
                  </v-btn>
                </v-row>
              </v-form>
            </v-card>
          </template>

        </v-dialog>
      </v-col>
    </v-row>
  </v-main>
</template>
