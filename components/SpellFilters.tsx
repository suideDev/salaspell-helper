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
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Class
        </label>
        <select
          value={selectedClass}
          onChange={(e) => onClassChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Maximum Spell Level
        </label>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => (
            <option key={level} value={level}>
              {level === 0 ? 'Cantrips Only' : `Level ${level} and below`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-300 mb-2">
          Source Books (Select books you own)
        </label>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {SOURCE_BOOKS.map((book) => (
            <label
              key={book.id}
              className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700/50 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={selectedSources.includes(book.id)}
                onChange={() => onSourceToggle(book.id)}
                className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-300">
                {book.name} ({book.abbreviation})
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

