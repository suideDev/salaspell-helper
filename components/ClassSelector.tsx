'use client'

interface ClassSelectorProps {
  selectedClass: string
  onClassChange: (className: string) => void
}

const CLASSES = [
  { index: 'paladin', name: 'Paladin' },
  { index: 'bard', name: 'Bard' },
  { index: 'warlock', name: 'Warlock' },
  { index: 'cleric', name: 'Cleric' },
]

export default function ClassSelector({ selectedClass, onClassChange }: ClassSelectorProps) {
  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="parchment scroll-border rounded-lg p-2">
        <div className="flex gap-2">
          {CLASSES.map((cls) => (
            <button
              key={cls.index}
              onClick={() => onClassChange(selectedClass === cls.index ? '' : cls.index)}
              className={`px-4 py-2 rounded-md font-cinzel font-semibold text-sm transition-all border ${
                selectedClass === cls.index
                  ? 'bg-red-900 text-ink-gold shadow-md text-shadow-medieval border-red-800'
                  : 'bg-parchment-old-dark text-ink-gold-soft border-amber-800 hover:bg-amber-900 hover:text-ink-gold'
              }`}
            >
              {cls.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

