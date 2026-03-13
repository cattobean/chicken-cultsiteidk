"use client"

export function ComboSystem({ combo, maxCombo, isOnFire, onBwak }: { 
  combo: number, 
  maxCombo: number, 
  isOnFire: boolean, 
  onBwak: () => void 
}) {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden border border-orange-900">
        <div 
          className={`h-full transition-all duration-100 ${isOnFire ? "bg-red-500 animate-pulse" : "bg-orange-500"}`}
          style={{ width: `${(combo / maxCombo) * 100}%` }}
        />
      </div>
      <button 
        onClick={onBwak}
        className={`px-12 py-6 text-2xl font-black uppercase rounded-lg border-2 transition-all ${
          isOnFire 
            ? "bg-red-700 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]" 
            : "bg-orange-600 border-orange-400 text-black hover:bg-orange-500"
        }`}
      >
        BWAK!
      </button>
    </div>
  )
}