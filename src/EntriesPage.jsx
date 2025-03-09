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
        <Card key={entry.id} style={{ marginBottom: "10px" }} component={Link} to={`/entry/${entry.id}`}>
          <CardContent>
            <Typography component="div" dangerouslySetInnerHTML={{ __html: entry.content }} />
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}