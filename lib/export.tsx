import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Your Firebase config
import { saveAs } from "file-saver"; // For saving files

export async function exportData() {
  try {
    const querySnapshot = await getDocs(collection(db, "transactions"));
    const transactions = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        type: data.type,
        amount: data.amount,
        emoji: data.emoji || "", 
        category: data.category,
        date: data.date?.toDate().toLocaleDateString() || "N/A", 
      };
    });

    const csvContent = [
      ["Type", "Amount", "Emoji", "Category", "Date"],
      ...transactions.map((t) => [t.type, t.amount, t.emoji, t.category, t.date]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "transactions.csv");

    console.log("Export successful");
  } catch (error) {
    console.error("Error exporting data:", error);
  }
}
