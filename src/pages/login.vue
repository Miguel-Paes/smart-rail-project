<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();
</script>

<template>
  <v-card
    class="d-flex flex-column align-center justify-center h-100 inclined-card overflow-hidden"
    :class="
      displayStore.xs
        ? 'w-100'
        : displayStore.sm
        ? 'w-50 align-self-center'
        : 'w-50'
    "
    :variant="displayStore.mdAndUp ? 'elevated' : 'translucent'"
  >
    <div class="card-content">
      <h1>Autenticação</h1>
      <AuthForm />
    </div>
  </v-card>
</template>

<style scoped>
.inclined-card {
  position: relative;
  clip-path: polygon(0 0, 100% 0, 78% 100%, 0% 100%);
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 2rem;
}
</style>

