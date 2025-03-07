import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, TextareaAutosize } from '@mui/material';
import { db } from "./firebase"; // Firebase Konfiguration
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function WikiApp() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    const fetchEntries = async () => {
      const querySnapshot = await getDocs(collection(db, "entries"));
      setEntries(querySnapshot.docs.map(doc => ({ id: doc.id, content: doc.data().content })));
    };
    fetchEntries();
  }, []);

  const addEntry = async () => {
    if (newEntry.trim() !== "") {
      const docRef = await addDoc(collection(db, "entries"), { content: newEntry });
      setEntries([...entries, { id: docRef.id, content: newEntry }]);
      setNewEntry("");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kampagnen-Wiki</h1>
      <div className="mb-4">
        <TextareaAutosize
          placeholder="Neuen Eintrag verfassen..."
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          className="mb-2"
        />
        <Button onClick={addEntry}>Eintrag hinzufügen</Button>
      </div>
      <div>
        {entries.map((entry) => (
          <Card key={entry.id} className="mb-2">
            <CardContent>{entry.content}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
