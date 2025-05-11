"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

export default function SearchBar({ setSearch }) {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue)
    }, 300)
    return () => clearTimeout(timer)
  }, [inputValue, setSearch])

  const clearSearch = () => {
    setInputValue("")
    setSearch("")
  }

  return (
    <div className="search-container">
      <div className="search-icon">
        <Search size={16} className="icon" />
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Buscar Canciones..."
      />

      {inputValue && (
        <button onClick={clearSearch} className="clear-button" aria-label="Limpiar búsqueda">
          <X size={16} className="icon" />
        </button>
      )}
    </div>
  )
}
