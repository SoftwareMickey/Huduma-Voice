import React, { useState, useEffect, useRef } from 'react';
import { FaLanguage, FaClinicMedical, FaMapMarkerAlt, FaSearch, FaUndo } from 'react-icons/fa';

const Medical = () => {
  // State for filters
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  // Health services data with actual instructions
  const healthServicesData = [
    // SEXUAL HEALTH INSTRUCTIONS
    {
      id: 1,
      category: 'sexual-health',
      language: 'en',
      title: 'STI Testing Guidelines',
      instructions: [
        '1. Visit any public health clinic or private hospital',
        '2. Request confidential STI testing services',
        '3. You may be asked to provide urine or blood samples',
        '4. Test results typically available in 3-5 days',
        '5. Treatment is provided free in public facilities if positive'
      ],
      contact: 'National STI Hotline: 0800-123-456'
    },
    {
      id: 2,
      category: 'sexual-health',
      language: 'sw',
      title: 'Maelekezo ya Kupima Magonjwa ya Zinaa',
      instructions: [
        '1. Tembelea kliniki yoyote ya umma au hospitali ya kibinafsi',
        '2. Omba huduma za kupima magonjwa ya zinaa kwa siri',
        '3. Unaweza kuombwa mfano wa mkojo au damu',
        '4. Matokeo yanapatikana kwa siku 3-5',
        '5. Matibabu yanatolewa bure katika vituo vya umma ikiwa chanya'
      ],
      contact: 'Simu ya Maambukizi ya Zinaa: 0800-123-456'
    },

    // PRIMARY CARE INSTRUCTIONS
    {
      id: 3,
      category: 'primary-care',
      language: 'en',
      title: 'Chronic Medication Refill',
      instructions: [
        '1. Bring your patient ID and empty medication packaging',
        '2. Visit your designated clinic during working hours (8am-3pm)',
        '3. BP and vitals check will be conducted first',
        '4. Doctor consultation if dosage needs adjustment',
        '5. Collect medication at pharmacy with your NHIF card'
      ],
      contact: 'Ministry of Health: 020-2717077'
    },
    {
      id: 4,
      category: 'primary-care',
      language: 'sw',
      title: 'Maelekezo ya Kujaza Dawa za Muda Mrefu',
      instructions: [
        '1. Leta kitambulisho chako na mfuko wa dawa uliomalizika',
        '2. Tembelea kliniki yako kwa masaa ya kazi (8am-3pm)',
        '3. Ukipimwa BP na viashiria vingine vya kwanza',
        '4. Kupata ushauri wa daktari ikiwa kipimo kinahitaji kubadilishwa',
        '5. Pata dawa zako kwenye duka la dawa kwa kutumia kadi yako ya NHIF'
      ],
      contact: 'Wizara ya Afya: 020-2717077'
    },

    // PREGNANCY CARE INSTRUCTIONS
    {
      id: 5,
      category: 'pregnancy',
      language: 'en',
      title: 'Antenatal Care Schedule',
      instructions: [
        '1. First visit: Before 12 weeks pregnancy',
        '2. Monthly visits until 28 weeks',
        '3. Every 2 weeks until 36 weeks',
        '4. Weekly visits until delivery',
        '5. Bring your maternity notebook to every visit',
        '6. Free ultrasounds at 20 and 32 weeks'
      ],
      contact: 'Mother & Child Health Line: 0800-720-720'
    },
    {
      id: 6,
      category: 'pregnancy',
      language: 'sw',
      title: 'Ratiba ya Huduma ya Kabla ya Kuzalia',
      instructions: [
        '1. Ziara ya kwanza: Kabla ya wiki 12 za ujauzito',
        '2. Ziara kila mwezi hadi wiki 28',
        '3. Kila baada ya wiki 2 hadi wiki 36',
        '4. Ziara kila wiki hadi wakati wa kujifungua',
        '5. Leta daftari lako la mama mjamzito kwa kila ziara',
        '6. Vipimo vya ultrasound bila malipo kwa wiki 20 na 32'
      ],
      contact: 'Mstari wa Afya ya Mama na Mtoto: 0800-720-720'
    }
  ];

  // Filter instructions based on selections
  const filteredInstructions = healthServicesData.filter((item) => (
    (!selectedTopic || item.category === selectedTopic) &&
    (!selectedLanguage || item.language === selectedLanguage) &&
    (!searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instructions.some(step => step.toLowerCase().includes(searchQuery.toLowerCase()))
  )));

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Health Services Instructions</h1>
          <p className="text-gray-600">
            Find step-by-step guides for sexual health, primary care, and pregnancy services
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Topic Selector */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Health Topic</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              <option value="">All Topics</option>
              <option value="sexual-health">Sexual Health</option>
              <option value="primary-care">Primary Care</option>
              <option value="pregnancy">Pregnancy Care</option>
            </select>
          </div>

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

          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Instructions</label>
            <div className="flex">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-l-md"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className="bg-blue-600 text-white px-4 rounded-r-md"
                onClick={() => setSelectedInstruction(null)}
              >
                <FaSearch className="inline mr-1" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {selectedInstruction ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <button 
              className="text-blue-600 mb-4 flex items-center"
              onClick={() => setSelectedInstruction(null)}
            >
              <FaUndo className="mr-1" /> Back to all instructions
            </button>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedInstruction.title}</h2>
            
            <div className="prose max-w-none">
              <ol className="list-decimal pl-5 space-y-2">
                {selectedInstruction.instructions.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
              
              {selectedInstruction.contact && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800">Contact Information:</h3>
                  <p className="text-blue-600">{selectedInstruction.contact}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructions.length > 0 ? (
              filteredInstructions.map((instruction) => (
                <div 
                  key={instruction.id} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedInstruction(instruction)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-800">{instruction.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {instruction.category.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                  <div className="text-gray-600 mb-4">
                    {instruction.instructions[0].substring(0, 100)}...
                  </div>
                  <button className="text-blue-600 font-medium">
                    View full instructions →
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No instructions found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medical;