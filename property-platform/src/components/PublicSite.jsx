import { useState } from 'react'
import { defaultCrop } from '../data/fallbackContent'

const formatter = new Intl.NumberFormat('en-KE')

const imageStyle = (item) => {
  const crop = item.image_crop || item.imageCrop || defaultCrop
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

const whatsappUrl = (property) => {
  const phone = property.contact_phone.replace(/\D/g, '')
  const normalized = phone.startsWith('0') ? `254${phone.slice(1)}` : phone
  const text = encodeURIComponent(
    `Hi, I am interested in ${property.title} in ${property.location}.`,
  )
  return `https://wa.me/${normalized}?text=${text}`
}

export default function PublicSite({
  settings,
  properties,
  city,
  maxRent,
  setCity,
  setMaxRent,
}) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  const filtered = properties.filter((property) => {
    const cityMatch = city === 'All' || property.city === city
    const rentMatch = maxRent === 'All' || property.rent <= Number(maxRent)
    return cityMatch && rentMatch
  })

  const openProperty = (property) => {
    setSelectedProperty(property)
    setSelectedImage(0)
    window.location.hash = `property-${property.id}`
  }

  const closeProperty = () => {
    setSelectedProperty(null)
    setSelectedImage(0)
    window.location.hash = 'rentals'
  }

  const selectedImages = selectedProperty ? getImages(selectedProperty) : []

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${settings.brand_name} home`}>
          {settings.logo_image ? (
            <img className="logo-image" src={settings.logo_image} alt="" />
          ) : (
            <span className="brand-mark">{settings.brand_name.charAt(0)}</span>
          )}
          <span>{settings.brand_name}</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#rentals">Rentals</a>
          <a href="#market">Market</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{settings.hero_eyebrow}</p>
          <h1>{settings.hero_title}</h1>
          <p className="lede">{settings.hero_message}</p>
          <div className="hero-actions">
            <a className="primary-action" href="#rentals">
              {settings.primary_cta}
            </a>
            <a className="secondary-action" href="#contact">
              {settings.secondary_cta}
            </a>
          </div>
        </div>
        <div className="hero-visual" aria-label="Featured rental in Kenya">
          <img src={settings.hero_image} alt="" />
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
            {[...new Set(properties.map((property) => property.city))].map(
              (cityName) => (
                <option key={cityName}>{cityName}</option>
              ),
            )}
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
                  src={getImages(property)[0]}
                  alt={property.title}
                  style={imageStyle(property)}
                />
                {getImages(property).length > 1 ? (
                  <span className="gallery-count">
                    {getImages(property).length} photos
                  </span>
                ) : null}
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
                <div className="contact-strip">
                  <span>{property.contact_name}</span>
                  <span>{property.contact_phone}</span>
                  <span>Tour KES {formatter.format(property.tour_fee)}</span>
                </div>
                <div className="price-row">
                  <strong>KES {formatter.format(property.rent)}</strong>
                  <span>/ month</span>
                </div>
                <div className="card-actions">
                  <button type="button" onClick={() => openProperty(property)}>
                    View details
                  </button>
                  <a
                    aria-label={`WhatsApp ${property.contact_name}`}
                    href={whatsappUrl(property)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    WA
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedProperty ? (
        <section className="property-detail" id={`property-${selectedProperty.id}`}>
          <div className="detail-shell">
            <button className="close-detail" onClick={closeProperty} type="button">
              Close
            </button>
            <div className="detail-gallery">
              <div className="detail-main-image">
                <img
                  src={selectedImages[selectedImage]}
                  alt={selectedProperty.title}
                  style={imageStyle(selectedProperty)}
                />
              </div>
              {selectedImages.length > 1 ? (
                <div className="thumb-strip">
                  {selectedImages.map((image, index) => (
                    <button
                      className={index === selectedImage ? 'active' : ''}
                      key={image}
                      onClick={() => setSelectedImage(index)}
                      type="button"
                    >
                      <img src={image} alt="" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="detail-content">
              <span className="tag">{selectedProperty.tag}</span>
              <h2>{selectedProperty.title}</h2>
              <p>
                {selectedProperty.location}, {selectedProperty.city}
              </p>
              <div className="property-meta">
                <span>{selectedProperty.beds} bed</span>
                <span>{selectedProperty.baths} bath</span>
                <span>{selectedProperty.type}</span>
              </div>
              <div className="detail-price">
                <strong>KES {formatter.format(selectedProperty.rent)}</strong>
                <span>/ month</span>
              </div>
              <div className="enquiry-panel">
                <h3>Enquiry contact</h3>
                <span>{selectedProperty.contact_name}</span>
                <span>{selectedProperty.contact_phone}</span>
                <span>{selectedProperty.contact_email}</span>
                <span>
                  Site tour fee: KES {formatter.format(selectedProperty.tour_fee)}
                </span>
                <a
                  className="whatsapp-action"
                  href={whatsappUrl(selectedProperty)}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp enquiry
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="market" id="market">
        <div>
          <p className="eyebrow">{settings.market_eyebrow}</p>
          <h2>{settings.market_title}</h2>
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
        <span>{settings.brand_name}</span>
        <strong>{settings.footer_credit}</strong>
        <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>
        <span>{settings.contact_phone}</span>
        <span>{settings.contact_location}</span>
      </footer>
    </>
  )
}
