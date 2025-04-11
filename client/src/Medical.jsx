import React, { useState } from 'react';
import Loader from './Loader';

const medicalData = [
  {
    language: 'en',
    type: 'primary-care',
    location: 'nairobi',
    title: 'Primary Care Services in Nairobi',
    content: 'General health checkups, vaccinations, and treatment of common illnesses.',
  },
  {
    language: 'sw',
    type: 'primary-care',
    location: 'nairobi',
    title: 'Huduma za Msingi za Afya Nairobi',
    content: 'Ukaguzi wa jumla wa afya, chanjo, na matibabu ya magonjwa ya kawaida.',
  },
  {
    language: 'en',
    type: 'specialized-clinics',
    location: 'nairobi',
    title: 'Specialized Clinics in Nairobi',
    content: 'Clinics for specific health needs such as cardiology, dermatology, and oncology.',
  },
  {
    language: 'sw',
    type: 'specialized-clinics',
    location: 'nairobi',
    title: 'Kliniki Maalum Nairobi',
    content: 'Kliniki za mahitaji maalum ya afya kama vile magonjwa ya moyo, ngozi, na oncology.',
  },
  {
    language: 'en',
    type: 'mental-health',
    location: 'nairobi',
    title: 'Mental Health Services in Nairobi',
    content: 'Resources for mental wellness, therapy, and psychiatric care.',
  },
  {
    language: 'sw',
    type: 'mental-health',
    location: 'nairobi',
    title: 'Huduma za Afya ya Akili Nairobi',
    content: 'Rasilimali za ustawi wa akili, tiba, na huduma ya akili.',
  },
  // Add the rest of your entries here...
];

const Medical = () => {
  const [language, setLanguage] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const filtered = medicalData.filter(item => {
      return (
        (!language || item.language === language) &&
        (!serviceType || item.type === serviceType) &&
        (!location || item.location === location) &&
        (!query ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.content.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setTimeout(() => {
      setIsLoading(false);
      setResults(filtered);
    }, 3000); // Simulate a 3-second delay
  };

  const handleReset = () => {
    setLanguage('');
    setServiceType('');
    setLocation('');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Health Services</h1>
        <p className="text-gray-700 mb-4">
          Welcome to the Health Services page. Use the filters below to narrow down your search
          by language, service type, and location, or use the search bar to find specific information.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          >
            <option value="">Language</option>
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>

          {/* Service Type Dropdown */}
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          >
            <option value="">All Services</option>
            <option value="primary-care">Primary Care</option>
            <option value="specialized-clinics">Specialized Clinics</option>
            <option value="sexual-health">Sexual Health</option>
            <option value="mental-health">Mental Health</option>
            <option value="addiction-services">Addiction Services</option>
            <option value="community-health">Community Health</option>
            <option value="retail-clinics">Retail Clinics</option>
            <option value="rural-health">Rural Health</option>
          </select>

          {/* Location Dropdown */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          >
            <option value="">All Locations</option>
            <option value="nairobi">Nairobi</option>
            <option value="mombasa">Mombasa</option>
            <option value="kisumu">Kisumu</option>
            <option value="nakuru">Nakuru</option>
          </select>

          {/* Search bar */}
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              placeholder="Search by keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 rounded-md"
            >
              Search
            </button>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md mb-6"
        >
          Reset
        </button>

        {/* Results */}
        {!isLoading && <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Information</h2>
          {results.length === 0 ? (
            <p className="text-gray-600">
              Select language, service type and location, or use the search bar to find information.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {results.map((item, index) => (
                <li key={index} className="py-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-700">{item.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>}

        
        {isLoading && <div className='flex justify-center'>
          <Loader/>
        </div>}
      </div>
    </div>
  );
};

export default Medical;
