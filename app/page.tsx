"use client"

import { useState, useRef, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ChickenScene } from "@/components/chicken-scene"
import { ComboSystem } from "@/components/combo-system"

const COMBO_THRESHOLD = 25
const COMBO_DECAY_TIME = 500

export default function ChickenWorship() {
  const [clickCount, setClickCount] = useState(0)
  const [combo, setCombo] = useState(0)
  const [isOnFire, setIsOnFire] = useState(false)
  
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const decayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch initial click count from Supabase
  useEffect(() => {
    async function loadClicks() {
      const { data } = await supabase.from("stats").select("clicks").eq("id", 1).single()
      if (data) setClickCount(data.clicks)
    }
    loadClicks()
  }, [])

  const handleCluck = () => {
    const newCombo = combo + 1
    const newGlobal = clickCount + 1
    
    setCombo(newCombo)
    setClickCount(newGlobal)
    
    if (newCombo >= COMBO_THRESHOLD) setIsOnFire(true)

    // Update Supabase non-blockingly
    supabase.from("stats").update({ clicks: newGlobal }).eq("id", 1)

    // V1 Decay System
    if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current)
    if (decayIntervalRef.current) clearInterval(decayIntervalRef.current)

    decayTimeoutRef.current = setTimeout(() => {
      decayIntervalRef.current = setInterval(() => {
        setCombo(prev => {
          const next = Math.max(0, prev - 1)
          if (next < COMBO_THRESHOLD) setIsOnFire(false)
          return next
        })
      }, 100)
    }, COMBO_DECAY_TIME)
  }

  return (
    <main className="w-full h-screen bg-black">
      <ChickenScene isOnFire={isOnFire} clickCount={clickCount} />
      <ComboSystem combo={combo} maxCombo={COMBO_THRESHOLD} isOnFire={isOnFire} onCluck={handleCluck} />
    </main>
  )
}