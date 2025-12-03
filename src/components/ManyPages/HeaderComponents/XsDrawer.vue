<script setup>
import { useDisplayStore } from "@/stores/displayStore.js";
import { useMenuStore } from "@/stores/menuStore.js";

const displayStore = useDisplayStore();
const menuStore = useMenuStore();
</script>

<template>
  <v-navigation-drawer
    v-if="displayStore.xs"
    v-model="menuStore.drawer"
    location="top"
    temporary
  >
    <v-img :src="currentGif" @error="handleImageError">
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="alterPage(item.value)"
        >
          {{ item.title }}
        </v-list-item>
      </v-list>
    </v-img>
  </v-navigation-drawer>
</template>
