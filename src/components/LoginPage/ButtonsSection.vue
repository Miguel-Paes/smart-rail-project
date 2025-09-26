<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();
</script>

<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <span class="w-100 d-flex align-center justify-center">
        <v-btn
          :variant="isHovering ? 'flat' : 'outlined'"
          :ripple="false"
          v-bind="props"
          :color="isHovering ? 'red-accent-2' : 'undefined'"
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
          :variant="isHovering ? 'flat' : 'outlined'"
          :ripple="false"
          v-bind="props"
          :color="isHovering ? 'blue-darken-3' : 'undefined'"
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
          :variant="isHovering ? 'flat' : 'outlined'"
          :ripple="false"
          v-bind="props"
          :color="isHovering ? 'white' : 'undefined'"
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
          :variant="isHovering ? 'flat' : 'outlined'"
          :ripple="false"
          v-bind="props"
          :color="isHovering ? 'blue-lighten-1' : 'undefined'"
          class="py-1 bi bi-twitter-x mb-4"
          :class="displayStore.sm ? 'w-75 px-16' : 'w-100'"
          ><span class="ml-3">Twitter X</span></v-btn
        >
      </span>
    </template>
  </v-hover>
</template>
