"use client"

export function ComboSystem({ combo, maxCombo, isOnFire, onBwak }: { 
  combo: number, 
  maxCombo: number, 
  isOnFire: boolean, 
  onBwak: () => void 
}) {
  return (
    <div className="absolute bottom-10 w-full flex flex-col items-center gap-4 z-20">
      <div className="text-white text-lg font-mono">Combo: {combo} / {maxCombo}</div>
      <button 
        onClick={onBwak}
        className={`px-8 py-4 font-bold rounded-full transition-all text-xl ${
          isOnFire ? "bg-red-600 text-white animate-pulse" : "bg-orange-600 text-white"
        }`}
      >
        BWAK!
      </button>
    </div>
  )
}