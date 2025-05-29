  <script setup>
  import { ref } from 'vue';
  import { VTimePicker } from 'vuetify/labs/VTimePicker'

  import { useStationStore } from '@/stores/stationStore.js'
  import { useDisplayStore } from '@/stores/displayStore.js'
  import { useWarningStore } from '@/stores/warningsStore';

  const stationStore = useStationStore()
  const displayStore = useDisplayStore()
  const warningStore = useWarningStore()

  const warnings = ref(warningStore.warnings)

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
  <v-main class="pa-0 pt-1" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <h2 class="mb-3 font-weight-bold" :class="displayStore.xs ? 'text-h6' : displayStore.sm ? 'text-h5' : 'text-h4'">Dashboard Geral</h2>

    <v-row class="d-flex">
      <v-col class="d-flex flex-column justify-center" cols="12" md="6">
        <v-row class="d-flex" :class="displayStore.xs ? '' : displayStore.sm ? '' : 'ga-3'" dense>
          <v-col class="d-flex align-center pa-0" cols="12" sm="6">
            <v-select
              v-model="stationStore.stationId"
              item-title="name"
              item-value="id"
              :items="stationStore.stations"
              label="Escolha a estação"
              variant="underlined"
              @update:model-value="stationStore.getStationLines"
            />
          </v-col>

          <v-col
            class="d-flex align-center pa-0"
            :class="displayStore.xs ? 'justify-center' : displayStore.sm ? 'justify-center' : 'justify-start'"
            cols="12"
            sm="5"
          >
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-table
              v-if="stationStore.stationLines != null"
              fixed-header
            >
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Próx. Parada</th>
                  <th class="text-left">Destino Final</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="line in stationStore.stationLines" :key="line.id">
                  <td>{{ line.name }}</td>
                  <td>{{ line.stop }}</td>
                  <td>{{ line.finalDestination }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="w-100 h-100 pa-2 rounded rounded-lg" color="accent3" variant="tonal">
          <v-card-title class="text-center">AVISOS</v-card-title>

          <v-card-item>
            {{ warnings.length === 0 ? 'Nenhum aviso' : '' }}
          </v-card-item>

          <v-card-item v-for="warning in warnings" :key="warning.id">
            {{ warning.id }}. {{ warning.message }}
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
