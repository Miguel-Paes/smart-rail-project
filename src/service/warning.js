import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { useWarningStore } from "@/stores/warningsStore";

const warningCollection = collection(db, "warning");

export default class WarningService {
  static async addWarning(warningData) {
    try {
      const warningStore = useWarningStore();
      const newWarning = { ...warningData };

      await addDoc(warningCollection, {
        ...newWarning,
        createdAt: Timestamp.now()
      });

      return true;
    } catch (error) {
      console.error("Error adding warning: ", error);
      throw error;
    }
  }
}