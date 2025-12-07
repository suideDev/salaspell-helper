'use client'

interface LevelSelectorProps {
  selectedLevel: number
  onLevelChange: (level: number) => void
}

export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  const levels = Array.from({ length: 20 }, (_, i) => i + 1)

  return (
    <div className="mb-8">
      <div className="parchment scroll-border rounded-lg p-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => onLevelChange(level)}
              className={`px-4 py-2 rounded-md font-cinzel font-semibold text-sm transition-all border ${
                selectedLevel === level
                  ? 'bg-red-900 text-dnd-gold shadow-md text-shadow-medieval border-red-800'
                  : 'bg-parchment-old-dark text-dnd-gold border-amber-800 hover:bg-amber-900 hover:text-dnd-gold'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

