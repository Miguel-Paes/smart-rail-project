  <script setup>
  import { ref } from 'vue';
  import { VTimePicker } from 'vuetify/labs/VTimePicker'

  import { useStationStore } from '@/stores/stationStore.js'

  const stationStore = useStationStore()

  const userLocation = ref(stationStore.userLocation)

  const menu2 = ref(false)

  const states = ref(['AC', 'AL', 'Ap', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']);

  const cep = ref(stationStore.userLocation.cep);

  function onCepInput () {
    if (cep.value.length === 8) {
      searchAddress();
    }
  }

  function searchAddress () {
    if (cep.value.length !== 8) {
      alert('CEP inválido');
    } else {
      fetch(`https://viacep.com.br/ws/${cep.value}/json/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao buscar endereço');
          }
          return response.json();
        })
        .then(data => {
          userLocation.value.street = data.logradouro;
          userLocation.value.neighborhood = data.bairro;
          userLocation.value.city = data.localidade;
          userLocation.value.state = data.uf
        })
        .catch(error => {
          console.log('Erro:', error)
        })
    }
  }
  </script>

<template>
  <v-main class="pa-0 pt-1" :class="$vuetify.display.mobile ? 'px-3' : 'px-7'">
    <h2 class="mb-3" :class="$vuetify.display.mobile ? '' : 'text-h4 font-weight-bold'">Dashboard Geral</h2>

    <v-row class="d-flex" :class="$vuetify.display.mobile ? '' : 'ga-10'" dense>
      <v-col class="d-flex align-center pa-0" cols="12" lg="4" md="6">
        <v-select
          v-model="stationStore.stationId"
          item-title="name"
          item-value="id"
          :items="stationStore.stations"
          label="Escolha a estação"
          variant="underlined"
          @update:modelValue="stationStore.getStationLines"
        />
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
              class="pa-2 d-flex align-center h-75"
              :class="$vuetify.display.mobile ? 'w-100 h-25' : 'h-50 w-100' "
              color="red-accent-3"
              v-bind="activatorProps"
              variant="tonal"
            >
              Não sei a estação mais próxima
            </v-btn>
          </template>

          <template #default="{ isActive }">
            <v-card :class="$vuetify.display.mobile ? 'pa-1' : 'pa-7'" title="Digite as informações">
              <v-form>
                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-text-field
                      v-model="cep"
                      dense
                      label="Digite o CEP desejado..."
                      maxlength="8"
                      @input="onCepInput"
                    />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field
                      v-model="stationStore.userLocation.departureTime"
                      :active="menu2"
                      :focus="menu2"
                      label="Horário de Saída"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                    >
                      <v-menu
                        v-model="menu2"
                        activator="parent"
                        :close-on-content-click="false"
                        transition="scale-transition"
                      >
                        <v-time-picker
                          v-if="menu2"
                          v-model="stationStore.userLocation.departureTime"
                          ampm-in-title="true"
                          full-width
                        />
                      </v-menu>
                    </v-text-field>
                  </v-col>
                </v-row>

                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-select v-model="stationStore.userLocation.state" :items="states" label="Estado" variant="outlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field v-model="stationStore.userLocation.city" label="Cidade" variant="outlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-text-field v-model="stationStore.userLocation.street" label="Rua" variant="outlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field v-model="stationStore.userLocation.number" label="Número" variant="outlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex justify-center">
                  <v-btn color="red-accent-3" variant="tonal" @click="isActive.value = false">
                    Descobrir estação
                  </v-btn>
                </v-row>
              </v-form>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card v-for="line in stationStore.stationLines" :key="line.id">
          {{ line.name }}
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
