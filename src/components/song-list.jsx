import React, { useState } from "react";
import SongItem from "./song-item";
import Modal from "./song-modal";

export default function SongList({ songs = [], incrementPlayCount }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlay = (song) => {
    setCurrentSong(song);
    setIsModalOpen(true);
    incrementPlayCount(song.url);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {songs.length === 0 ? (
        <div className="no-songs-message">
          No hay canciones guardadas. ¡Agrega una!
        </div>
      ) : (
        <ul className="song-list">
          {songs.map((song) => (
            <SongItem
              key={song.url}
              song={song}
              onPlay={() => handlePlay(song)}
            />
          ))}
        </ul>
      )}

      {isModalOpen && currentSong && (
        <Modal enabled={isModalOpen} onClose={closeModal}>
          <h2 className="tit-modal">{currentSong.name}</h2>
          <p className="text-modal">ID del video: {currentSong.videoId}</p>
          <div className="video-container">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${currentSong.videoId}`}
              title={currentSong.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Modal>
      )}
    </div>
  );
}
