import { onMounted } from "vue";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { useWarningStore } from "@/stores/warningsStore";

const warningCollection = collection(db, "warning");

onMounted(async () => {
  const warningStore = useWarningStore();
});

export default class WarningService {
  static async addWarning() {
    try {
      const newWarning = { ...warningStore.newWarning };
      warningCollection.addDoc({ newWarning, createdAt: Timestamp.now() });
    } catch (error) {
      console.error("Error adding warning: ", error);
    }
  }
}