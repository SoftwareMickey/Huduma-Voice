import React, { useState } from 'react';
import { FaLanguage, FaSeedling, FaTractor, FaChartLine, FaSearch, FaUndo } from 'react-icons/fa';

const Agriculture = () => {
  // State for filters
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Agriculture data with actual farming information
  const agricultureData = [
    // CROP FARMING
    {
      id: 1,
      category: 'crops',
      language: 'en',
      title: 'Maize Farming Guide',
      content: [
        'Best varieties for Kenya: DH04, DK8031, H513',
        'Planting season: Long rains (March-April) or short rains (October-November)',
        'Seed rate: 20-25kg per acre',
        'Fertilizer: Apply DAP at planting (50kg/acre), CAN at top dressing (100kg/acre)',
        'Expected yield: 20-40 bags (90kg) per acre with good management',
        'Key pests: Stem borers, armyworms (control with appropriate pesticides)'
      ],
      contact: 'Kenya Agricultural & Livestock Research Organization (KALRO): 020-7224550'
    },
    {
      id: 2,
      category: 'crops',
      language: 'sw',
      title: 'Maelekezo ya Kilimo cha Mahindi',
      content: [
        'Aina bora za Kenya: DH04, DK8031, H513',
        'Mwanya wa kupanda: Mvua ndefu (Machi-Aprili) au mvua fupi (Oktoba-Novemba)',
        'Kiwango cha mbegu: 20-25kg kwa ekari',
        'Mbolea: Tumia DAP wakati wa kupanda (50kg/ekari), CAN wakati wa kutoa mbolea ya juu (100kg/ekari)',
        'Mavuno yanayotarajiwa: 20-40 gunia (90kg) kwa ekari kwa usimamizi mzuri',
        'Wadudu wakuu: Waharibifu wa shina, armyworms (dhibiti kwa dawa za kuua wadudu zinazofaa)'
      ],
      contact: 'Shirika la Utafiti wa Kilimo na Mifugo Kenya (KALRO): 020-7224550'
    },

    // LIVESTOCK
    {
      id: 3,
      category: 'livestock',
      language: 'en',
      title: 'Dairy Cattle Management',
      content: [
        'Recommended breeds: Friesian, Ayrshire, Jersey',
        'Feeding: 70kg fresh forage + 4kg dairy meal per cow daily',
        'Water: 50-70 liters per cow daily',
        'Milking: Twice daily at 12-hour intervals',
        'Average production: 15-25 liters per cow daily',
        'Key diseases: Mastitis (maintain hygiene), Foot and Mouth (vaccinate)'
      ],
      contact: 'Ministry of Agriculture Livestock Division: 020-2718870'
    },

    // FARMING TECHNIQUES
    {
      id: 4,
      category: 'techniques',
      language: 'en',
      title: 'Conservation Agriculture',
      content: [
        'Three principles: Minimal soil disturbance, permanent soil cover, crop rotation',
        'Benefits: Improves soil fertility, conserves moisture, reduces erosion',
        'Equipment: Jab planters, rippers (avoid conventional ploughing)',
        'Suitable crops: Maize, beans, sorghum intercropping',
        'Adoption rate: Increasing among Kenyan smallholders',
        'Training: Available through MoALF extension officers'
      ],
      contact: 'Conservation Agriculture Network Kenya: 0722-123456'
    },

    // ADD MORE DATA POINTS...
  ];

  // Filter results based on selections
  const filteredGuides = agricultureData.filter((item) => (
    (!selectedLanguage || item.language === selectedLanguage) &&
    (!selectedCategory || item.category === selectedCategory) &&
    (!searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.some(text => text.toLowerCase().includes(searchQuery.toLowerCase()))
  )));

  // Reset all filters
  const resetFilters = () => {
    setSelectedLanguage('en');
    setSelectedCategory('');
    setSearchQuery('');
    setSelectedGuide(null);
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2 flex items-center justify-center">
            <FaSeedling className="mr-2" /> Kenyan Agriculture Hub
          </h1>
          <p className="text-gray-600">
            Practical farming guides and agricultural information for Kenyan farmers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Language Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaLanguage className="mr-2" /> Language
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="sw">Kiswahili</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaTractor className="mr-2" /> Category
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="crops">Crop Farming</option>
              <option value="livestock">Livestock</option>
              <option value="techniques">Farming Techniques</option>
              <option value="markets">Market Information</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaSearch className="mr-2" /> Search Guides
            </label>
            <div className="flex">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedGuide(null)}
              />
              <button 
                className="bg-green-600 text-white px-4 rounded-r-md hover:bg-green-700 transition-colors"
                onClick={() => setSelectedGuide(null)}
              >
                <FaSearch />
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
        {selectedGuide ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <button 
              className="text-green-600 mb-4 flex items-center hover:text-green-800"
              onClick={() => setSelectedGuide(null)}
            >
              <FaUndo className="mr-1" /> Back to all guides
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedGuide.title}</h2>
            
            <div className="prose max-w-none">
              <ul className="list-disc pl-5 space-y-2">
                {selectedGuide.content.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
              
              {selectedGuide.contact && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-800">Contact Information:</h3>
                  <p className="text-green-600">{selectedGuide.contact}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.length > 0 ? (
              filteredGuides.map((guide) => (
                <div 
                  key={guide.id} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500"
                  onClick={() => setSelectedGuide(guide)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{guide.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      guide.category === 'crops' ? 'bg-yellow-100 text-yellow-800' :
                      guide.category === 'livestock' ? 'bg-blue-100 text-blue-800' :
                      guide.category === 'techniques' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-4 line-clamp-3">
                    {guide.content[0]}
                  </div>
                  <button className="text-green-600 font-medium hover:text-green-800">
                    View full guide →
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  {selectedLanguage || selectedCategory || searchQuery
                    ? 'No guides match your search criteria'
                    : 'Browse agriculture guides using the filters above'}
                </h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        )}

        {/* Additional Resources Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
            <FaChartLine className="mr-2" /> Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Weather Advisory</h3>
              <p className="text-gray-600">Check current weather patterns and farming advisories from the Kenya Meteorological Department.</p>
              <a href="https://www.meteo.go.ke" className="text-green-600 hover:underline inline-block mt-2">Visit Site →</a>
            </div>
            <div className="p-4 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Commodity Prices</h3>
              <p className="text-gray-600">Latest market prices for agricultural commodities across major Kenyan markets.</p>
              <a href="https://www.agricultureauthority.go.ke" className="text-green-600 hover:underline inline-block mt-2">View Prices →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agriculture;