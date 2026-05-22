import { useEffect, useState } from 'react'
import { defaultCrop } from '../data/fallbackContent'
import { saveProperty, saveSettings, uploadMedia } from '../lib/contentApi'

const adminAccount = {
  email: 'admin@nyumbake.test',
  password: 'rentals123',
}

const formatter = new Intl.NumberFormat('en-KE')

const imageStyle = (item) => {
  const crop = item.image_crop || defaultCrop
  return {
    objectPosition: `${crop.x}% ${crop.y}%`,
    transform: `scale(${crop.zoom / 100})`,
    transformOrigin: `${crop.x}% ${crop.y}%`,
  }
}

const getImages = (property) => {
  const gallery = Array.isArray(property.images) ? property.images : []
  return gallery.length ? gallery : [property.image].filter(Boolean)
}

function ImageDrop({ label, image, previewAlt, onUpload }) {
  const [busy, setBusy] = useState(false)

  const handleFile = async (file) => {
    if (!file) return
    setBusy(true)
    try {
      await onUpload(file)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="media-drop-group">
      <div
        className="drop-zone"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          handleFile(event.dataTransfer.files[0])
        }}
      >
        <input
          accept="image/*"
          id={label.replace(/\s+/g, '-').toLowerCase()}
          onChange={(event) => handleFile(event.target.files[0])}
          type="file"
        />
        <label htmlFor={label.replace(/\s+/g, '-').toLowerCase()}>
          <strong>{busy ? 'Uploading...' : label}</strong>
          <span>Drop image or select from folder</span>
        </label>
      </div>
      {image ? (
        <div className="crop-preview">
          <img src={image} alt={previewAlt} />
        </div>
      ) : null}
    </div>
  )
}

