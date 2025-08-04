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
  <v-card class="w-100 h-100 pa-2 rounded rounded-lg" color="accent3" variant="tonal">
    <v-card-title class="text-center">{{ title }}</v-card-title>

    <v-card-item>
      {{ items.length === 0 ? 'Nenhum Trem' : '' }}
    </v-card-item>

    <v-card-item v-for="item in items" :key="item.id">
      <v-row>Trem: {{ item.trainCode }}</v-row>
      <v-row>Linha: {{ item.trainLine }}</v-row>
      <v-row>Última Manutenção: {{ item.lastMaintance }}</v-row>
      <v-row>Próxima Manutenção: {{ item.nextMaintance }}</v-row>
    </v-card-item>
  </v-card>
</template>
