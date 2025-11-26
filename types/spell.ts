export interface Spell {
  index: string
  name: string
  level: number
  school: {
    index: string
    name: string
  }
  classes: Array<{
    index: string
    name: string
  }>
  subclasses?: Array<{
    index: string
    name: string
  }>
  desc: string[]
  higher_level?: string[]
  range: string
  components: string[]
  material?: string
  ritual: boolean
  duration: string
  concentration: boolean
  casting_time: string
  damage?: {
    damage_type?: {
      index: string
      name: string
    }
  }
  source?: string
}

export interface SpellClass {
  index: string
  name: string
}

export const SOURCE_BOOKS = [
  { id: 'phb', name: "Player's Handbook", abbreviation: 'PHB' },
  { id: 'xge', name: "Xanathar's Guide to Everything", abbreviation: 'XGE' },
  { id: 'tce', name: "Tasha's Cauldron of Everything", abbreviation: 'TCE' },
  { id: 'ftd', name: 'Fizban\'s Treasury of Dragons', abbreviation: 'FTD' },
  { id: 'scc', name: 'Strixhaven: A Curriculum of Chaos', abbreviation: 'SCC' },
  { id: 'egw', name: 'Explorer\'s Guide to Wildemount', abbreviation: 'EGW' },
  { id: 'mtf', name: 'Mordenkainen\'s Tome of Foes', abbreviation: 'MTF' },
  { id: 'vrm', name: 'Van Richten\'s Guide to Ravenloft', abbreviation: 'VRM' },
  { id: 'scag', name: 'Sword Coast Adventurer\'s Guide', abbreviation: 'SCAG' },
  { id: 'ggr', name: 'Guildmasters\' Guide to Ravnica', abbreviation: 'GGR' },
] as const

export type SourceBookId = typeof SOURCE_BOOKS[number]['id']

