<script setup>
  import { ref } from 'vue';

  import { useWarningStore } from '@/stores/warningsStore';
  import { useDisplayStore } from '@/stores/displayStore';
  import WarningsList from '@/components/template/WarningsList.vue';
  import CreateAlertForm from '@/components/AlertsPage/CreateAlertForm.vue';

  const warningStore = useWarningStore();
  const displayStore = useDisplayStore();

  const warnings = ref(warningStore.warnings)
</script>

<template>
  <v-main class="pa-0 pt-5" :class="displayStore.xs ? 'px-3 py-1' : displayStore.sm ? 'px-5 py-2' : 'px-7 py-3'">
    <TitleSection title="Alertas e Notificações" />

    <v-row class="d-flex justify-center">
      <CreateAlertForm />
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <WarningsList
          :for-items="warnings"
          title="Avisos da Comunidade"
        />
      </v-col>

      <v-col cols="12" md="6">
        <WarningsList
          :for-items="warnings"
          title="Avisos"
        />
      </v-col>
    </v-row>
  </v-main>
</template>
