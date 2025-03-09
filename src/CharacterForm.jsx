import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Container, Typography } from "@mui/material";

export default function CharacterForm({ onCharacterSaved }) {
  const [name, setName] = useState("");
  const [nachname, setNachname] = useState("");
  const [ethnie, setEthnie] = useState("");
  const [info, setInfo] = useState("");

  const handleSaveCharacter = async () => {
    try {
      const docRef = await addDoc(collection(db, "characters"), {
        name,
        nachname,
        ethnie,
        info,
      });
      alert("Charakter gespeichert!");

      // Nach dem Speichern ID zurückgeben
      onCharacterSaved(docRef.id);

      // Reset
      setName("");
      setNachname("");
      setEthnie("");
      setInfo("");
    } catch (error) {
      console.error("Fehler beim Speichern des Charakters:", error);
      alert("Fehler beim Speichern des Charakters. Siehe Konsole.");
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Neuen Charakter erstellen</Typography>
      <TextField label="Vorname" fullWidth value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: '10px' }} />
      <TextField label="Nachname" fullWidth value={nachname} onChange={(e) => setNachname(e.target.value)} style={{ marginBottom: '10px' }} />
      <TextField label="Ethnie" fullWidth value={ethnie} onChange={(e) => setEthnie(e.target.value)} style={{ marginBottom: '10px' }} />
      <TextField label="Infos" fullWidth multiline rows={4} value={info} onChange={(e) => setInfo(e.target.value)} style={{ marginBottom: '10px' }} />
      <Button variant="contained" color="primary" onClick={handleSaveCharacter}>Charakter speichern</Button>
    </Container>
  );
}
