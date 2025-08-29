<script setup>
  defineProps({
    title: {
      type: String,
      default: 'Avisos'
    },
    items: {
      type: Array,
      default: () => []
    }
  })
</script>

<template>
  <v-card class="w-100 h-100 d-flex flex-column pa-2 ga-2 rounded rounded-lg overflow-auto" color="accent3" variant="tonal">
    <v-card-title class="text-center">{{ title }}</v-card-title>

    <v-card-item>
      {{ items.length === 0 ? 'Nenhum Trem' : '' }}
    </v-card-item>

    <v-card class="pa-2" color="accent4" variant="tonal" v-for="item in items" :key="item.id">
      <v-row class="pa-3">Trem: {{ item.trainCode }}</v-row>
      <v-row class="pa-3">Linha: {{ item.line == 0 ? 'Trem sem linha' : item.line  }}</v-row>
      <v-row class="pa-3">Última Manutenção: {{ item.lastMaintance }}</v-row>
      <v-row class="pa-3">Próxima Manutenção: {{ item.nextMaintance }}</v-row>
    </v-card>
  </v-card>
</template>
