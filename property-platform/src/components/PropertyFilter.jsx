import { useState } from 'react';
import { properties } from '../data/properties';

const PropertyFilter = () => {
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    bedrooms: '',
    availableOnly: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would trigger a search/filter action
    console.log('Filters applied:', filters);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      availableOnly: false
    });
  };

  // Get unique values for filters from the properties data
  const locations = [...new Set(properties.map(p => p.location))];
  const propertyTypes = [...new Set(properties.map(p => p.propertyType))];
  const bedroomOptions = [1, 2, 3, 4, 5];

  return (
    <section className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit} className="space-y-6 sm:grid sm:grid-cols-3 sm:gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 pl-1 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sm:col-span-2 sm:grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Min Price (KES)
              </label>
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handleChange}
                placeholder="Minimum"
                className="block w-full rounded-md border-0 py-1.5 pl-1 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5"
              />
            </div>
            
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Max Price (KES)
              </label>
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleChange}
                placeholder="Maximum"
                className="block w-full rounded-md border-0 py-1.5 pl-1 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          
          <div className="sm:col-span-2 sm:grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={filters.propertyType}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 pl-1 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5"
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 pl-1 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-5"
              >
                <option value="">Any</option>
                {bedroomOptions.map(bed => (
                  <option key={bed} value={bed.toString()}>
                    {bed}+
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="available-only"
                  name="availableOnly"
                  type="checkbox"
                  checked={filters.availableOnly}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-left">
                <label htmlFor="available-only" className="block text-sm font-medium text-gray-900">
                  Show only available properties
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PropertyFilter;