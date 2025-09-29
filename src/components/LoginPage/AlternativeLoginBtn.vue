<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();

defineProps({
  title: {
    type: String,
    default: "Alternativo",
  },
  iconClass: {
    type: String,
    default: "bi-house",
  },
});
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
          class="`py-1 mb-4"
          :class="displayStore.sm ? 'w-75 px-16' : 'w-100'"
        >
          <i :class="`bi ${iconClass}`"></i>
          <span class="ml-3">{{ title }}</span>
        </v-btn>
      </span>
    </template>
  </v-hover>
</template>
