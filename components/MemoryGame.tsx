"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const emojis = ["🚀", "💻", "🔒", "⚛️", "🌐", "🤖", "📊", "🧠"]

export function MemoryGame() {
  const [cards, setCards] = useState<string[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ emoji, id: Math.random() }))
    setCards(shuffled.map((card) => card.emoji))
    setFlipped([])
    setSolved([])
  }

  const handleClick = (index: number) => {
    if (flipped.length === 0) {
      setFlipped([index])
    } else if (flipped.length === 1) {
      setDisabled(true)
      if (index !== flipped[0]) {
        setFlipped([...flipped, index])
        if (cards[flipped[0]] === cards[index]) {
          setSolved([...solved, flipped[0], index])
          setFlipped([])
          setDisabled(false)
        } else {
          setTimeout(() => {
            setFlipped([])
            setDisabled(false)
          }, 1000)
        }
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold mb-2">How to Play:</h3>
        <p className="text-sm text-muted-foreground">
          Click on the cards to flip them. Match pairs of emojis to win. Remember the positions and find all pairs!
        </p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((emoji, index) => (
          <Card
            key={index}
            className={`cursor-pointer ${
              flipped.includes(index) || solved.includes(index) ? "bg-primary" : "bg-secondary"
            }`}
            onClick={() => !disabled && !solved.includes(index) && !flipped.includes(index) && handleClick(index)}
          >
            <CardContent className="flex items-center justify-center h-16 text-2xl">
              {flipped.includes(index) || solved.includes(index) ? emoji : "?"}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4 w-full" onClick={initializeGame}>
        Reset Game
      </Button>
    </div>
  )
}

