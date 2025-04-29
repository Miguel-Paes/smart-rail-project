<script setup>
  import { useThemeStore } from '@/stores/themeStore.js'

  const themeStore = useThemeStore()
</script>

<template>
  <header>
    <h1 class="title">Smart Rail</h1>
    <nav>
      <ul>
        <li class="item bi" :class="themeStore.isDark ? 'bi-moon-fill' : 'bi-brightness-high-fill'" @click="themeStore.toggleTheme" />
        <li class="item bi bi-person-circle" />
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: .5rem 1rem;
  align-items: center;
  border-bottom: solid 1px #f0f0f0;
}

.title {
    font-size: 1.5rem;
    font-weight: 700;
}

ul {
  list-style: none;
  display: flex;
  gap: .5rem;
}

.item {
  font-size: 1.3rem;
}
</style>
