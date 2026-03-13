"use client"

import { useState, useRef, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ChickenScene } from "@/components/chicken-scene"
import { ComboSystem } from "@/components/combo-system"

const COMBO_THRESHOLD = 25
const COMBO_DECAY_TIME = 500

export default function ChickenWorship() {
  const [bwakCount, setBwakCount] = useState(0) // Renamed from clickCount
  const [combo, setCombo] = useState(0)
  const [isOnFire, setIsOnFire] = useState(false)
  
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const decayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch initial global bwak count from Supabase
  useEffect(() => {
    async function loadBwaks() {
      const { data, error } = await supabase
        .from("stats")
        .select("clicks") // Keep column name as 'clicks' if that's what's in your DB
        .eq("id", 1)
        .single()
      
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

    // Update Supabase
    supabase.from("stats").update({ clicks: newGlobal }).eq("id", 1).then(() => {
      // Optional: console.log("Bwak recorded!")
    })

    // Decay System
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
        onBwak={handleBwak} // Passed as prop
      />
      
      {/* Global Counter Overlay */}
      <div className="absolute top-5 left-5 text-white font-mono text-2xl z-10">
        Total Global Bwaks: {bwakCount}
      </div>
    </main>
  )
}