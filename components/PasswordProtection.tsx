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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="bg-slate-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-purple-500">
          <h1 className="text-3xl font-bold text-center mb-6 text-white">
            SalaSpell Helper
          </h1>
          <p className="text-center text-gray-300 mb-6">
            Please enter the password to access the spell list
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

