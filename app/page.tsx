'use client'

import { useState } from 'react'
import ClassSelector from '@/components/ClassSelector'

export default function Home() {
  const [selectedClass, setSelectedClass] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
      {/* Class Selector Tabs */}
      <ClassSelector selectedClass={selectedClass} onClassChange={setSelectedClass} />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-amber-800 rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-amber-800 rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-amber-800 rotate-45"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center max-w-4xl">
          <div className="parchment scroll-border rounded-lg p-12 mb-8 transform rotate-[-0.5deg]">
            <h1 className="text-7xl font-cinzel font-bold text-dnd-gold mb-6 text-shadow-medieval">
              SalaSpell Helper
            </h1>
            <div className="w-32 h-1 bg-dnd-gold mx-auto mb-6"></div>
          </div>
          
          <div className="parchment scroll-border rounded-lg p-8 transform rotate-[0.5deg]">
            <p className="text-xl font-medieval text-dnd-gold">
              Filter and discover spells by class, level, and source books
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
