<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";

import { useDisplayStore } from "@/stores/displayStore.js";
import HeaderComponent from "@/components/ManyPages/HeaderComponent.vue";

const displayStore = useDisplayStore();
</script>

<template>
  <v-app class="background-texture">
    <HeaderComponent />
    <v-main>
      <section class="pa-4">
        <RouterView />
      </section>
    </v-main>
  </v-app>
</template>

<style scoped>
.background-texture {
  background-image: url("/images/fullPage_bg.png");
  background-repeat: repeat;
  background-size: contain;
  min-height: 100vh;
}
</style>
