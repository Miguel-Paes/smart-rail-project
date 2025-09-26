<script setup>
import { ref } from "vue";

const tabs = ref("login");
</script>

<template>
  <v-card-item class="pa-0 rounded-lg w-100 px-2 mt-6">
    <v-tabs v-model="tabs" class="bg-red-darken-2 d-flex rounded-t-lg">
      <v-tab value="login">Entrar</v-tab>
      <v-tab value="register">Registrar</v-tab>
    </v-tabs>

    <v-card-text
      class="d-flex flex-column align-center justify-center rounded-b-lg"
    >
      <v-tabs-window v-model="tabs" class="w-100">
        <v-tabs-window-item value="login">
          <LoginForm />
        </v-tabs-window-item>

        <v-tabs-window-item value="register">
          <RegisterForm />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card-item>
  <v-card-item>
    <v-divider class="my-6" thickness="3"
      ><h5 class="text-center text-grey">Outras Opções</h5></v-divider
    >
    <v-card-text
      class="display-flex flex-column pa-1 justify-center align-center"
    >
      <ButtonsSection />
    </v-card-text>
  </v-card-item>
</template>
