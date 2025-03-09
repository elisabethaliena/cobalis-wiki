import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      const docRef = doc(db, "characters", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCharacter(docSnap.data());
      }
    };
    fetchCharacter();
  }, [id]);

  if (!character) return <Typography variant="h6">Lädt...</Typography>;

  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h4">{character.name} {character.nachname}</Typography>
          <Typography variant="body1"><strong>Ethnie:</strong> {character.ethnie}</Typography>
          <Typography variant="body1"><strong>Infos:</strong> {character.info}</Typography>
        </CardContent>
      </Card>

      <Button component={Link} to="/characters" variant="outlined" style={{ marginTop: "20px" }}>
        Zurück zur Charakterliste
      </Button>
    </Container>
  );
}
