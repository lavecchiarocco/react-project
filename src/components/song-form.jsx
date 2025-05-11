import { useState } from "react";

export default function SongForm({ addSong, urlExists }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateYoutubeUrl = (url) => {
    // Validar que sea una URL de YouTube
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return youtubeRegex.test(url);
  };

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validar campos
    if (!name.trim()) {
      setError("El nombre de la canción es obligatorio");
      return;
    }
    if (!url.trim()) {
      setError("La URL de YouTube es obligatoria");
      return;
    }
    // Validar formato de URL
    if (!validateYoutubeUrl(url)) {
      setError("La URL debe ser de YouTube (youtube.com o youtu.be)");
      return;
    }
    // Verificar si la URL ya existe
    if (urlExists(url)) {
      setError("Esta canción ya ha sido agregada");
      return;
    }

    // Extraer el ID del video
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("No se pudo extraer el ID del video");
      return;
    }
    // Agregar la canción
    addSong({ name, url, videoId, playCount: 0 });

    // Limpiar el formulario
    setName("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name"> Nombre de la cancion</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Numb - Linkin Park"
        />
      </div>

      <div className="form-group">
        <label htmlFor="url"> URL de youtube</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=kXYiU_JCYtU"
        />
      </div>
      {error && <div className="error">{error}</div>}

      <button type="submit" className="submit-button">
        Agregar Canción
      </button>
    </form>
  );
}
