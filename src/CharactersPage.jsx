import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { Container, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CharactersPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const querySnapshot = await getDocs(collection(db, "characters"));
      const charList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCharacters(charList);
    };
    fetchCharacters();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>Charaktere</Typography>

      <Grid container spacing={2}>
        {characters.map((char) => (
          <Grid item xs={12} sm={6} md={4} key={char.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{char.name} {char.nachname}</Typography>
                <Typography variant="body2"><strong>Ethnie:</strong> {char.ethnie}</Typography>
                <Typography variant="body2"><strong>Infos:</strong> {char.info}</Typography>
                <Button component={Link} to={`/character/${char.id}`} variant="outlined" style={{ marginTop: "10px" }}>
                  Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button component={Link} to="/" variant="contained" style={{ marginTop: "20px" }}>
        Zurück zur Übersicht
      </Button>
    </Container>
  );
}
