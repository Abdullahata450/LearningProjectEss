'use client'

import {createContext, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './theme'


type ThemeMode = 'light' | 'dark'

type ThemeContexType = {
    mode: ThemeMode,
    toggleTheme: () => void
}


const ThemeContext = createContext<ThemeContexType | null>(null)



export const ThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light')

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem('theme-mode') as ThemeMode | null
    if (saved) setMode(saved)
  }, [])

  // Save theme on change
  useEffect(() => {
    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeMode = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeMode must be used inside ThemeModeProvider')
  return context
}
