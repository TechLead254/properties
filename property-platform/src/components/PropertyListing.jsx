import { properties } from '../data/properties';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link to={`/property/${property.id}`} className="block hover:shadow-lg transition-shadow duration-300">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative">
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-48 object-cover"
          />
          {!property.available && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white font-semibold">Not Available</span>
            </div>
          )}
          {property.available && (
            <div className="absolute top-3 right-3 flex items-center space-x-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{property.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{property.location}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{property.bedrooms} bed</span>
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{property.bathrooms} bath</span>
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{property.area} sqft</span>
          </div>
          <p className="text-xl font-bold text-gray-900 mb-2">{formatPrice(property.price)}/{property.priceFrequency === 'month' ? 'mo' : 'yr'}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map(amenity => (
              <span key={amenity} className="bg-indigo-50 text-indigo-800 text-xs px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const PropertyListing = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
          <p className="mt-2 text-sm text-gray-500">
            Explore our curated selection of available properties across Kenya
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListing;