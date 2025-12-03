<script setup>
import { useWarningStore } from "@/stores/warningsStore";

const WarningStore = useWarningStore();

defineProps({
  title: {
    type: String,
    default: "Avisos",
  },
  items: {
    type: Array,
    default: () => [],
  },
  icons: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["warning-deleted"]);

const deleteWarning = async (id) => {
  const itemToDelete = id;
  console.log("Deletando warning com ID:", itemToDelete);
  try {
    await WarningStore.deleteWarning(id);
    // Emite um evento para notificar o pai que um warning foi removido
    emit("warning-deleted", id);
  } catch (error) {
    console.error("Erro ao deletar warning:", error);
  }
};
</script>

<template>
  <v-card
    class="w-100 h-100 pa-2 rounded rounded-lg"
    color="accent3"
    variant="tonal"
  >
    <v-card-title class="text-center">{{ title }}</v-card-title>

    <v-card-item>
      {{ items.length === 0 ? "Nenhum aviso" : "" }}
    </v-card-item>

    <v-card-item v-for="item in items" :key="item.id">
      <v-row class="d-flex align-center pa-1" no-gutters>
        <v-col cols="11">{{ item.id }}. {{ item.message }}</v-col>
        <v-col cols="1" v-if="icons">
          <v-btn
            variant="none"
            icon="mdi-trash-can"
            @click="deleteWarning(item.id)"
          />
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
