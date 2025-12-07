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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black">
        <div className="text-dnd-gold text-xl font-cinzel">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
        <div className="parchment scroll-border rounded-lg p-8 shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-cinzel font-bold text-center mb-4 text-dnd-gold text-shadow-medieval">
            SalaSpell Helper
          </h1>
          <div className="w-24 h-1 bg-dnd-gold mx-auto mb-6"></div>
          <p className="text-center font-medieval text-dnd-gold mb-6 text-lg">
            Enter the password to access the arcane tome
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-parchment-old-dark text-amber-200 placeholder-amber-500 border-2 border-amber-800 focus:border-dnd-gold focus:outline-none focus:ring-2 focus:ring-dnd-gold font-medieval"
                autoFocus
              />
            </div>
            {error && (
              <div className="text-dnd-gold text-sm text-center font-medieval font-semibold">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-red-900 hover:bg-red-800 text-dnd-gold font-cinzel font-bold py-3 rounded-lg transition-colors duration-200 border-2 border-amber-800 shadow-lg hover:shadow-xl"
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

