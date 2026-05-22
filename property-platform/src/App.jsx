import { useEffect, useState } from 'react'
import './App.css'
import AdminPanel from './components/AdminPanel'
import PublicSite from './components/PublicSite'
import PropertyDetail from './components/PropertyDetail'
import { defaultProperties, defaultSettings } from './data/fallbackContent'
import { fetchContent } from './lib/contentApi'
import { hasSupabaseConfig } from './lib/supabase'

function App() {
  const [settings, setSettings] = useState(defaultSettings)
  const [properties, setProperties] = useState(defaultProperties)
  const [city, setCity] = useState('All')
  const [maxRent, setMaxRent] = useState('All')
  const [loadState, setLoadState] = useState('Loading Supabase content...')

  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash
    if (hash.startsWith('#/admin') || hash === '#admin') return 'admin'
    if (hash.startsWith('#/property/') || hash.startsWith('#property-')) {
      const match = hash.match(/(?:#\/property\/|#property-)(.+)/)
      if (match) return `property:${match[1]}`
    }
    return 'public'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#/admin') || hash === '#admin') {
        setCurrentRoute('admin')
      } else if (hash.startsWith('#/property/') || hash.startsWith('#property-')) {
        const match = hash.match(/(?:#\/property\/|#property-)(.+)/)
        if (match) {
          setCurrentRoute(`property:${match[1]}`)
        } else {
          setCurrentRoute('public')
        }
      } else {
        setCurrentRoute('public')
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

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

  let routeContent = null
  if (currentRoute === 'admin') {
    routeContent = (
      <AdminPanel
        onPropertySaved={handlePropertySaved}
        onSettingsSaved={handleSettingsSaved}
        properties={properties}
        settings={settings}
      />
    )
  } else if (currentRoute.startsWith('property:')) {
    const propertyId = currentRoute.split(':')[1]
    const property = properties.find((p) => String(p.id) === propertyId)
    routeContent = <PropertyDetail property={property} settings={settings} />
  } else {
    routeContent = (
      <PublicSite
        city={city}
        maxRent={maxRent}
        properties={properties}
        setCity={setCity}
        setMaxRent={setMaxRent}
        settings={settings}
      />
    )
  }

  return (
    <main>
      {loadState ? <div className="status-banner">{loadState}</div> : null}
      {routeContent}
    </main>
  )
}

export default App
