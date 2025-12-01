import { onMounted } from "vue";
import { collection, addDoc, Timestamp, query, where, getDocs, documentId, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/plugins/firebase";

import { useStationStore } from "@/stores/stationStore";

const stationCollection = collection(db, "station");

export default class StationService {
  static async fetchStations() {
    try {
      const stationStore = useStationStore();
      const q = query(stationCollection, where(documentId(), '!=', 'P5i8KkP5kXWDmGebOlo5'), orderBy('id', 'asc'));
      const snapshot = await getDocs(q);

      stationStore.stations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    } catch (error) {
      console.error("Error fetching stations: ", error);
      throw error;
    }
  }
}
