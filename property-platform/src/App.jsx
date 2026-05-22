import { useEffect, useMemo, useState } from 'react'
import './App.css'

const adminAccount = {
  email: 'admin@nyumbake.test',
  password: 'rentals123',
}

const initialProperties = [
  {
    id: 1,
    title: 'Skyline 2 Bed Apartment',
    location: 'Kilimani',
    city: 'Nairobi',
    type: 'Apartment',
    beds: 2,
    baths: 2,
    rent: 95000,
    tag: 'Move-in ready',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Garden Townhouse',
    location: 'Lavington',
    city: 'Nairobi',
    type: 'Townhouse',
    beds: 4,
    baths: 3,
    rent: 260000,
    tag: 'DSQ included',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Beachside Furnished Suite',
    location: 'Nyali',
    city: 'Mombasa',
    type: 'Furnished',
    beds: 1,
    baths: 1,
    rent: 72000,
    tag: 'Short-let friendly',
    image:
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Executive Studio',
    location: 'Upper Hill',
    city: 'Nairobi',
    type: 'Studio',
    beds: 1,
    baths: 1,
    rent: 58000,
    tag: 'CBD access',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    title: 'Family Villa',
    location: 'Karen',
    city: 'Nairobi',
    type: 'House',
    beds: 5,
    baths: 4,
    rent: 430000,
    tag: 'Private compound',
    image:
      'https://images.unsplash.com/photo-1580587771525-76b9b640dbd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    title: 'Lakeside Duplex',
    location: 'Milimani',
    city: 'Kisumu',
    type: 'Duplex',
    beds: 3,
    baths: 3,
    rent: 115000,
    tag: 'Lake views',
    image:
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=80',
  },
]

const formatter = new Intl.NumberFormat('en-KE')

const defaultCrop = {
  x: 50,
  y: 50,
  zoom: 100,
}

const getImageStyle = (property) => {
  const crop = property.imageCrop || defaultCrop
  return {
    objectPosition: `${crop.x}% ${crop.y}%`,
    transform: `scale(${crop.zoom / 100})`,
    transformOrigin: `${crop.x}% ${crop.y}%`,
  }
}

