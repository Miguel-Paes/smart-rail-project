<template>
  <v-form class="d-flex flex-column pa-4">
    <v-text-field label="Username" type="text" required></v-text-field>

    <v-text-field label="Email" type="email" required></v-text-field>

    <v-text-field label="Senha" type="password" required></v-text-field>

    <v-btn class="mt-2 align-self-center" color="red darken-2" dark>
      Registrar
    </v-btn>
  </v-form>
</template>