export default function AdminPanel({
  settings,
  properties,
  onSettingsSaved,
  onPropertySaved,
}) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [login, setLogin] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [editingId, setEditingId] = useState(properties[0]?.id)
  const [settingsDraft, setSettingsDraft] = useState(settings)
  const [propertyDraft, setPropertyDraft] = useState(properties[0])
  const [status, setStatus] = useState('')

  useEffect(() => {
    setSettingsDraft(settings)
  }, [settings])

  useEffect(() => {
    const property = properties.find((item) => item.id === editingId)
    setPropertyDraft(property || properties[0])
  }, [editingId, properties])

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

  const updateSettings = (field, value) => {
    setSettingsDraft((current) => ({ ...current, [field]: value }))
  }

  const updateProperty = (field, value) => {
    setPropertyDraft((current) => ({
      ...current,
      [field]: ['beds', 'baths', 'rent', 'tour_fee'].includes(field)
        ? Number(value)
        : value,
    }))
  }

  const addGalleryImage = (url) => {
    setPropertyDraft((current) => {
      const images = getImages(current)
      return {
        ...current,
        image: images.length ? current.image : url,
        images: [...images, url],
      }
    })
  }

  const makeCoverImage = (image) => {
    setPropertyDraft((current) => ({
      ...current,
      image,
      images: [image, ...getImages(current).filter((item) => item !== image)],
    }))
  }

  const removeGalleryImage = (image) => {
    setPropertyDraft((current) => {
      const nextImages = getImages(current).filter((item) => item !== image)
      return {
        ...current,
        image: current.image === image ? nextImages[0] || '' : current.image,
        images: nextImages,
      }
    })
  }

  const updateCrop = (field, value) => {
    setPropertyDraft((current) => ({
      ...current,
      image_crop: {
        ...(current.image_crop || defaultCrop),
        [field]: Number(value),
      },
    }))
  }

  const saveSite = async (event) => {
    event.preventDefault()
    setStatus('Saving site content...')
    const saved = await saveSettings(settingsDraft)
    onSettingsSaved(saved)
    setStatus('Site content saved.')
  }

  const saveListing = async (event) => {
    event.preventDefault()
    setStatus('Saving property...')
    const saved = await saveProperty(propertyDraft)
    onPropertySaved(saved)
    setStatus('Property saved.')
  }

  if (!isAdmin) {
    return (
      <section className="admin" id="admin">
        <div className="admin-intro">
          <p className="eyebrow">Admin console</p>
          <h2>Manage persisted listings, images, contact details, and copy.</h2>
          <p>
            Dummy login: <strong>{adminAccount.email}</strong> /{' '}
            <strong>{adminAccount.password}</strong>
          </p>
        </div>
        <form className="login-panel" onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={login.email}
              onChange={(event) =>
                setLogin((current) => ({ ...current, email: event.target.value }))
              }
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
            />
          </label>
          {loginError ? <p className="form-error">{loginError}</p> : null}
          <button className="primary-action" type="submit">
            Login
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className="admin" id="admin">
      <div className="admin-intro">
        <p className="eyebrow">Admin console</p>
        <h2>Clean controls for the public site and property inventory.</h2>
        {status ? <p className="save-note">{status}</p> : null}
      </div>

      <div className="admin-workspace">
        <form className="editor" onSubmit={saveSite}>
          <div className="editor-toolbar">
            <div>
              <p className="eyebrow">Site content</p>
              <h3>Brand, hero, contact and footer</h3>
            </div>
            <button className="primary-action" type="submit">
              Save site
            </button>
          </div>

          <section className="editor-section">
            <div className="segment-heading">
              <span>01</span>
              <h3>Brand assets</h3>
            </div>
            <div className="editor-grid">
              <label>
                Brand name
                <input
                  value={settingsDraft.brand_name}
                  onChange={(event) =>
                    updateSettings('brand_name', event.target.value)
                  }
                />
              </label>
              <ImageDrop
                image={settingsDraft.logo_image}
                label="Change logo"
                previewAlt="Logo preview"
                onUpload={async (file) => {
                  const url = await uploadMedia(file, 'logos')
                  updateSettings('logo_image', url)
                }}
              />
            </div>
          </section>

          <section className="editor-section">
            <div className="segment-heading">
              <span>02</span>
              <h3>Homepage hero</h3>
            </div>
            <div className="editor-grid">
              <label>
                Eyebrow
                <input
                  value={settingsDraft.hero_eyebrow}
                  onChange={(event) =>
                    updateSettings('hero_eyebrow', event.target.value)
                  }
                />
              </label>
              <label>
                Headline
                <input
                  value={settingsDraft.hero_title}
                  onChange={(event) =>
                    updateSettings('hero_title', event.target.value)
                  }
                />
              </label>
              <label className="wide-field">
                Message
                <textarea
                  value={settingsDraft.hero_message}
                  onChange={(event) =>
                    updateSettings('hero_message', event.target.value)
                  }
                />
              </label>
              <ImageDrop
                image={settingsDraft.hero_image}
                label="Change jumbo image"
                previewAlt="Hero preview"
                onUpload={async (file) => {
                  const url = await uploadMedia(file, 'hero')
                  updateSettings('hero_image', url)
                }}
              />
            </div>
          </section>

          <section className="editor-section">
            <div className="segment-heading">
              <span>03</span>
              <h3>Contact and footer</h3>
            </div>
            <div className="editor-grid">
              {[
                ['contact_email', 'Email'],
                ['contact_phone', 'Phone'],
                ['contact_whatsapp', 'WhatsApp'],
                ['contact_location', 'Office location'],
                ['footer_credit', 'Footer credit'],
              ].map(([field, label]) => (
                <label key={field}>
                  {label}
                  <input
                    value={settingsDraft[field]}
                    onChange={(event) => updateSettings(field, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>
        </form>

        <div className="admin-panel">
          <aside className="property-list">
            {properties.map((property) => (
              <button
                className={property.id === propertyDraft?.id ? 'active' : ''}
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

          {propertyDraft ? (
            <form className="editor" onSubmit={saveListing}>
              <div className="editor-toolbar">
                <div>
                  <p className="eyebrow">Property editor</p>
                  <h3>{propertyDraft.title}</h3>
                </div>
                <button className="primary-action" type="submit">
                  Save property
                </button>
              </div>

              <section className="editor-section">
                <div className="segment-heading">
                  <span>01</span>
                  <h3>Listing details</h3>
                </div>
                <div className="editor-grid">
                  {[
                    ['title', 'Title', 'text'],
                    ['location', 'Location', 'text'],
                    ['city', 'City', 'text'],
                    ['type', 'Property type', 'text'],
                    ['beds', 'Beds', 'number'],
                    ['baths', 'Baths', 'number'],
                    ['rent', 'Monthly rent', 'number'],
                    ['tag', 'Badge', 'text'],
                  ].map(([field, label, type]) => (
                    <label key={field}>
                      {label}
                      <input
                        min={type === 'number' ? '0' : undefined}
                        type={type}
                        value={propertyDraft[field]}
                        onChange={(event) =>
                          updateProperty(field, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              </section>

              <section className="editor-section">
                <div className="segment-heading">
                  <span>02</span>
                  <h3>Enquiry and tour</h3>
                </div>
                <div className="editor-grid">
                  {[
                    ['contact_name', 'Contact person', 'text'],
                    ['contact_phone', 'Contact phone', 'text'],
                    ['contact_email', 'Contact email', 'email'],
                    ['tour_fee', 'Site tour fee', 'number'],
                  ].map(([field, label, type]) => (
                    <label key={field}>
                      {label}
                      <input
                        min={type === 'number' ? '0' : undefined}
                        type={type}
                        value={propertyDraft[field]}
                        onChange={(event) =>
                          updateProperty(field, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              </section>

              <section className="editor-section">
                <div className="segment-heading">
                  <span>03</span>
                  <h3>Property image</h3>
                </div>
                <div className="media-editor">
                  <ImageDrop
                    image=""
                    label="Add property image"
                    previewAlt=""
                    onUpload={async (file) => {
                      const url = await uploadMedia(file, 'properties')
                      addGalleryImage(url)
                    }}
                  />
                  <div className="crop-preview">
                    <img
                      src={getImages(propertyDraft)[0]}
                      alt={`${propertyDraft.title} preview`}
                      style={imageStyle(propertyDraft)}
                    />
                  </div>
                  <div className="gallery-editor">
                    {getImages(propertyDraft).map((image, index) => (
                      <div className="gallery-editor-item" key={`${image}-${index}`}>
                        <img src={image} alt="" />
                        <div>
                          <button
                            type="button"
                            onClick={() => makeCoverImage(image)}
                          >
                            Make cover
                          </button>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(image)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="crop-controls">
                    {[
                      ['x', 'Horizontal crop', 0, 100],
                      ['y', 'Vertical crop', 0, 100],
                      ['zoom', 'Zoom', 100, 150],
                    ].map(([field, label, min, max]) => (
                      <label key={field}>
                        {label}
                        <input
                          max={max}
                          min={min}
                          type="range"
                          value={(propertyDraft.image_crop || defaultCrop)[field]}
                          onChange={(event) => updateCrop(field, event.target.value)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  )
}
