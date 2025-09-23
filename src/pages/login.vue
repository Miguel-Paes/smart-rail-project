<script setup>
  import { ref } from 'vue';

  const tabs = ref(null);
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <h1>Autenticação</h1>

    <v-card class="mt-5 rounded-t-lg rounded-b-lg w-25">
      <v-card-item class="pa-0 rounded-lg">
        <v-tabs
          v-model="tabs"
          class="bg-red-darken-2 d-flex rounded-t-lg">
          <v-tab  value="login">Entrar</v-tab>
          <v-tab  value="register">Registrar</v-tab>
        </v-tabs>
  
        <v-card-text class="d-flex flex-column align-center justify-center rounded-b-lg">
          <v-tabs-window v-model="tabs" class="w-100">
            <v-tabs-window-item value="login">

              <v-form class="d-flex flex-column pa-4">
                <v-text-field
                  label="Username ou Email"
                  type="text"
                  required
                ></v-text-field>

                <v-text-field
                  label="Senha"
                  type="password"
                  required
                ></v-text-field>

                <v-btn
                  class="mt-2 align-self-center"
                  color="red darken-2"
                  dark
                >
                  Entrar
                </v-btn>
              </v-form>
            </v-tabs-window-item>
  
            <v-tabs-window-item value="register">
              <v-form class="d-flex flex-column pa-4">
                <v-text-field
                  label="Username"
                  type="text"
                  required
                ></v-text-field>
                
                <v-text-field
                  label="Email"
                  type="email"
                  required
                ></v-text-field>

                <v-text-field
                  label="Senha"
                  type="password"
                  required
                ></v-text-field>

                <v-btn
                  class="mt-2 align-self-center"
                  color="red darken-2"
                  dark
                >
                  Registrar
                </v-btn>
              </v-form>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <h3>Outras Opções de Login</h3>
        <v-card-text class="display-flex pa-1 ml-7 justify-center align-center">
            <v-btn variant="flat" :ripple="false" class="pa-0 mx-2"><img src="https://img.shields.io/badge/google-4285F4?style=for-the-badge&logo=google&logoColor=white"/></v-btn>
            <v-btn variant="flat" :ripple="false" class="pa-0 mx-2"><img src="https://img.shields.io/badge/Facebook-%231877F2.svg?style=for-the-badge&logo=Facebook&logoColor=white"/></v-btn>
            <v-btn variant="flat" :ripple="false" class="pa-0 mx-2"><img src="https://img.shields.io/badge/Apple-%23000000.svg?style=for-the-badge&logo=apple&logoColor=white"/></v-btn>
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-container>
</template>