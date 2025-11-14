import { query, getDocs, collection, orderBy, limit } from "firebase/firestore";
import { db } from "@/plugins/firebase";

const warningCollection = collection(db, "warning");

export async function getNextId() {
  // Pega o documento com maior 'id' da coleção
  const q = query(warningCollection, orderBy('id', 'desc'), limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return 1; // nenhum documento, começa com 1
  }

  const maxId = snapshot.docs[0].data().id;
  return maxId + 1;
}
