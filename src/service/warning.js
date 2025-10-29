import { collection, addDoc, getDocs, query, where, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { useWarningStore } from "@/stores/warningsStore";

export const createWarningFromStore = async () => {
  try {
    // Usando o store como ponte entre front-end e back-end
    const warningStore = useWarningStore();
    const warningCollection = collection(db, "warning");

    // Validação dos campos obrigatórios
    if (!warningStore.newWarning.message?.trim()) {
      throw new Error("Message is required");
    }

    // Validação do objeto duration
    if (!warningStore.newWarning.duration ||
      !warningStore.newWarning.duration.start ||
      !warningStore.newWarning.duration.end) {
      throw new Error("Duration with start and end dates is required");
    }

    // Preparar os dados para o Firestore
    const warningData = {
      message: warningStore.newWarning.message,
      notification_type: warningStore.newWarning.notification_type || "",
      station: warningStore.newWarning.station,
      from_user: warningStore.newWarning.from_user !== undefined ? warningStore.newWarning.from_user : true,
      id: warningStore.newWarning.id || -1,
      // Converter as datas para Firestore Timestamp
      duration: {
        start: Timestamp.fromDate(new Date(warningStore.newWarning.duration.start)),
        end: Timestamp.fromDate(new Date(warningStore.newWarning.duration.end))
      },
    };

    // Adicionar documento ao Firestore
    const docRef = await addDoc(warningCollection, warningData);

    console.log("Warning created with ID: ", docRef.id);

    // Opcional: Atualizar o store com o ID retornado
    warningStore.setCreatedWarningId(docRef.id);

    return docRef.id;

  } catch (error) {
    console.error("Error creating warning from store: ", error);
    throw error;
  }
};

// Função auxiliar para converter Timestamp do Firestore para Date
export const convertTimestampsToDates = (warningDoc) => {
  const data = warningDoc.data();
  return {
    id: warningDoc.id,
    ...data,
    duration: {
      start: data.duration?.start?.toDate() || new Date(),
      end: data.duration?.end?.toDate() || new Date()
    },
    created_at: data.created_at?.toDate() || new Date()
  };
};

// Função para buscar todos os warnings
export const getWarnings = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "warning"));
    const warnings = [];

    querySnapshot.forEach((doc) => {
      warnings.push(convertTimestampsToDates(doc));
    });

    return warnings;
  } catch (error) {
    console.error("Error getting warnings: ", error);
    throw error;
  }
};