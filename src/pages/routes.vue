<script setup>
  import { useDisplayStore } from '@/stores/displayStore.js';

</script>

<template>
  <v-main class="pa-0 pt-5" :class="$vuetify.display.mobile ? 'px-3' : 'px-7'">
    <h2 class="mb-3" :class="$vuetify.display.mobile ? '' : 'text-h4 font-weight-regular'">Gestão de Rotas</h2>
  </v-main>
</template>
