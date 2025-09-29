<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();
</script>

<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <span class="w-100 d-flex align-center justify-center">
        <v-btn
          :color="isHovering ? 'black' : 'lime-accent-2'"
          :ripple="false"
          v-bind="props"
          variant="flat"
          class="py-1 bi bi-google mb-4"
          :class="displayStore.sm ? 'w-75 px-16' : 'w-100'"
          ><span class="ml-3">Goggle</span></v-btn
        >
      </span>
    </template>
  </v-hover>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <span class="w-100 d-flex align-center justify-center">
        <v-btn
          :color="isHovering ? 'black' : 'lime-accent-2'"
          :ripple="false"
          v-bind="props"
          variant="flat"
          class="py-1 bi bi-facebook mb-4"
          :class="displayStore.sm ? 'w-75 px-16' : 'w-100'"
          ><span class="ml-3">Facebook</span></v-btn
        >
      </span>
    </template>
  </v-hover>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <span class="w-100 d-flex align-center justify-center">
        <v-btn
          :color="isHovering ? 'black' : 'lime-accent-2'"
          :ripple="false"
          v-bind="props"
          variant="flat"
          class="py-1 bi bi-apple mb-4"
          :class="displayStore.sm ? 'w-75 px-16' : 'w-100'"
          ><span class="ml-3">Apple</span></v-btn
        >
      </span>
    </template>
  </v-hover>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <span class="w-100 d-flex align-center justify-center">
        <v-btn
          :color="isHovering ? 'black' : 'lime-accent-2'"
          :ripple="false"
          v-bind="props"
          variant="flat"
          class="py-1 bi bi-twitter-x mb-4"
          :class="displayStore.sm ? 'w-75 px-16' : 'w-100'"
          ><span class="ml-3">Twitter X</span></v-btn
        >
      </span>
    </template>
  </v-hover>
</template>
