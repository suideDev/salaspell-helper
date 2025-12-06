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
          <span className="text-xs font-cinzel font-bold text-dnd-red bg-dnd-gold/30 px-3 py-1 rounded border border-dnd-brown">
            ⭐ RECOMMENDED
          </span>
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4 border-b-2 border-dnd-brown pb-3">
        <h3 className="text-2xl font-cinzel font-bold text-dnd-red">{spell.name}</h3>
        <div className="text-right">
          <div className="text-sm font-cinzel font-semibold text-dnd-brown">{levelDisplay}</div>
          <div className="text-xs font-medieval text-amber-800 italic">{schoolName}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {spell.classes.map((cls) => (
          <span
            key={cls.index}
            className="text-xs font-medieval bg-dnd-brown/20 text-dnd-brown px-3 py-1 rounded border border-dnd-brownLight"
          >
            {cls.name}
          </span>
        ))}
        {spell.ritual && (
          <span className="text-xs font-medieval bg-green-800/30 text-green-800 px-3 py-1 rounded border border-green-700">
            Ritual
          </span>
        )}
        {spell.concentration && (
          <span className="text-xs font-medieval bg-yellow-800/30 text-yellow-800 px-3 py-1 rounded border border-yellow-700">
            Concentration
          </span>
        )}
      </div>

      <p className="font-medieval text-amber-900 text-sm mb-4 line-clamp-3 leading-relaxed">
        {spell.desc[0]}
      </p>

      <div className="grid grid-cols-2 gap-3 text-xs font-medieval text-amber-900 border-t-2 border-dnd-brown pt-3">
        <div>
          <span className="font-cinzel font-semibold text-dnd-red">Casting Time:</span> {spell.casting_time}
        </div>
        <div>
          <span className="font-cinzel font-semibold text-dnd-red">Range:</span> {spell.range}
        </div>
        <div>
          <span className="font-cinzel font-semibold text-dnd-red">Duration:</span> {spell.duration}
        </div>
        <div>
          <span className="font-cinzel font-semibold text-dnd-red">Components:</span> {spell.components.join(', ')}
        </div>
      </div>
    </div>
  )
}

