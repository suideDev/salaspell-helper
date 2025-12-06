'use client'

import { useState, useEffect, useMemo } from 'react'
import PasswordProtection from '@/components/PasswordProtection'
import SpellCard from '@/components/SpellCard'
import SpellFilters from '@/components/SpellFilters'
import { Spell, SpellClass, SourceBookId, SOURCE_BOOKS } from '@/types/spell'
import { getAllSpells, getSpellClasses, getRecommendedSpells } from '@/lib/spellApi'

const STORAGE_KEY_SOURCES = 'dnd_spell_sources'

export default function Home() {
  const [spells, setSpells] = useState<Spell[]>([])
  const [classes, setClasses] = useState<SpellClass[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedLevel, setSelectedLevel] = useState(9)
  const [selectedSources, setSelectedSources] = useState<SourceBookId[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showRecommended, setShowRecommended] = useState(true)

  // Load saved source books from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SOURCES)
    if (saved) {
      try {
        setSelectedSources(JSON.parse(saved))
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [])

  // Save source books to localStorage
  useEffect(() => {
    if (selectedSources.length > 0) {
      localStorage.setItem(STORAGE_KEY_SOURCES, JSON.stringify(selectedSources))
    }
  }, [selectedSources])

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const [spellsData, classesData] = await Promise.all([
        getAllSpells(),
        getSpellClasses(),
      ])
      setSpells(spellsData)
      setClasses(classesData)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Filter spells
  const filteredSpells = useMemo(() => {
    let filtered = [...spells]

    // Filter by class
    if (selectedClass) {
      filtered = filtered.filter((spell) =>
        spell.classes.some((c) => c.index === selectedClass)
      )
    }

    // Filter by level
    filtered = filtered.filter((spell) => spell.level <= selectedLevel)

    // Filter by source (if sources selected)
    // Note: D&D 5e API doesn't always include source info, so we'll show all if no sources selected
    // or if sources are selected, we'll show all (since API doesn't reliably provide source)
    // In a real implementation, you'd need to map spells to sources manually

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (spell) =>
          spell.name.toLowerCase().includes(query) ||
          spell.desc.some((d) => d.toLowerCase().includes(query)) ||
          spell.school.name.toLowerCase().includes(query)
      )
    }

    return filtered.sort((a, b) => {
      // Sort by level first, then name
      if (a.level !== b.level) return a.level - b.level
      return a.name.localeCompare(b.name)
    })
  }, [spells, selectedClass, selectedLevel, searchQuery])

  // Get recommended spells
  const recommendedSpells = useMemo(() => {
    if (!selectedClass || !showRecommended) return []
    return getRecommendedSpells(spells, selectedClass, selectedLevel)
  }, [spells, selectedClass, selectedLevel, showRecommended])

  const handleSourceToggle = (sourceId: SourceBookId) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-gradient-to-br from-amber-950 via-red-950 to-amber-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="parchment scroll-border rounded-lg p-6 inline-block transform rotate-[-0.5deg]">
              <h1 className="text-5xl font-cinzel font-bold text-dnd-red mb-2 text-shadow-medieval">
                SalaSpell Helper
              </h1>
              <div className="w-32 h-1 bg-dnd-red mx-auto mb-2"></div>
              <p className="font-medieval text-amber-900 text-lg">
                Filter and discover spells by class, level, and source books
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-dnd-gold text-xl py-20 font-cinzel">
              Loading spells from the arcane tome...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <SpellFilters
                  classes={classes}
                  selectedClass={selectedClass}
                  selectedLevel={selectedLevel}
                  selectedSources={selectedSources}
                  onClassChange={setSelectedClass}
                  onLevelChange={setSelectedLevel}
                  onSourceToggle={handleSourceToggle}
                />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Search Bar */}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search spells by name, description, or school..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-parchment-old text-amber-900 placeholder-amber-700 border-2 border-dnd-brown focus:border-dnd-red focus:outline-none focus:ring-2 focus:ring-dnd-gold font-medieval"
                  />
                </div>

                {/* Recommended Section */}
                {showRecommended && selectedClass && recommendedSpells.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl font-cinzel font-bold text-dnd-gold text-shadow-medieval">
                        Recommended Spells
                      </h2>
                      <button
                        onClick={() => setShowRecommended(false)}
                        className="text-sm font-medieval text-amber-200 hover:text-dnd-gold transition-colors"
                      >
                        Hide
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {recommendedSpells.slice(0, 6).map((spell) => (
                        <SpellCard
                          key={spell.index}
                          spell={spell}
                          isRecommended={true}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Spells */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-cinzel font-bold text-dnd-gold text-shadow-medieval">
                    All Spells ({filteredSpells.length})
                  </h2>
                  {!showRecommended && selectedClass && (
                    <button
                      onClick={() => setShowRecommended(true)}
                      className="text-sm font-medieval text-dnd-gold hover:text-yellow-300 transition-colors"
                    >
                      Show Recommendations
                    </button>
                  )}
                </div>

                {filteredSpells.length === 0 ? (
                  <div className="text-center text-amber-200 py-20 font-medieval text-lg">
                    No spells found matching your criteria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredSpells.map((spell) => (
                      <SpellCard key={spell.index} spell={spell} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PasswordProtection>
  )
}

