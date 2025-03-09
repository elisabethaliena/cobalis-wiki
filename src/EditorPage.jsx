import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { Container, TextField, Button, Typography } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function TextEditorPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [characters, setCharacters] = useState([]); // Temporär lokale Eingaben
  const [characterIds, setCharacterIds] = useState([]); // IDs für Referenzen

  // ✅ Charakter hinzufügen (und in Firebase speichern)
  const handleAddCharacter = async () => {
    const newChar = { name: "", nachname: "", ethnie: "", info: "" };
    setCharacters([...characters, newChar]); // Lokales Formular erweitern

    // Charakter sofort in Firebase speichern und ID merken
    const docRef = await addDoc(collection(db, "characters"), newChar);
    setCharacterIds([...characterIds, docRef.id]);
  };

  // ✅ Eintrag speichern (mit Referenz zu Charakteren)
  const handleSave = async () => {
    try {
      await addDoc(collection(db, "entries"), {
        title,
        date,
        text,
        characterIds, // Nur IDs speichern
      });

      alert("Eintrag erfolgreich gespeichert!");

      // Reset
      setTitle("");
      setDate("");
      setText("");
      setCharacters([]);
      setCharacterIds([]);
    } catch (error) {
      console.error("Fehler beim Speichern: ", error);
      alert("Fehler beim Speichern. Siehe Konsole.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Neuen Eintrag erstellen</Typography>

      <TextField
        label="Titel"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <TextField
        label="Datum"
        type="date"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <ReactQuill
        theme="snow"
        value={text}
        onChange={setText}
        style={{ height: '200px', marginBottom: '20px' }}
      />

      <Button
        variant="outlined"
        onClick={handleAddCharacter}
        style={{ marginRight: '20px' }}
      >
        Charakter hinzufügen
      </Button>

      {characters.map((char, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid gray', padding: '10px', borderRadius: '5px' }}>
          <TextField
            label="Vorname"
            value={char.name}
            onChange={(e) => {
              const updatedChars = [...characters];
              updatedChars[index].name = e.target.value;
              setCharacters(updatedChars);

              // Gleichzeitig updaten in Firebase
              const charRef = doc(db, "characters", characterIds[index]);
              charRef && charRef.id &&
                addDoc(collection(db, "characters"), { ...updatedChars[index] }); // Optional: Update wenn nötig
            }}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Nachname"
            value={char.nachname}
            onChange={(e) => {
              const updatedChars = [...characters];
              updatedChars[index].nachname = e.target.value;
              setCharacters(updatedChars);
            }}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Ethnie"
            value={char.ethnie}
            onChange={(e) => {
              const updatedChars = [...characters];
              updatedChars[index].ethnie = e.target.value;
              setCharacters(updatedChars);
            }}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Infos"
            value={char.info}
            onChange={(e) => {
              const updatedChars = [...characters];
              updatedChars[index].info = e.target.value;
              setCharacters(updatedChars);
            }}
            fullWidth
            style={{ marginTop: '10px' }}
          />
        </div>
      ))}

      <Button variant="contained" color="primary" onClick={handleSave}>
        Eintrag speichern
      </Button>
    </Container>
  );
}
