"use client"

import { useState, useRef, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ChickenScene } from "@/components/chicken-scene"
import { ComboSystem } from "@/components/combo-system"

const COMBO_THRESHOLD = 25
const COMBO_DECAY_TIME = 500

export default function ChickenWorship() {
  const [bwakCount, setBwakCount] = useState(0)
  const [combo, setCombo] = useState(0)
  const [isOnFire, setIsOnFire] = useState(false)
  
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const decayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function loadBwaks() {
      const { data } = await supabase.from("stats").select("clicks").eq("id", 1).single()
      if (data) setBwakCount(data.clicks)
    }
    loadBwaks()
  }, [])

  const handleBwak = () => {
    const newCombo = combo + 1
    const newGlobal = bwakCount + 1
    
    setCombo(newCombo)
    setBwakCount(newGlobal)
    
    if (newCombo >= COMBO_THRESHOLD) setIsOnFire(true)

    supabase.from("stats").update({ clicks: newGlobal }).eq("id", 1)

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
      <ChickenScene isOnFire={isOnFire} bwakCount={bwakCount} />
      <ComboSystem 
        combo={combo} 
        maxCombo={COMBO_THRESHOLD} 
        isOnFire={isOnFire} 
        onBwak={handleBwak} 
      />
      <div className="absolute top-5 left-5 text-white font-mono text-2xl z-10">
        Global Bwaks: {bwakCount}
      </div>
    </main>
  )
}