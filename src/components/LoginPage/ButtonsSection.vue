<script setup>
import { useDisplayStore } from "@/stores/displayStore";

const displayStore = useDisplayStore();
</script>

<template>
  <AlternativeLoginBtn iconClass="bi-google" title="Goggle" />
  <AlternativeLoginBtn iconClass="bi-facebook" title="Facebook" />
  <AlternativeLoginBtn iconClass="bi-apple" title="Apple" />
  <AlternativeLoginBtn iconClass="bi-twitter-x" title="Twitter X" />
</template>
