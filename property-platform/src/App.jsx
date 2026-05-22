import { useEffect, useState } from 'react'
import './App.css'
import AdminPanel from './components/AdminPanel'
import PublicSite from './components/PublicSite'
import { defaultProperties, defaultSettings } from './data/fallbackContent'
import { fetchContent } from './lib/contentApi'
import { hasSupabaseConfig } from './lib/supabase'

function App() {
  const [settings, setSettings] = useState(defaultSettings)
  const [properties, setProperties] = useState(defaultProperties)
  const [city, setCity] = useState('All')
  const [maxRent, setMaxRent] = useState('All')
  const [loadState, setLoadState] = useState('Loading Supabase content...')

  useEffect(() => {
    let active = true

    async function loadContent() {
      if (!hasSupabaseConfig) {
        setLoadState('Using local fallback content. Supabase env is missing.')
        return
      }

      try {
        const content = await fetchContent()
        if (!active) return
        setSettings(content.settings || defaultSettings)
        setProperties(content.properties?.length ? content.properties : defaultProperties)
        setLoadState('')
      } catch (error) {
        if (!active) return
        setLoadState(`Supabase load failed: ${error.message}`)
      }
    }

    loadContent()

    return () => {
      active = false
    }
  }, [])

  const handleSettingsSaved = (savedSettings) => {
    setSettings(savedSettings)
  }

  const handlePropertySaved = (savedProperty) => {
    setProperties((current) =>
      current.map((property) =>
        property.id === savedProperty.id ? savedProperty : property,
      ),
    )
  }

  return (
    <main>
      {loadState ? <div className="status-banner">{loadState}</div> : null}
      <PublicSite
        city={city}
        maxRent={maxRent}
        properties={properties}
        setCity={setCity}
        setMaxRent={setMaxRent}
        settings={settings}
      />
      <AdminPanel
        onPropertySaved={handlePropertySaved}
        onSettingsSaved={handleSettingsSaved}
        properties={properties}
        settings={settings}
      />
    </main>
  )
}

export default App
