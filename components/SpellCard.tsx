import { Spell } from '@/types/spell'

interface SpellCardProps {
  spell: Spell
  isRecommended?: boolean
}

export default function SpellCard({ spell, isRecommended }: SpellCardProps) {
  const levelDisplay = spell.level === 0 ? 'Cantrip' : `Level ${spell.level}`
  const schoolName = spell.school.name

  return (
    <div className={`parchment scroll-border rounded-lg p-6 transition-all hover:scale-[1.02] hover:shadow-2xl transform ${
      isRecommended 
        ? 'ring-4 ring-dnd-gold ring-opacity-50' 
        : ''
    }`}>
      {isRecommended && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-cinzel font-bold text-ink-gold bg-dnd-gold/20 px-3 py-1 rounded border border-amber-800">
            ⭐ RECOMMENDED
          </span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4 border-b-2 border-amber-800 pb-3">
        <h3 className="text-2xl font-cinzel font-bold text-ink-gold">{spell.name}</h3>
        <div className="text-right">
          <div className="text-sm font-cinzel font-semibold text-amber-300">{levelDisplay}</div>
          <div className="text-xs font-medieval text-amber-400 italic">{schoolName}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {spell.classes.map((cls) => (
          <span
            key={cls.index}
            className="text-xs font-medieval bg-amber-900/30 text-amber-300 px-3 py-1 rounded border border-amber-700"
          >
            {cls.name}
          </span>
        ))}
        {spell.ritual && (
          <span className="text-xs font-medieval bg-green-900/40 text-green-300 px-3 py-1 rounded border border-green-600">
            Ritual
          </span>
        )}
        {spell.concentration && (
          <span className="text-xs font-medieval bg-yellow-900/40 text-yellow-300 px-3 py-1 rounded border border-yellow-600">
            Concentration
          </span>
        )}
      </div>

      <p className="font-medieval text-amber-200 text-sm mb-4 line-clamp-3 leading-relaxed">
        {spell.desc[0]}
      </p>

      <div className="grid grid-cols-2 gap-3 text-xs font-medieval text-amber-200 border-t-2 border-amber-800 pt-3">
        <div>
          <span className="font-cinzel font-semibold text-ink-gold-soft">Casting Time:</span> {spell.casting_time}
        </div>
        <div>
          <span className="font-cinzel font-semibold text-ink-gold-soft">Range:</span> {spell.range}
        </div>
        <div>
          <span className="font-cinzel font-semibold text-ink-gold-soft">Duration:</span> {spell.duration}
        </div>
        <div>
          <span className="font-cinzel font-semibold text-ink-gold-soft">Components:</span> {spell.components.join(', ')}
        </div>
      </div>
    </div>
  )
}

