
import { useState, useEffect } from "react"

export default function SearchBar({ setSearch }) {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue)
    }, 300)
    return () => clearTimeout(timer)
  }, [inputValue, setSearch])



  return (
   <div className="search-container">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Buscar Canciones..."
      />
    </div>
  )
}
