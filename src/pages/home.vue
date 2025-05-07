  <script setup>
  import { ref } from 'vue';

  const stations = ref([
    { id: 1, name: 'Estação Central' },
    { id: 2, name: 'Estação Norte' },
    { id: 3, name: 'Estação Sul' },
    { id: 4, name: 'Estação Leste' },
    { id: 5, name: 'Estação Oeste' },
  ]);

  const states = ref(['AC', 'AL', 'Ap', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']);

  const selectedStation = ref(null);

  const userLocation = ref({
    number: '',
    departureTime: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const cep = ref('');

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
          v-model="selectedStation"
          item-title="name"
          :items="stations"
          label="Escolha a estação"
          variant="underlined"
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
              class="pa-2 d-flex align-center bg-deep-purple-accent-3 h-75"
              :class="$vuetify.display.mobile ? 'w-100 h-25' : 'h-50 w-100' "
              v-bind="activatorProps"
              variant="outlined"
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
                      @input="onCepInput"
                      maxlength="8"
                    />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field v-model="userLocation.departureTime" label="Horário de Saída" variant="outlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-select v-model="userLocation.state" :items="states" label="Estado" variant="outlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field v-model="userLocation.city" label="Cidade" variant="outlined" />
                  </v-col>
                </v-row>

                <v-row class="d-flex">
                  <v-col cols="12" lg="6">
                    <v-text-field v-model="userLocation.street" label="Rua" variant="outlined" />
                  </v-col>

                  <v-col cols="12" lg="6">
                    <v-text-field v-model="userLocation.number" label="Número" variant="outlined" />
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
