import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography, TextareaAutosize, TextField, Container, Paper } from '@mui/material';
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
        <Container maxWidth="sm">
          <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Neuen Eintrag erstellen
            </Typography>
            <TextField
              label="Eintrag"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={addEntry} style={{ marginTop: "10px" }}>
              Speichern
            </Button>
          </Paper>
        </Container>
      </div>
      <div>
        {entries.map((entry) => (
          <Card key={entry.id} style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="body1">{entry.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
