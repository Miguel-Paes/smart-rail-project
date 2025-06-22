<script setup>
  import { VTimePicker } from 'vuetify/labs/VTimePicker'
  import { ref } from 'vue';

  import { useStationStore } from '@/stores/stationStore.js'

  const stationStore = useStationStore()

  const menu2 = ref(false)
  const userLocation = ref(stationStore.userLocation)

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
  <v-dialog>
    <template #activator="{ props: activatorProps }">
      <v-btn
        class="pa-2 d-flex align-center h-50 text-no-wrap"
        :class="$vuetify.display.mobile ? 'w-100 h-100' : 'h-50 w-100' "
        color="accent3"
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
                variant="underlined"
                @input="onCepInput"
              />
            </v-col>

            <v-col cols="12" lg="6">
              <v-text-field
                v-model="stationStore.userLocation.departureTime"
                :active="menu2"
                :focus="menu2"
                label="Horário de Saída"
                readonly
                variant="underlined"
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
                    color="accent3"
                    full-width
                    scrollable="true"
                  />
                </v-menu>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row class="d-flex">
            <v-col cols="12" lg="6">
              <v-select v-model="stationStore.userLocation.state" :items="states" label="Estado" variant="underlined" />
            </v-col>

            <v-col cols="12" lg="6">
              <v-text-field v-model="stationStore.userLocation.city" label="Cidade" variant="underlined" />
            </v-col>
          </v-row>

          <v-row class="d-flex">
            <v-col cols="12" lg="6">
              <v-text-field v-model="stationStore.userLocation.street" label="Rua" variant="underlined" />
            </v-col>

            <v-col cols="12" lg="6">
              <v-text-field v-model="stationStore.userLocation.number" label="Número" variant="underlined" />
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center">
            <v-btn color="accent3" variant="tonal" @click="isActive.value = false">
              Descobrir estação
            </v-btn>
          </v-row>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>
