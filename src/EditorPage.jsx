import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Button, Container, Typography, Paper } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { debounce } from "lodash";

export default function EditorPage() {
  const [newEntry, setNewEntry] = useState("");
  const [entryId, setEntryId] = useState(null); // ID des gespeicherten Eintrags

  // Speichern mit Verzögerung (Auto-Save)
  const saveEntry = debounce(async (content) => {
    if (!entryId) {
      const docRef = await addDoc(collection(db, "entries"), { content });
      setEntryId(docRef.id); // Speichere die ID für spätere Updates
    } else {
      await setDoc(doc(db, "entries", entryId), { content });
    }
  }, 500);

  const handleTextChange = (content) => {
    setNewEntry(content);
    saveEntry(content);
  };

  const insertCharacter = async () => {
    const characterData = {
      name: "Unbekannt",
      nachname: "Unbekannt",
      ethnie: "Unbekannt",
      info: "Kurzbeschreibung",
    };

    const docRef = await addDoc(collection(db, "characters"), characterData);

    const characterHTML = `
      <div style="border: 2px solid #007bff; padding: 10px; margin: 10px 0; border-radius: 5px;">
        <strong>Name:</strong> ${characterData.name} <br>
        <strong>Nachname:</strong> ${characterData.nachname} <br>
        <strong>Ethnie:</strong> ${characterData.ethnie} <br>
        <strong>Infos:</strong> ${characterData.info}
      </div>`;

    setNewEntry(prev => prev + characterHTML);
    saveEntry(newEntry + characterHTML);
  };

  const customToolbar = (
    <div id="toolbar">
      <button onClick={insertCharacter} style={{ margin: "5px", padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}>
        Charakter einfügen
      </button>
    </div>
  );

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>Neuen Eintrag erstellen</Typography>
        {customToolbar}
        <ReactQuill
          value={newEntry}
          onChange={handleTextChange}
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                ["clean"],
                [{ insert: "character" }]
              ],
            }
          }}
        />
      </Paper>
    </Container>
  );
}
