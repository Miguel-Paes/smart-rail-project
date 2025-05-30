<script setup>
  import { ref } from 'vue';

  const cep = ref('');
  const address = ref({
    street: '',
    neighborhood: '',
    city: '',
    state: '',
  })

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
          address.value.street = data.logradouro;
          address.value.neighborhood = data.bairro;
          address.value.city = data.localidade;
          address.value.state = data.uf
        })
        .catch(error => {
          console.log('Erro:', error)
        })
    }
  }
</script>

<template>
  <v-main class="pa-0 pt-5" :class="$vuetify.display.mobile ? 'px-3' : 'px-7'">
    <h2 class="mb-3" :class="$vuetify.display.mobile ? '' : 'text-h4 font-weight-regular'">Monitoramento e Manutenção</h2>

    <v-row>
      <v-col>
        <h1 class="text-uppercase">Busque endereço pelo CEP</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <v-text-field
          v-model="cep"
          dense
          label="Digite o CEP desejado..."
          @input="onCepInput"
          maxlength="8"
        />
      </v-col>
      <v-col cols="1">
        <v-btn
          color="primary"
          icon="mdi-home-search-outline"
          @click="searchAddress"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Resultado</v-card-title>
          <v-card-text>
            <p>Logradouro: {{ address.street }}</p>
            <p>Bairro: {{ address.neighborhood }}</p>
            <p>Cidade: {{ address.city }}</p>
            <p>Estado: {{ address.state }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
