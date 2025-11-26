import { Spell } from '@/types/spell'

interface SpellCardProps {
  spell: Spell
  isRecommended?: boolean
}

export default function SpellCard({ spell, isRecommended }: SpellCardProps) {
  const levelDisplay = spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`
  const schoolName = spell.school.name

  return (
    <div className={`bg-slate-800 rounded-lg p-6 border-2 transition-all hover:shadow-lg ${
      isRecommended 
        ? 'border-purple-500 shadow-purple-500/20' 
        : 'border-slate-700 hover:border-slate-600'
    }`}>
      {isRecommended && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
            RECOMMENDED
          </span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white">{spell.name}</h3>
        <div className="text-right">
          <div className="text-sm font-semibold text-purple-300">{levelDisplay}</div>
          <div className="text-xs text-gray-400">{schoolName}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {spell.classes.map((cls) => (
          <span
            key={cls.index}
            className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded"
          >
            {cls.name}
          </span>
        ))}
        {spell.ritual && (
          <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">
            Ritual
          </span>
        )}
        {spell.concentration && (
          <span className="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
            Concentration
          </span>
        )}
      </div>

      <p className="text-gray-300 text-sm mb-3 line-clamp-3">
        {spell.desc[0]}
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
        <div>
          <span className="font-semibold">Casting Time:</span> {spell.casting_time}
        </div>
        <div>
          <span className="font-semibold">Range:</span> {spell.range}
        </div>
        <div>
          <span className="font-semibold">Duration:</span> {spell.duration}
        </div>
        <div>
          <span className="font-semibold">Components:</span> {spell.components.join(', ')}
        </div>
      </div>
    </div>
  )
}

