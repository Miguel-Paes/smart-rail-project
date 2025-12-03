<script setup>
import { ref, watch } from "vue";
import { useTheme } from "vuetify";

import { useThemeStore } from "@/stores/themeStore";
import { useMenuStore } from "@/stores/menuStore";

import ColorDialog from "@/components/ManyPages/HeaderComponents/ColorSwitcher.vue";
import DesktopDrawer from "@/components/ManyPages/HeaderComponents/DesktopDrawer.vue";
import XsDrawer from "@/components/ManyPages/HeaderComponents/XsDrawer.vue";

const themeStore = useThemeStore();
const menuStore = useMenuStore();
const theme = useTheme();

const gifMap = ref({
  lime: "/images/menu_gifs/lime.gif",
  red: "/images/menu_gifs/red.gif",
  yellow: "/images/menu_gifs/yellow.gif",
  brown: "/images/menu_gifs/brown.gif",
  blue: "/images/menu_gifs/blue.gif",
  green: "/images/menu_gifs/green.gif",
  purple: "/images/menu_gifs/purple.gif",
  pink: "/images/menu_gifs/pink.gif",
  cyan: "/images/menu_gifs/cyan.gif",
  orange: "/images/menu_gifs/orange.gif",
});

watch(
  () => themeStore.themeColor,
  (newColor) => {
    const isDark = themeStore.isDark;
    theme.global.name.value = `${newColor}${isDark ? "Dark" : "Light"}`;
  },
  { immediate: true }
);

watch(
  () => themeStore.currentTheme,
  (newTheme) => {
    theme.global.name.value = newTheme;
  },
  { immediate: true }
);
</script>

<template>
  <v-app-bar color="darken4">
    <v-img
      :src="
        themeStore.isDark
          ? '/images/logos/light_rounded.png'
          : '/images/logos/dark_rounded.png'
      "
      max-height="50"
      max-width="50"
      class="ml-2"
      @click.stop="menuStore.toggleDrawer()"
    />

    <v-toolbar-title>Smart Rail</v-toolbar-title>

    <ColorDialog />

    <v-btn
      :icon="themeStore.isDark ? 'bi bi-moon' : 'bi bi-brightness-high-fill'"
      variant="text"
      @click="themeStore.toggleTheme()"
    />
    <v-btn icon="bi bi-person-circle" variant="text" />
  </v-app-bar>

  <DesktopDrawer />

  <XsDrawer />
</template>

<style scoped>
.switch_lateral {
  position: relative;
  left: 25%;
}

.dialog_center {
  position: center;
  left: 35%;
}
</style>
