import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Card, CardContent, Typography, Container, Button } from "@mui/material";

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
          <Typography variant="h5" gutterBottom>Eintrag Detail</Typography>
          <Typography variant="body1">dangerouslySetInnerHTML={{ __html: entry.content }}</Typography>
        </CardContent>
      </Card>
      <Button component={Link} to="/" variant="outlined" style={{ marginTop: "20px" }}>
        Zurück zur Liste
      </Button>
    </Container>
  );
}
