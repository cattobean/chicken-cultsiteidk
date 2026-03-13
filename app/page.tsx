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

  const handleBwak = async () => {
    const newCombo = combo + 1
    const newGlobal = bwakCount + 1
    
    setCombo(newCombo)
    setBwakCount(newGlobal)
    
    if (newCombo >= COMBO_THRESHOLD) setIsOnFire(true)

    // Sync to Supabase
    await supabase.from("stats").update({ clicks: newGlobal }).eq("id", 1)

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
    <main className="w-full h-screen bg-black text-white p-4 flex flex-col items-center justify-between">
      <header className="w-full flex justify-between items-center border-b border-orange-900 pb-4">
        <h1 className="text-3xl font-bold text-orange-500">THE BWAK CULT</h1>
        <div className="text-xl font-mono">Global Bwaks: {bwakCount}</div>
      </header>

      <div className="w-full h-[60vh] relative">
        <ChickenScene isOnFire={isOnFire} bwakCount={bwakCount} />
      </div>

      <footer className="w-full">
        <ComboSystem 
          combo={combo} 
          maxCombo={COMBO_THRESHOLD} 
          isOnFire={isOnFire} 
          onBwak={handleBwak} 
        />
        <div className="text-center text-sm text-gray-500 pt-4 italic">
          Sacrifice your sanity for the bwak.
        </div>
      </footer>
    </main>
  )
}