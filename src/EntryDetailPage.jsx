import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, Typography, Container, Button } from "@mui/material";
import DOMPurify from 'dompurify';

export default function EntryDetailPage() {
  const { id } = useParams(); // Holt die ID aus der URL
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      const docRef = doc(db, "entries", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEntry(docSnap.data());
      }
    };
    fetchEntry();
  }, [id]);

  if (!entry) return <Typography variant="h6">Lädt...</Typography>;

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>{entry.title}</Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {entry.date ? new Date(entry.date).toLocaleDateString() : "Kein Datum"}
          </Typography>
          <div
            style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(entry.content) }}
          ></div>
        </CardContent>
      </Card>

      {Array.isArray(entry.characters) && entry.characters.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <Typography variant="h5" gutterBottom>Charaktere in diesem Eintrag:</Typography>
          {entry.characters.map((character, index) => (
            <Card key={index} style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6">{character?.name || "Unbekannt"} {character?.nachname || ""}</Typography>
                <Typography variant="body2"><strong>Ethnie:</strong> {character?.ethnie || "Nicht angegeben"}</Typography>
                <Typography variant="body2"><strong>Infos:</strong> {character?.info || "Keine Infos vorhanden."}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Button component={Link} to="/" variant="outlined" style={{ marginTop: "20px" }}>
        Zurück zur Liste
      </Button>
    </Container>
  );
}
