import React, { useState } from 'react';
import Loader from './Loader';

const transportData = [
  {
    language: 'en', type: 'matatu', route: 'nairobi-cbd',
    title: 'Matatu Nairobi CBD Route Information',
    content: 'Details about Matatu routes to Nairobi CBD: stages, fares, and typical travel times.',
  },
  {
    language: 'en', type: 'bus', route: 'nairobi-cbd',
    title: 'Bus Schedule for Nairobi CBD',
    content: 'Bus timings and information for Nairobi CBD.',
  },
  {
    language: 'sw', type: 'matatu', route: 'nairobi-cbd',
    title: 'Taarifa za Ruti za Matatu Nairobi CBD',
    content: 'Maelezo kuhusu ruti za Matatu kwenda Nairobi CBD: vituo, nauli, na muda wa kawaida wa safari.',
  },
  {
    language: 'en', type: 'train', route: 'mombasa-road',
    title: 'Train Service Along Mombasa Road',
    content: 'Information about the train service: routes, and stops along Mombasa Road.',
  },
  {
    language: 'sw', type: 'train', route: 'mombasa-road',
    title: 'Huduma ya Treni Kando ya Barabara ya Mombasa',
    content: 'Habari kuhusu huduma ya treni: njia, na vituo kando ya Barabara ya Mombasa.',
  },
  {
    language: 'en', type: 'uber', route: 'kawangware',
    title: 'Uber/Taxi Fares to Kawangware',
    content: 'Typical Uber and taxi fares and availability for trips to Kawangware.',
  },
  {
    language: 'sw', type: 'uber', route: 'kawangware',
    title: 'Nauli za Uber/Teksi kwenda Kawangware',
    content: 'Nauli za kawaida za Uber na teksi na upatikanaji wa safari za kwenda Kawangware.',
  },
  // Add more as needed...
];

const Transport = () => {
  const [language, setLanguage] = useState('');
  const [type, setType] = useState('');
  const [route, setRoute] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const filtered = transportData.filter((item) =>
      (!language || item.language === language) &&
      (!type || item.type === type) &&
      (!route || item.route === route || route === 'all') &&
      (!query || item.title.toLowerCase().includes(query.toLowerCase()) || item.content.toLowerCase().includes(query.toLowerCase()))
    );

    setTimeout(() => {
      setIsLoading(false);
      setResults(filtered);
    }, 3000); // Simulate a 3-second delay
  };

  const handleReset = () => {
    setLanguage('');
    setType('');
    setRoute('');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Transport Help & Information</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-1">
            <option value="">Language</option>
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-1">
            <option value="">All Types</option>
            <option value="matatu">Matatu</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="uber">Uber/Taxi</option>
          </select>

          <select value={route} onChange={(e) => setRoute(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md flex-1">
            <option value="">All Routes</option>
            <option value="nairobi-cbd">Nairobi CBD</option>
            <option value="westlands">Westlands</option>
            <option value="kawangware">Kawangware</option>
            <option value="eastlands">Eastlands</option>
            <option value="mombasa-road">Mombasa Road</option>
          </select>

          <div className="flex flex-1 gap-2">
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

        {!isLoading && <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Information</h2>
          {results.length === 0 ? (
            <p className="text-gray-600">Select language, transport type and route, or use the search bar to find information.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {results.map((item, idx) => (
                <li key={idx} className="py-4">
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

export default Transport;