function App() {
  const [properties, setProperties] = useState(() =>
    initialProperties.map((property) => ({
      ...property,
      imageCrop: defaultCrop,
    })),
  )
  const [city, setCity] = useState('All')
  const [maxRent, setMaxRent] = useState('All')
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [editingId, setEditingId] = useState(initialProperties[0].id)
  const [draftProperty, setDraftProperty] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const cityMatch = city === 'All' || property.city === city
      const rentMatch = maxRent === 'All' || property.rent <= Number(maxRent)
      return cityMatch && rentMatch
    })
  }, [city, maxRent, properties])

  const editingProperty = properties.find((property) => property.id === editingId)
  const activeDraft = draftProperty || editingProperty

  useEffect(() => {
    const property = properties.find((item) => item.id === editingId)
    setDraftProperty(property ? { ...property } : null)
    setHasUnsavedChanges(false)
  }, [editingId, properties])

  const updateProperty = (field, value) => {
    setDraftProperty((current) => ({
      ...(current || editingProperty),
      [field]: ['beds', 'baths', 'rent'].includes(field) ? Number(value) : value,
    }))
    setHasUnsavedChanges(true)
  }

  const updateImageCrop = (field, value) => {
    setDraftProperty((current) => ({
      ...(current || editingProperty),
      imageCrop: {
        ...((current || editingProperty).imageCrop || defaultCrop),
        [field]: Number(value),
      },
    }))
    setHasUnsavedChanges(true)
  }

  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      setDraftProperty((current) => ({
        ...(current || editingProperty),
        image: reader.result,
        imageCrop: defaultCrop,
      }))
      setHasUnsavedChanges(true)
    }
    reader.readAsDataURL(file)
  }

  const saveProperty = (event) => {
    event.preventDefault()
    if (!draftProperty) return

    setProperties((current) =>
      current.map((property) =>
        property.id === draftProperty.id ? draftProperty : property,
      ),
    )
    setHasUnsavedChanges(false)
  }

  const resetDraft = () => {
    if (!editingProperty) return
    setDraftProperty({ ...editingProperty })
    setHasUnsavedChanges(false)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if (
      login.email.trim().toLowerCase() === adminAccount.email &&
      login.password === adminAccount.password
    ) {
      setIsAdmin(true)
      setLoginError('')
      return
    }
    setLoginError('Use admin@nyumbake.test / rentals123')
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Nyumba Kenya home">
          <span className="brand-mark">N</span>
          <span>Nyumba Kenya</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#rentals">Rentals</a>
          <a href="#market">Market</a>
          <a href="#admin">Admin</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Verified rentals across Kenya</p>
          <h1>Find a sharper place to live, without the listing noise.</h1>
          <p className="lede">
            Curated apartments, studios, villas, and townhouses for Nairobi,
            Mombasa, Kisumu, and fast-moving urban renters.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#rentals">
              Browse rentals
            </a>
            <a className="secondary-action" href="#contact">
              List property
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Featured rental in Kenya">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80"
            alt="Modern furnished apartment living room"
          />
          <div className="hero-ticket">
            <span>From KES 58k/mo</span>
            <strong>{properties.length} verified homes live</strong>
          </div>
        </div>
      </section>

      <section className="search-band" aria-label="Rental search controls">
        <label>
          City
          <select value={city} onChange={(event) => setCity(event.target.value)}>
            <option>All</option>
            <option>Nairobi</option>
            <option>Mombasa</option>
            <option>Kisumu</option>
          </select>
        </label>
        <label>
          Budget
          <select
            value={maxRent}
            onChange={(event) => setMaxRent(event.target.value)}
          >
            <option value="All">Any rent</option>
            <option value="80000">Up to KES 80k</option>
            <option value="150000">Up to KES 150k</option>
            <option value="300000">Up to KES 300k</option>
          </select>
        </label>
        <div className="result-count">
          <strong>{filtered.length}</strong>
          <span>matched rentals</span>
        </div>
      </section>

      <section className="rentals" id="rentals">
        <div className="section-heading">
          <p className="eyebrow">Live inventory</p>
          <h2>High-signal rentals for Kenyan tenants</h2>
        </div>
        <div className="property-grid">
          {filtered.map((property) => (
            <article className="property-card" key={property.id}>
              <div className="property-media">
                <img
                  src={property.image}
                  alt={property.title}
                  style={getImageStyle(property)}
                />
              </div>
              <div className="property-body">
                <div>
                  <span className="tag">{property.tag}</span>
                  <h3>{property.title}</h3>
                  <p>
                    {property.location}, {property.city}
                  </p>
                </div>
                <div className="property-meta">
                  <span>{property.beds} bed</span>
                  <span>{property.baths} bath</span>
                  <span>{property.type}</span>
                </div>
                <div className="price-row">
                  <strong>KES {formatter.format(property.rent)}</strong>
                  <span>/ month</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin" id="admin">
        <div className="admin-intro">
          <p className="eyebrow">Admin console</p>
          <h2>Edit rentals and update the public interface instantly.</h2>
          <p>
            Dummy login: <strong>{adminAccount.email}</strong> /{' '}
            <strong>{adminAccount.password}</strong>
          </p>
        </div>

        {!isAdmin ? (
          <form className="login-panel" onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={login.email}
                onChange={(event) =>
                  setLogin((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="admin@nyumbake.test"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={login.password}
                onChange={(event) =>
                  setLogin((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                placeholder="rentals123"
              />
            </label>
            {loginError ? <p className="form-error">{loginError}</p> : null}
            <button className="primary-action" type="submit">
              Login
            </button>
          </form>
        ) : (
          <div className="admin-panel">
            <aside className="property-list">
              {properties.map((property) => (
                <button
                  className={property.id === editingId ? 'active' : ''}
                  key={property.id}
                  onClick={() => setEditingId(property.id)}
                  type="button"
                >
                  <span>{property.title}</span>
                  <small>
                    {property.location}, KES {formatter.format(property.rent)}
                  </small>
                </button>
              ))}
            </aside>

            {activeDraft ? (
              <form className="editor" onSubmit={saveProperty}>
                <div className="editor-toolbar">
                  <div>
                    <p className="eyebrow">Editing listing</p>
                    <h3>{activeDraft.title}</h3>
                  </div>
                  <div className="editor-actions">
                    <button
                      className="secondary-action"
                      disabled={!hasUnsavedChanges}
                      onClick={resetDraft}
                      type="button"
                    >
                      Reset
                    </button>
                    <button
                      className="primary-action"
                      disabled={!hasUnsavedChanges}
                      type="submit"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
                <section className="editor-section">
                  <div className="segment-heading">
                    <span>01</span>
                    <h3>Property details</h3>
                  </div>
                  <div className="editor-grid">
                    <label>
                      Title
                      <input
                        value={activeDraft.title}
                        onChange={(event) =>
                          updateProperty('title', event.target.value)
                        }
                      />
                    </label>
                    <label>
                      Location
                      <input
                        value={activeDraft.location}
                        onChange={(event) =>
                          updateProperty('location', event.target.value)
                        }
                      />
                    </label>
                    <label>
                      City
                      <select
                        value={activeDraft.city}
                        onChange={(event) =>
                          updateProperty('city', event.target.value)
                        }
                      >
                        <option>Nairobi</option>
                        <option>Mombasa</option>
                        <option>Kisumu</option>
                        <option>Nakuru</option>
                        <option>Eldoret</option>
                      </select>
                    </label>
                    <label>
                      Type
                      <input
                        value={activeDraft.type}
                        onChange={(event) =>
                          updateProperty('type', event.target.value)
                        }
                      />
                    </label>
                    <label>
                      Beds
                      <input
                        min="0"
                        type="number"
                        value={activeDraft.beds}
                        onChange={(event) =>
                          updateProperty('beds', event.target.value)
                        }
                      />
                    </label>
                    <label>
                      Baths
                      <input
                        min="0"
                        type="number"
                        value={activeDraft.baths}
                        onChange={(event) =>
                          updateProperty('baths', event.target.value)
                        }
                      />
                    </label>
                    <label>
                      Monthly rent
                      <input
                        min="0"
                        type="number"
                        value={activeDraft.rent}
                        onChange={(event) =>
                          updateProperty('rent', event.target.value)
                        }
                      />
                    </label>
                    <label>
                      Badge
                      <input
                        value={activeDraft.tag}
                        onChange={(event) =>
                          updateProperty('tag', event.target.value)
                        }
                      />
                    </label>
                  </div>
                </section>

                <section className="editor-section">
                  <div className="segment-heading">
                    <span>02</span>
                    <h3>Images and crop</h3>
                  </div>
                  <div className="media-editor">
                    <div
                      className="drop-zone"
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        event.preventDefault()
                        handleImageFile(event.dataTransfer.files[0])
                      }}
                    >
                      <input
                        accept="image/*"
                        id="property-image-file"
                        onChange={(event) =>
                          handleImageFile(event.target.files[0])
                        }
                        type="file"
                      />
                      <label htmlFor="property-image-file">
                        <strong>Drop image here</strong>
                        <span>or select from folder</span>
                      </label>
                    </div>

                    <div className="crop-preview">
                      <img
                        src={activeDraft.image}
                        alt={`${activeDraft.title} preview`}
                        style={getImageStyle(activeDraft)}
                      />
                    </div>

                    <div className="crop-controls">
                      <label>
                        Image URL
                        <input
                          value={activeDraft.image}
                          onChange={(event) =>
                            updateProperty('image', event.target.value)
                          }
                        />
                      </label>
                      <label>
                        Horizontal crop
                        <input
                          max="100"
                          min="0"
                          type="range"
                          value={(activeDraft.imageCrop || defaultCrop).x}
                          onChange={(event) =>
                            updateImageCrop('x', event.target.value)
                          }
                        />
                      </label>
                      <label>
                        Vertical crop
                        <input
                          max="100"
                          min="0"
                          type="range"
                          value={(activeDraft.imageCrop || defaultCrop).y}
                          onChange={(event) =>
                            updateImageCrop('y', event.target.value)
                          }
                        />
                      </label>
                      <label>
                        Zoom
                        <input
                          max="150"
                          min="100"
                          type="range"
                          value={(activeDraft.imageCrop || defaultCrop).zoom}
                          onChange={(event) =>
                            updateImageCrop('zoom', event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </section>
                <div className="save-note">
                  {hasUnsavedChanges
                    ? 'Unsaved draft changes. Save to update the public cards.'
                    : 'All changes are saved for this browser session.'}
                </div>
              </form>
            ) : null}
          </div>
        )}
      </section>

      <section className="market" id="market">
        <div>
          <p className="eyebrow">Built for local flow</p>
          <h2>Fast comparisons, clean trust signals, mobile-first browsing.</h2>
        </div>
        <div className="metrics">
          <div>
            <strong>24h</strong>
            <span>listing review target</span>
          </div>
          <div>
            <strong>3</strong>
            <span>core metro markets</span>
          </div>
          <div>
            <strong>0</strong>
            <span>broker spam in the UI</span>
          </div>
        </div>
      </section>

      <footer id="contact">
        <span>Nyumba Kenya</span>
        <strong>Built by TechLead</strong>
        <a href="mailto:hello@nyumbake.test">hello@nyumbake.test</a>
      </footer>
    </main>
  )
}

export default App
