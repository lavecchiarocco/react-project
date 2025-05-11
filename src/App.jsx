import { useEffect, useState } from "react";
import SearchBar from "./components/search-bar.jsx";
import SongForm from "./components/song-form.jsx";
import SongList from "./components/song-list.jsx";
import './index.css';


function App() {
  const [songs, setSongs] = useState(() => {
  const saved = localStorage.getItem("songs");
  return saved ? JSON.parse(saved) : [];
});
  const [search, setSearch] = useState("");
  const [orderbyRep, setorderbyRep] = useState(false);

  // Cargar desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("songs");

    if (stored) {
      const savedSongs = JSON.parse(stored);

      // Asegurar que cada canción tenga videoId extraído
      const songsWithVideoId = savedSongs.map((song) => {
        const match = song.url.match(
          /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        );
        const videoId = match ? match[1] : null;
        return { ...song, videoId };
      });
      setSongs(songsWithVideoId);
    }
  }, []);

  // Guardar en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  const addSong = (song) => {
    console.log("Agregando canción:", song);
    setSongs((prev) => [...prev, { ...song, playCount: 0 }]);
  };

  const incrementPlayCount = (url) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.url === url ? { ...song, playCount: song.playCount + 1 } : song
      )
    );
  };

  const urlExists = (url) => songs.some((s) => s.url === url);

  // Aplicar búsqueda y ordenamiento directo en render
  const visibleSongs = songs
    .filter((song) =>
      (song.name || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (orderbyRep ? b.playCount - a.playCount : 0));

  return (
   <main className="container-add">
      <h1 className="tit">Reproductor de Canciones</h1>

      <div className="add-song">
        <h2 className="tit-add-song">Agregar Nueva Canción</h2>
        <SongForm addSong={addSong} urlExists={urlExists} />
      </div>

      <div className="container-mysong">
        <div className="container-tit">
          <h2 className="tit-mysong">Mis Canciones</h2>
          <div className="actions-bar">
            <SearchBar setSearch={setSearch} />
            <button onClick={() => setorderbyRep(!orderbyRep)} className={`button-order ${orderbyRep ? "active" : ""}`}>
              {orderbyRep ? "✓ Ordenado por reproducciones" : "Ordenar por reproducciones"}
            </button>
          </div>
        </div>
        <SongList songs={visibleSongs} incrementPlayCount={incrementPlayCount} />
      </div>
    </main>
  );
}

export default App;
