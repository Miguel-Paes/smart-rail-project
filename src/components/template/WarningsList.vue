<script setup>
  defineProps(['title', 'forItems'])
</script>

<template>
  <v-card class="w-100 h-100 pa-2 rounded rounded-lg" color="accent3" variant="tonal">
    <v-card-title class="text-center">{{ title }}</v-card-title>

    <v-card-item>
      {{ forItems.length === 0 ? 'Nenhum aviso' : '' }}
    </v-card-item>

    <v-card-item v-for="item in forItems" :key="item.id">
      {{ item.id }}. {{ item.message }}
    </v-card-item>
  </v-card>
</template>
