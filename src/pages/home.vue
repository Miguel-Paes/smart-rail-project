  <script setup>
  import { ref } from 'vue';
  </script>

<template>
  <v-main class="pa-0 px-2 pt-1">
    <h2>Dashboard Geral</h2>

    <v-row dense>
      <v-col class="d-flex ga-2 align-center pa-0" cols="12" lg="4" md="6">
        <v-text-field class="w-66 h-75" placeholder="Estação mais próxima" prepend-icon="mdi-magnify" variant="outlined" />
        <v-btn class="w25 h-75" color="deep-purple-accent-3">N</v-btn>
      </v-col>
    </v-row>
  </v-main>
</template>
