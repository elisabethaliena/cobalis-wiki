import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, CardContent, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function EntriesPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const querySnapshot = await getDocs(collection(db, "entries"));
      setEntries(querySnapshot.docs.map(doc => ({ id: doc.id, content: doc.data().content })));
    };
    fetchEntries();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Alle Einträge</Typography>
      {entries.map((entry) => (
        <Card key={entry.id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h6">
              <Link to={`/entry/${entry.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {entry.title || "Kein Titel"}
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {entry.date ? new Date(entry.date).toLocaleDateString() : "Kein Datum"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}