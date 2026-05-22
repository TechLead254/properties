export const defaultCrop = {
  x: 50,
  y: 50,
  zoom: 100,
}

export const defaultSettings = {
  id: 'main',
  brand_name: 'Nyumba Kenya',
  logo_image: '',
  hero_eyebrow: 'Verified rentals across Kenya',
  hero_title: 'Find a sharper place to live, without the listing noise.',
  hero_message:
    'Curated apartments, studios, villas, and townhouses for Nairobi, Mombasa, Kisumu, and fast-moving urban renters.',
  hero_image:
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=80',
  primary_cta: 'Browse rentals',
  secondary_cta: 'List property',
  market_eyebrow: 'Built for local flow',
  market_title: 'Fast comparisons, clean trust signals, mobile-first browsing.',
  contact_email: 'hello@nyumbake.test',
  contact_phone: '+254 700 000 000',
  contact_whatsapp: '+254 700 000 000',
  contact_location: 'Nairobi, Kenya',
  footer_credit: 'Built by TechLead',
}

export const defaultProperties = [
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
    image_crop: defaultCrop,
    contact_name: 'Mary Wanjiku',
    contact_phone: '+254 711 000 111',
    contact_email: 'kilimani@nyumbake.test',
    tour_fee: 1000,
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
    image_crop: defaultCrop,
    contact_name: 'David Mwangi',
    contact_phone: '+254 722 000 222',
    contact_email: 'lavington@nyumbake.test',
    tour_fee: 1500,
  },
]
