
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

export default function Modal({ enabled, onClose, children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!enabled || !mounted) {
    return null
  }

  return createPortal(
    <div className="container">
      <main className="wrapper">
        <section className="content">{children}</section>
        <button onClick={onClose} className="btn-close">
          X
        </button>
      </main>
    </div>,
    document.body,
  )
}
