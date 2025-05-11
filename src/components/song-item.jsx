"use client"
import { Play } from "lucide-react"

export default function SongItem({ song, onPlay }) {
  return (
    <li className="song-item">
      <div className="song-info">
        <h3>{song.name}</h3>
      </div>

      <div className="song-actions">
        <span>
          {song.playCount} {song.playCount === 1 ? "reproducción" : "reproducciones"}
        </span>
        <button onClick={onPlay} className="play-button" aria-label="Reproducir">
          <Play size={18} />
        </button>
      </div>
    </li>
  )
}
