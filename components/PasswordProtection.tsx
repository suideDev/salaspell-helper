'use client'

import { useState, useEffect } from 'react'

const PASSWORD = 'password1234'
const STORAGE_KEY = 'dnd_spell_authenticated'

export default function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem(STORAGE_KEY)
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-950 via-red-950 to-amber-900">
        <div className="text-dnd-gold text-xl font-cinzel">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-950 via-red-950 to-amber-900 p-4">
        <div className="parchment scroll-border rounded-lg p-8 shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-cinzel font-bold text-center mb-4 text-dnd-red text-shadow-medieval">
            SalaSpell Helper
          </h1>
          <div className="w-24 h-1 bg-dnd-red mx-auto mb-6"></div>
          <p className="text-center font-medieval text-amber-900 mb-6 text-lg">
            Enter the password to access the arcane tome
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-parchment-old text-amber-900 placeholder-amber-700 border-2 border-dnd-brown focus:border-dnd-red focus:outline-none focus:ring-2 focus:ring-dnd-gold font-medieval"
                autoFocus
              />
            </div>
            {error && (
              <div className="text-dnd-red text-sm text-center font-medieval font-semibold">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-dnd-red hover:bg-red-900 text-dnd-gold font-cinzel font-bold py-3 rounded-lg transition-colors duration-200 border-2 border-dnd-brown shadow-lg hover:shadow-xl"
            >
              Enter the Tome
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

