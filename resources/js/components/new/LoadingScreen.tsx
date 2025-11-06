"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    // Check initial theme from localStorage
    const currentTheme = localStorage.getItem('theme') as 'dark' | 'light'
    setTheme(currentTheme || 'light')

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-colors duration-300">
      <img
        src={theme === 'dark' ? '/logo-dark.png' : '/logo-light.png'}
        alt="Loading Logo"
        className="w-40 h-40 animate-spin-slow"
      />
      <p className="mt-4 text-primary font-semibold text-lg transition-colors">
        Loading...
      </p>
    </div>
  )
}
