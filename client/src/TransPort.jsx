import React, { useState, useEffect, useRef } from 'react';
import { FaLanguage, FaBus, FaTrain, FaTaxi, FaUndo, FaSearch } from 'react-icons/fa';

const Transport = () => {
  // State for filters
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTransportType, setSelectedTransportType] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

  // Transport data with realistic information
  const transportData = [
    // Matatu routes
    {
      id: 1,
      language: 'en',
      type: 'matatu',
      route: 'nairobi-cbd',
      title: 'Matatu Nairobi CBD Route Information',
      content: [
        'Main stages: Railways, Kencom, Ambassador',
        'Fare range: KES 50-100 depending on time of day',
        'Operating hours: 5:00 AM - 10:00 PM',
        'Popular SACCOs: Forward, Super Metro, 2NK',
        'Average travel time: 15-30 minutes within CBD'
      ],
      contact: 'Matatu Owners Association: 020-1234567'
    },
    {
      id: 2,
      language: 'sw',
      type: 'matatu',
      route: 'nairobi-cbd',
      title: 'Taarifa za Ruti za Matatu Nairobi CBD',
      content: [
        'Vituo kuu: Railways, Kencom, Ambassador',
        'Nauli: KES 50-100 kutegemea na wakati wa siku',
        'Masaa ya kufanya kazi: 5:00 asubuhi - 10:00 jioni',
        'SACCO maarufu: Forward, Super Metro, 2NK',
        'Muda wa wastani wa safari: Dakika 15-30 ndani ya CBD'
      ],
      contact: 'Chama cha Wenyewe Matatu: 020-1234567'
    },
    
    // Bus routes
    {
      id: 3,
      language: 'en',
      type: 'bus',
      route: 'westlands',
      title: 'Bus Schedule for Westlands',
      content: [
        'Main operators: City Hoppa, Double M',
        'Fare: KES 100 flat rate',
        'Frequency: Every 15 minutes during peak hours',
        'First bus: 5:30 AM from Railways',
        'Last bus: 9:30 PM from Westlands'
      ],
      contact: 'Nairobi Bus Services: 020-7654321'
    },
    
    // Train routes
    {
      id: 4,
      language: 'en',
      type: 'train',
      route: 'mombasa-road',
      title: 'Commuter Train Schedule - Mombasa Road',
      content: [
        'Stations: Syokimau, Imara Daima, Makadara, CBD',
        'Morning schedule: 5:45 AM, 6:30 AM, 7:15 AM',
        'Evening schedule: 4:30 PM, 5:15 PM, 6:00 PM',
        'Fare: KES 50-150 depending on distance',
        'Contactless payment available via M-Pesa'
      ],
      contact: 'Kenya Railways: 020-9876543'
    },
    
    // Add more transport data...
  ];

  // Filter results based on selections
  const filteredResults = transportData.filter((item) => (
    (!selectedLanguage || item.language === selectedLanguage) &&
    (!selectedTransportType || item.type === selectedTransportType) &&
    (!selectedRoute || item.route === selectedRoute) &&
    (!searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.some(text => text.toLowerCase().includes(searchQuery.toLowerCase()))
  )));

  // Reset all filters
  const resetFilters = () => {
    setSelectedLanguage('en');
    setSelectedTransportType('');
    setSelectedRoute('');
    setSearchQuery('');
    setResults([]);
    setSelectedResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Nairobi Transport Guide</h1>
          <p className="text-gray-600">
            Find schedules, fares, and route information for all public transport options
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Language Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>

          {/* Transport Type Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Transport Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedTransportType}
              onChange={(e) => setSelectedTransportType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="matatu">Matatu</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="uber">Taxi/Ride-hail</option>
            </select>
          </div>

          {/* Route Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
            >
              <option value="">All Routes</option>
              <option value="nairobi-cbd">Nairobi CBD</option>
              <option value="westlands">Westlands</option>
              <option value="kawangware">Kawangware</option>
              <option value="eastlands">Eastlands</option>
              <option value="mombasa-road">Mombasa Road</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="flex">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-l-md"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedResult(null)}
              />
              <button 
                className="bg-blue-600 text-white px-4 rounded-r-md"
                onClick={() => setSelectedResult(null)}
              >
                <FaSearch className="inline" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={resetFilters}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <FaUndo className="mr-2" />
            Reset Filters
          </button>
        </div>

        {/* Results */}
        {selectedResult ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <button 
              className="text-blue-600 mb-4 flex items-center"
              onClick={() => setSelectedResult(null)}
            >
              <FaUndo className="mr-1" /> Back to all results
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedResult.title}</h2>
            
            <div className="prose max-w-none">
              <ul className="list-disc pl-5 space-y-2">
                {selectedResult.content.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
              
              {selectedResult.contact && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Contact Information:</h3>
                  <p className="text-blue-600">{selectedResult.contact}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div 
                  key={result.id} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{result.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      result.type === 'matatu' ? 'bg-yellow-100 text-yellow-800' :
                      result.type === 'bus' ? 'bg-green-100 text-green-800' :
                      result.type === 'train' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-4 line-clamp-3">
                    {result.content[0]}
                  </div>
                  <button className="text-blue-600 font-medium">
                    View full details →
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No transport information found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transport;