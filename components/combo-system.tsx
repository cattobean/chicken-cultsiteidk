"use client"

export function ComboSystem({ combo, maxCombo, isOnFire, onBwak }: any) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="text-4xl font-black text-yellow-400 uppercase tracking-widest">
        {combo > 20 ? "BWAK MODE ACTIVATED" : "Bwak Meter"}
      </div>
      <button 
        onClick={onBwak}
        className="text-6xl p-10 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl hover:scale-110 transition-transform active:rotate-12"
      >
        BWAK!
      </button>
    </div>
  )
}