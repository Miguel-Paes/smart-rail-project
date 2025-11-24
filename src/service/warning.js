import { onMounted } from "vue";
import { collection, addDoc, Timestamp, query, where, getDocs, documentId, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { useWarningStore } from "@/stores/warningsStore";
import { getNextId } from './getNextId.js';

const warningCollection = collection(db, "warning");

export default class WarningService {
  static async addWarning(warningData) {
    try {
      const nextId = await getNextId();
      const newWarning = { ...warningData };

      await addDoc(warningCollection, {
        ...newWarning,
        id: nextId,
        createdAt: Timestamp.now()
      });

      return true;
    } catch (error) {
      console.error("Error adding warning: ", error);
      throw error;
    }
  }

  static async fetchWarnings() {
    try {
      const warningStore = useWarningStore();
      const q = query(warningCollection, where(documentId(), '!=', '7PHxW4mCnbjJ2vRXlYzA'), orderBy('id', 'asc'));
      const snapshot = await getDocs(q);

      warningStore.warnings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    } catch (error) {
      console.error("Error fetching warnings: ", error);
      throw error;
    }
  }

  static async removeWarning(warningId) {
    try {
      const q = query(warningCollection, where('id', '==', warningId));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      const warningStore = useWarningStore();
      warningStore.removeWarning(warningId);

      return true;
    }
    catch (error) {
      console.error("Error removing warning: ", error);
      throw error;
    }
  }
}
