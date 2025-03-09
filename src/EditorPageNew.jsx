import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Container, TextField, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditorPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [characters, setCharacters] = useState([]); // Liste aller verfügbaren Charaktere
  const [selectedCharacterIds, setSelectedCharacterIds] = useState([]); // IDs der ausgewählten Charaktere

  // 🔄 Alle Charaktere laden
  useEffect(() => {
    const fetchCharacters = async () => {
      const querySnapshot = await getDocs(collection(db, "characters"));
      const chars = [];
      querySnapshot.forEach((doc) => {
        chars.push({ id: doc.id, ...doc.data() });
      });
      setCharacters(chars);
    };
    fetchCharacters();
  }, []);

  // ✅ Entry speichern
  const handleSaveEntry = async () => {
    try {
      await addDoc(collection(db, "entries"), {
        title,
        date,
        text,
        characterIds: selectedCharacterIds, // Nur IDs speichern
      });
      alert("Eintrag gespeichert!");

      // Reset
      setTitle("");
      setDate("");
      setText("");
      setSelectedCharacterIds([]);
    } catch (error) {
      console.error("Fehler beim Speichern des Eintrags:", error);
      alert("Fehler beim Speichern des Eintrags.");
    }
  };

  // ✅ Charaktere auswählen
  const handleCharacterSelect = (id) => {
    setSelectedCharacterIds((prev) =>
      prev.includes(id) ? prev.filter((charId) => charId !== id) : [...prev, id]
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Neuen Eintrag erstellen</Typography>

      <TextField
        label="Titel"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <TextField
        label="Datum"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <ReactQuill
        value={text}
        onChange={setText}
        theme="snow"
        style={{ marginBottom: "20px", height: "200px" }}
      />

      <Typography variant="h6" gutterBottom>Charaktere auswählen</Typography>
      {characters.map((char) => (
        <FormControlLabel
          key={char.id}
          control={
            <Checkbox
              checked={selectedCharacterIds.includes(char.id)}
              onChange={() => handleCharacterSelect(char.id)}
            />
          }
          label={`${char.name} ${char.nachname}`}
        />
      ))}

      <Button variant="contained" color="primary" onClick={handleSaveEntry}>
        Eintrag speichern
      </Button>
    </Container>
  );
}
