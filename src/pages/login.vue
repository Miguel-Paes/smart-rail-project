<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();
</script>

<template>
  <div class="container">
    <v-card
      class="d-flex flex-column align-center justify-center"
      :class="
        displayStore.xs
          ? 'w-100'
          : displayStore.sm
          ? 'w-100 align-self-center tablet-card'
          : 'elevated inclined-card overflow-hidden w-50'
      "
      :variant="displayStore.mdAndUp ? 'elevated' : 'translucent'"
    >
      <span
        class="w-50"
        :class="
          displayStore.mdAndUp
            ? 'declined-text'
            : displayStore.xs
            ? 'w-75'
            : displayStore.sm
            ? 'w-75 align-self-center'
            : ''
        "
      >
        <h1>Autenticação</h1>
        <AuthForm />
      </span>
    </v-card>
  </div>
</template>

<style scoped>
.inclined-card {
  transform: rotate(5deg);
  position: relative;
  bottom: 3rem;
  right: 13rem;
  height: 110vh;
}

.declined-text {
  transform: rotate(-5deg);
  position: relative;
  bottom: 1rem;
  left: 5rem;
}

.tablet-card {
  position: relative;
  top: 9rem;
}

.container {
  overflow: hidden;
  height: 100vh;
}
</style>
