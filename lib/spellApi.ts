import { Spell, SpellClass } from '@/types/spell'

const API_BASE = 'https://www.dnd5eapi.co/api'

export async function getAllSpells(): Promise<Spell[]> {
  try {
    const response = await fetch(`${API_BASE}/spells`)
    const data = await response.json()
    
    // Fetch full details for each spell
    const spellPromises = data.results.map(async (spell: { index: string; url: string }) => {
      const spellResponse = await fetch(`${API_BASE}${spell.url}`)
      return spellResponse.json()
    })
    
    const spells = await Promise.all(spellPromises)
    return spells
  } catch (error) {
    console.error('Error fetching spells:', error)
    return []
  }
}

export async function getSpellClasses(): Promise<SpellClass[]> {
  try {
    const response = await fetch(`${API_BASE}/classes`)
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error fetching classes:', error)
    return []
  }
}

export function getRecommendedSpells(spells: Spell[], className: string, level: number): Spell[] {
  // Simple recommendation logic - can be enhanced
  const classSpells = spells.filter(spell => 
    spell.classes.some(c => c.index === className) &&
    spell.level <= level
  )
  
  // Prioritize: cantrips (level 0), then lower level spells, then rituals
  return classSpells.sort((a, b) => {
    // Cantrips first
    if (a.level === 0 && b.level !== 0) return -1
    if (b.level === 0 && a.level !== 0) return 1
    
    // Then by level
    if (a.level !== b.level) return a.level - b.level
    
    // Rituals get slight priority
    if (a.ritual && !b.ritual) return -1
    if (b.ritual && !a.ritual) return 1
    
    return 0
  }).slice(0, 20) // Top 20 recommendations
}

