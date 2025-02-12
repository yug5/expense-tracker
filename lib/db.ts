import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addTransaction = async (userId: string, amount: number, type: string, category: string,emoji:string) => {
  return await addDoc(collection(db, "transactions"), {
    userId,
    amount,
    type,
    category,
    emoji,
    date: new Date().toISOString(),
  });
};

export const getTransactions = async (userId: string) => {
  const q = query(collection(db, "transactions"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteTransaction = async (id: string) => {
  return await deleteDoc(doc(db, "transactions", id));
};
