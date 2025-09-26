<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();
</script>

<template>
  <v-card
    class="d-flex flex-column align-center justify-center h-100"
    :class="
      displayStore.xs
        ? 'w-100'
        : displayStore.sm
        ? 'w-50 align-self-center'
        : 'elevated inclined-card overflow-hidden w-50'
    "
    :variant="displayStore.mdAndUp ? 'elevated' : 'translucent'"
  >
    <span :class="displayStore.mdAndUp ? 'declined-text' : ''">
      <h1>Autenticação</h1>
      <AuthForm />
    </span>
  </v-card>
</template>

<style scoped>
.inclined-card {
  transform: rotate(5deg);
  position: relative;
  bottom: 3rem;
  right: 13rem;
  height: 70vh;
}

.declined-text {
  transform: rotate(-5deg);
}
</style>
