import { useState } from 'react'
import { defaultCrop } from '../data/fallbackContent'

const formatter = new Intl.NumberFormat('en-KE')

const imageStyle = (item) => {
  const crop = item?.image_crop || defaultCrop
  return {
    objectPosition: `${crop.x}% ${crop.y}%`,
    transform: `scale(${crop.zoom / 100})`,
    transformOrigin: `${crop.x}% ${crop.y}%`,
  }
}

const getImages = (property) => {
  const gallery = Array.isArray(property?.images) ? property.images : []
  return gallery.length ? gallery : [property?.image].filter(Boolean)
}

const whatsappUrl = (property) => {
  if (!property?.contact_phone) return ''
  const phone = property.contact_phone.replace(/\D/g, '')
  const normalized = phone.startsWith('0') ? `254${phone.slice(1)}` : phone
  const text = encodeURIComponent(
    `Hi, I am interested in ${property.title} in ${property.location}.`,
  )
  return `https://wa.me/${normalized}?text=${text}`
}

export default function PropertyDetail({ property, settings }) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!property) {
    return (
      <>
        <header className="site-header">
          <a className="brand" href="#/">
            {settings?.logo_image ? (
              <img className="logo-image" src={settings.logo_image} alt="" />
            ) : (
              <span className="brand-mark">{settings?.brand_name?.charAt(0)}</span>
            )}
            <span>{settings?.brand_name}</span>
          </a>
        </header>
        <main style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
          <h2>Property not found</h2>
          <p>The property you're looking for doesn't exist or has been removed.</p>
          <a href="#/" className="primary-action" style={{ display: 'inline-block', marginTop: '20px' }}>Back to rentals</a>
        </main>
      </>
    )
  }

  const selectedImages = getImages(property)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#/" aria-label={`${settings.brand_name} home`}>
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
          <a href="#/admin">Admin</a>
        </nav>
      </header>

      <section className="property-detail" style={{ minHeight: 'calc(100vh - 140px)' }}>
        <div className="detail-shell">
          <a className="close-detail" href="#rentals" style={{ textDecoration: 'none' }}>
            Back to rentals
          </a>
          <div className="detail-gallery">
            <div className="detail-main-image">
              <img
                src={selectedImages[selectedImage]}
                alt={property.title}
                style={imageStyle(property)}
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
            <span className="tag">{property.tag}</span>
            <h2>{property.title}</h2>
            <p>
              {property.location}, {property.city}
            </p>
            <div className="property-meta">
              <span>{property.beds} bed</span>
              <span>{property.baths} bath</span>
              <span>{property.type}</span>
            </div>
            <div className="detail-price">
              <strong>KES {formatter.format(property.rent)}</strong>
              <span>/ month</span>
            </div>
            <div className="enquiry-panel">
              <h3>Enquiry contact</h3>
              <span>{property.contact_name}</span>
              <span>{property.contact_phone}</span>
              <span>{property.contact_email}</span>
              <span>
                Site tour fee: KES {formatter.format(property.tour_fee)}
              </span>
              <a
                className="whatsapp-action"
                href={whatsappUrl(property)}
                rel="noreferrer"
                target="_blank"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.012.261 2.001.761 2.871l-.811 2.96 3.029-.794c.834.455 1.77.695 2.721.696h.003c3.181 0 5.768-2.586 5.768-5.767 0-3.18-2.586-5.767-5.767-5.767zm3.39 8.161c-.146.411-.749.771-1.034.821-.285.05-.638.08-1.042-.05-.256-.083-.585-.183-1.011-.363-1.745-.733-2.875-2.506-2.961-2.62-.087-.115-.705-.934-.705-1.782 0-.847.444-1.264.603-1.433.159-.168.347-.211.463-.211.116 0 .232.001.332.005.105.004.246-.04.385.295.145.348.492 1.201.535 1.29.043.088.072.19.014.307-.058.117-.087.19-.174.292-.087.102-.183.228-.261.307-.087.088-.178.183-.077.357.102.174.452.746.969 1.206.666.593 1.229.777 1.402.864.174.088.275.073.377-.044.101-.117.434-.506.55-.681.116-.174.232-.146.39-.087.159.058 1.012.477 1.186.565.174.088.29.131.333.204.043.073.043.424-.103.835zm-3.39 9.667C5.584 24 .25 18.666.25 12.083.25 9.987.797 7.94 1.838 6.136L.25 0l6.333 1.662c1.746-.953 3.71-1.455 5.703-1.458h.005c6.554 0 11.89 5.335 11.892 11.893a11.821 11.821 0 01-3.48 8.413 11.783 11.783 0 01-8.413 3.486z" />
                </svg>
                <span>WhatsApp enquiry</span>
              </a>
            </div>
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
