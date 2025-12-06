'use client'

import { SpellClass, SourceBookId, SOURCE_BOOKS } from '@/types/spell'

interface SpellFiltersProps {
  classes: SpellClass[]
  selectedClass: string
  selectedLevel: number
  selectedSources: SourceBookId[]
  onClassChange: (className: string) => void
  onLevelChange: (level: number) => void
  onSourceToggle: (sourceId: SourceBookId) => void
}

export default function SpellFilters({
  classes,
  selectedClass,
  selectedLevel,
  selectedSources,
  onClassChange,
  onLevelChange,
  onSourceToggle,
}: SpellFiltersProps) {
  return (
    <div className="parchment scroll-border rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-cinzel font-bold text-dnd-red mb-4 text-center border-b-2 border-dnd-brown pb-2">
        Filter Spells
      </h2>
      
      <div>
        <label className="block text-sm font-cinzel font-semibold text-dnd-brown mb-2">
          Class
        </label>
        <select
          value={selectedClass}
          onChange={(e) => onClassChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-parchment-old text-amber-900 border-2 border-dnd-brown focus:border-dnd-red focus:outline-none focus:ring-2 focus:ring-dnd-gold font-medieval"
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls.index} value={cls.index}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-cinzel font-semibold text-dnd-brown mb-2">
          Maximum Spell Level
        </label>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg bg-parchment-old text-amber-900 border-2 border-dnd-brown focus:border-dnd-red focus:outline-none focus:ring-2 focus:ring-dnd-gold font-medieval"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
            <option key={level} value={level}>
              {level === 0 ? 'Cantrips Only' : `Level ${level} and below`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-cinzel font-semibold text-dnd-brown mb-2">
          Source Books (Select books you own)
        </label>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {SOURCE_BOOKS.map((book) => (
            <label
              key={book.id}
              className="flex items-center space-x-2 cursor-pointer hover:bg-parchment-old p-2 rounded border border-transparent hover:border-dnd-brown transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedSources.includes(book.id)}
                onChange={() => onSourceToggle(book.id)}
                className="w-4 h-4 text-dnd-red bg-parchment-old border-dnd-brown rounded focus:ring-dnd-gold accent-dnd-red"
              />
              <span className="text-sm font-medieval text-amber-900">
                {book.name} ({book.abbreviation})
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

