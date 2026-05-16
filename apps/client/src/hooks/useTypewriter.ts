import { useState, useEffect, useRef } from 'react'

/**
 * useTypewriter — Simulates character-by-character text reveal.
 * Extracted from Landing hero component.
 *
 * @param texts - Array of strings to cycle through
 * @param speed - ms between characters (default 60)
 * @param pause - ms to hold completed text before cycling (default 2000)
 */
export function useTypewriter(texts: string[], speed = 60, pause = 2000): string {
  const [display, setDisplay] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const currentText = texts[textIndex] ?? ''

    if (!isDeleting && charIndex < currentText.length) {
      // Typing forward
      timeoutRef.current = setTimeout(() => {
        setDisplay(currentText.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      }, speed)
    } else if (!isDeleting && charIndex === currentText.length) {
      // Pause at end
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && charIndex > 0) {
      // Deleting
      timeoutRef.current = setTimeout(() => {
        setDisplay(currentText.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      }, speed / 2)
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      setIsDeleting(false)
      setTextIndex(i => (i + 1) % texts.length)
    }

    return () => clearTimeout(timeoutRef.current)
  }, [charIndex, isDeleting, textIndex, texts, speed, pause])

  return display
}
