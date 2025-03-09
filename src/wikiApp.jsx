import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EntriesPage from "./EntriesPage";
import EditorPage from "./EditorPage";
import CharactersPage from "./CharactersPage";
import CharacterDetailPage from "./CharacterDetailPage";
import EntryDetailPage from "./EntryDetailPage";
import { Container, Button } from "@mui/material";

export default function WikiApp() {
  return (
    <Router>
      <Container maxWidth="sm" style={{ marginTop: "20px", textAlign: "center" }}>
        <Button component={Link} to="/" variant="outlined" style={{ marginRight: "10px" }}>Einträge</Button>
        <Button component={Link} to="/editor" variant="outlined" style={{ marginRight: "10px" }}>Neuer Eintrag</Button>
        <Button component={Link} to="/characters" variant="outlined">Charaktere</Button>

        <Routes>
          <Route path="/" element={<EntriesPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/entry/:id" element={<EntryDetailPage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
        </Routes>
      </Container>
    </Router>
  );
}
