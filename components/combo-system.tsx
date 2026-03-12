"use client"

import { useEffect, useState, useCallback, useRef } from "react"

interface ComboSystemProps {
  combo: number
  maxCombo: number
  isOnFire: boolean
  onCluck: () => void
}

export function ComboSystem({ combo, maxCombo, isOnFire, onCluck }: ComboSystemProps) {
  const [shake, setShake] = useState(false)
  const [flash, setFlash] = useState(false)

  const comboPercentage = (combo / maxCombo) * 100
  
  const handleCluck = useCallback(() => {
    setShake(true)
    setFlash(true)
    onCluck()
    setTimeout(() => setShake(false), 100)
    setTimeout(() => setFlash(false), 50)
  }, [onCluck])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault()
        handleCluck()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleCluck])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col items-center justify-between p-8">
      {/* Top title */}
      <div className="text-center">
        <h1
          className={`text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider transition-all duration-300 ${
            isOnFire
              ? "text-orange-500 animate-pulse drop-shadow-[0_0_30px_rgba(255,100,0,0.8)]"
              : "text-white"
          } ${shake ? "animate-shake" : ""}`}
          style={{
            textShadow: isOnFire
              ? "0 0 20px #ff4400, 0 0 40px #ff4400, 0 0 60px #ff2200"
              : "0 0 10px rgba(255,255,255,0.3)",
          }}
        >
          CLUCK CLUCK
        </h1>
        <p
          className={`text-lg md:text-xl mt-2 transition-colors ${
            isOnFire ? "text-orange-400" : "text-neutral-400"
          }`}
        >
          WORSHIP THE CHICKEN
        </p>
      </div>

      {/* Combo counter */}
      <div className="absolute top-1/4 right-8 text-right">
        <div
          className={`text-6xl md:text-8xl font-black transition-all duration-150 ${
            flash ? "scale-125" : "scale-100"
          } ${isOnFire ? "text-orange-500" : "text-white"}`}
          style={{
            textShadow: isOnFire
              ? "0 0 30px #ff4400, 0 0 60px #ff2200"
              : "none",
          }}
        >
          {combo}
        </div>
        <div className="text-xl text-neutral-500 uppercase tracking-widest">
          combo
        </div>
        {isOnFire && (
          <div className="text-2xl md:text-3xl font-bold text-orange-400 animate-pulse mt-2">
            SUPERCHARGED
          </div>
        )}
      </div>

      {/* Combo bar */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 h-64 w-4 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={`absolute bottom-0 w-full rounded-full transition-all duration-100 ${
            isOnFire
              ? "bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400"
              : "bg-gradient-to-t from-neutral-600 to-white"
          }`}
          style={{
            height: `${comboPercentage}%`,
            boxShadow: isOnFire ? "0 0 20px #ff4400" : "none",
          }}
        />
      </div>

      {/* Bottom instruction */}
      <div className="text-center">
        <button
          onClick={handleCluck}
          className={`pointer-events-auto px-12 py-6 text-2xl md:text-3xl font-bold uppercase tracking-widest transition-all duration-200 border-2 ${
            isOnFire
              ? "bg-orange-600/20 border-orange-500 text-orange-400 hover:bg-orange-500/30 shadow-[0_0_30px_rgba(255,100,0,0.5)]"
              : "bg-white/5 border-white/20 text-white hover:bg-white/10"
          } ${shake ? "scale-95" : "scale-100"}`}
        >
          CLUCK
        </button>
        <p className="text-neutral-500 mt-4 text-sm">
          CLICK OR PRESS SPACE TO WORSHIP
        </p>
        <p className="text-neutral-600 text-xs mt-1">
          DRAG TO ROTATE THE HOLY CHICKEN
        </p>
      </div>

      {/* Screen flash effect */}
      {flash && (
        <div
          className={`fixed inset-0 pointer-events-none ${
            isOnFire ? "bg-orange-500/20" : "bg-white/10"
          }`}
        />
      )}
    </div>
  )
}
