"use client"

export function ComboSystem({ combo, maxCombo, isOnFire, onBwak }: { 
  combo: number, 
  maxCombo: number, 
  isOnFire: boolean, 
  onBwak: () => void 
}) {
  return (
    <div className="absolute bottom-10 w-full flex justify-center z-20">
      <button 
        onClick={onBwak}
        className="px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-500 transition-all text-xl"
      >
        BWAK!
      </button>
    </div>
  )
}