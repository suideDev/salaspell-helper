'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ClassSelectorProps {
  selectedClass?: string
  onClassChange?: (className: string) => void
}

const CLASSES = [
  { index: 'paladin', name: 'Paladin', path: '/paladin' },
  { index: 'bard', name: 'Bard', path: '/bard' },
  { index: 'warlock', name: 'Warlock', path: '/warlock' },
  { index: 'cleric', name: 'Cleric', path: '/cleric' },
]

export default function ClassSelector({ selectedClass, onClassChange }: ClassSelectorProps) {
  const pathname = usePathname()
  
  // Determine active class from pathname if not provided
  const activeClass = selectedClass || CLASSES.find(cls => pathname === cls.path)?.index || ''
  
  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="parchment scroll-border rounded-lg p-2">
        <div className="flex gap-2">
          <Link href="/">
            <button
              className={`px-4 py-2 rounded-md font-cinzel font-semibold text-sm transition-all border ${
                pathname === '/'
                  ? 'bg-red-900 text-dnd-gold shadow-md text-shadow-medieval border-red-800'
                  : 'bg-parchment-old-dark text-dnd-gold border-amber-800 hover:bg-amber-900 hover:text-dnd-gold'
              }`}
            >
              Home
            </button>
          </Link>
          {CLASSES.map((cls) => (
            <Link key={cls.index} href={cls.path}>
              <button
                className={`px-4 py-2 rounded-md font-cinzel font-semibold text-sm transition-all border ${
                  pathname === cls.path || activeClass === cls.index
                    ? 'bg-red-900 text-dnd-gold shadow-md text-shadow-medieval border-red-800'
                    : 'bg-parchment-old-dark text-dnd-gold border-amber-800 hover:bg-amber-900 hover:text-dnd-gold'
                }`}
              >
                {cls.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

