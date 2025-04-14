import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Finance = () => {
  // State for all filters
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // Dropdown open states
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isTopicOpen, setIsTopicOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);

  // Refs for dropdown containers
  const languageDropdownRef = useRef(null);
  const topicDropdownRef = useRef(null);
  const serviceDropdownRef = useRef(null);
  const difficultyDropdownRef = useRef(null);

  // Complete dummy dataset
  const dummyResults = [
    // M-Pesa Services
    { language: 'en', topic: 'mpesa', service: 'send', difficulty: 'beginner', 
      title: 'How to Send Money via M-Pesa', 
      content: '1. Go to M-Pesa menu. 2. Select "Send Money". 3. Enter recipient number. 4. Enter amount. 5. Enter PIN and confirm.' },
    
    { language: 'sw', topic: 'mpesa', service: 'send', difficulty: 'beginner', 
      title: 'Jinsi ya Kutuma Pesa kupitia M-Pesa', 
      content: '1. Nenda kwenye menyu ya M-Pesa. 2. Chagua "Tuma Pesa". 3. Weka nambari ya mpokeaji. 4. Weka kiasi. 5. Weka PIN na kuthibitisha.' },
    
    { language: 'lu', topic: 'mpesa', service: 'send', difficulty: 'beginner', 
      title: 'Mokwongo mar Tero Pesa e M-Pesa', 
      content: '1. Dhi e menu M-Pesa. 2. Yiero "Tero Pesa". 3. Ket namba mar recipient. 4. Ket pesa. 5. Ket PIN ka confirm.' },
    
    { language: 'en', topic: 'mpesa', service: 'withdraw', difficulty: 'beginner', 
      title: 'Withdrawing Cash from M-Pesa Agent', 
      content: '1. Visit an M-Pesa agent. 2. Provide your phone number. 3. Agent will process withdrawal. 4. You receive cash and confirmation SMS.' },
    
    { language: 'sw', topic: 'mpesa', service: 'withdraw', difficulty: 'beginner', 
      title: 'Kutoa Pesa kutoka kwa Wakala wa M-Pesa', 
      content: '1. Tembelea wakala wa M-Pesa. 2. Toa nambari yako ya simu. 3. Wakala atakusanyea pesa. 4. Utapokea pesa na SMS ya uthibitisho.' },
    
    // Banking Services
    { language: 'en', topic: 'banking', service: 'transfer', difficulty: 'intermediate', 
      title: 'Bank to M-Pesa Transfers', 
      content: '1. Log in to your bank app. 2. Select "Send to M-Pesa". 3. Enter amount and M-Pesa number. 4. Confirm transaction.' },
    
    { language: 'sw', topic: 'banking', service: 'transfer', difficulty: 'intermediate', 
      title: 'Kuhama Pesa kutoka Benki kwenda M-Pesa', 
      content: '1. Ingia kwenye programu ya benki. 2. Chagua "Tuma kwa M-Pesa". 3. Weka kiasi na nambari ya M-Pesa. 4. Thibitisha muamala.' },
    
    // Bill Payments
    { language: 'en', topic: 'bills', service: 'electricity', difficulty: 'intermediate', 
      title: 'Paying Electricity Bills via M-Pesa', 
      content: '1. Go to M-Pesa menu. 2. Select "Pay Bill". 3. Enter business number 88888. 4. Enter account number. 5. Enter amount and PIN.' },
    
    { language: 'sw', topic: 'bills', service: 'water', difficulty: 'intermediate', 
      title: 'Kulipa Bili ya Maji kupitia M-Pesa', 
      content: '1. Nenda kwenye menyu ya M-Pesa. 2. Chagua "Lipa Bili". 3. Weka nambari ya kampuni 99999. 4. Weka nambari ya akaunti. 5. Weka kiasi na PIN.' },
    
    // Advanced Services
    { language: 'en', topic: 'mpesa', service: 'loan', difficulty: 'advanced', 
      title: 'Applying for M-Shwari Loans', 
      content: '1. Dial *334#. 2. Select Loans. 3. Choose M-Shwari. 4. Select loan amount. 5. Accept terms and conditions.' },
    
    { language: 'sw', topic: 'mpesa', service: 'savings', difficulty: 'advanced', 
      title: 'Kuweka Akiba kupitia M-Pesa', 
      content: '1. Piga *334#. 2. Chagua Akiba. 3. Weka kiasi unachotaka kuweka. 4. Thibitisha kwa kutumia PIN yako.' },
    
    // Additional languages
    { language: 'ki', topic: 'mpesa', service: 'send', difficulty: 'beginner', 
      title: 'Gūtuma Mbeca kūgerera M-Pesa', 
      content: '1. Thiĩ kūmenyu M-Pesa. 2. Hītia "Tūma Mbeca". 3. Andika namba ya mūtongoria. 4. Andika mbeca. 5. Andika PIN na gīkīria.' },
    
    { language: 'kl', topic: 'mpesa', service: 'airtime', difficulty: 'beginner', 
      title: 'Kony Airtime kou M-Pesa', 
      content: '1. Lo menu ab M-Pesa. 2. Yier "Airtime". 3. Ket number ne. 4. Ket amount. 5. Ket PIN.' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      if (topicDropdownRef.current && !topicDropdownRef.current.contains(event.target)) {
        setIsTopicOpen(false);
      }
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
        setIsServiceOpen(false);
      }
      if (difficultyDropdownRef.current && !difficultyDropdownRef.current.contains(event.target)) {
        setIsDifficultyOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search with all filters
  const performSearch = () => {
    const filteredResults = dummyResults.filter(result => {
      return (
        (!selectedLanguage || result.language === selectedLanguage) &&
        (!selectedTopic || result.topic === selectedTopic) &&
        (!selectedService || result.service === selectedService) &&
        (!selectedDifficulty || result.difficulty === selectedDifficulty) &&
        (!searchQuery || 
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          result.content.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
    setResults(filteredResults);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedLanguage('');
    setSelectedTopic('');
    setSelectedService('');
    setSelectedDifficulty('');
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Financial Services Instructions</h1>

        {/* Search Filters - 2 rows for better organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* First row */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Language Dropdown */}
            <div className="relative flex-1" ref={languageDropdownRef}>
              <button 
                className="custom-select-trigger flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span>{selectedLanguage ? 
                  {en: 'English', sw: 'Kiswahili', lu: 'Luo', ki: 'Kikuyu', kl: 'Kalenjin'}[selectedLanguage] 
                  : 'Select Language'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  <ul>
                    {[
                      { value: 'en', label: 'English' },
                      { value: 'sw', label: 'Kiswahili' },
                      { value: 'lu', label: 'Luo' },
                      { value: 'ki', label: 'Kikuyu' },
                      { value: 'kl', label: 'Kalenjin' }
                    ].map((lang) => (
                      <li 
                        key={lang.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedLanguage(lang.value);
                          setIsLanguageOpen(false);
                        }}
                      >
                        {lang.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Topic Dropdown */}
            <div className="relative flex-1" ref={topicDropdownRef}>
              <button 
                className="custom-select-trigger flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                onClick={() => setIsTopicOpen(!isTopicOpen)}
              >
                <span>{selectedTopic ? 
                  {mpesa: 'M-Pesa', banking: 'Banking', bills: 'Bill Payments', savings: 'Savings'}[selectedTopic] 
                  : 'Select Topic'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </button>
              
              {isTopicOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  <ul>
                    {[
                      { value: 'mpesa', label: 'M-Pesa' },
                      { value: 'banking', label: 'Banking' },
                      { value: 'bills', label: 'Bill Payments' },
                      { value: 'savings', label: 'Savings' }
                    ].map((topic) => (
                      <li 
                        key={topic.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedTopic(topic.value);
                          setIsTopicOpen(false);
                        }}
                      >
                        {topic.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Second row */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Service Dropdown */}
            <div className="relative flex-1" ref={serviceDropdownRef}>
              <button 
                className="custom-select-trigger flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                onClick={() => setIsServiceOpen(!isServiceOpen)}
              >
                <span>{selectedService ? 
                  {send: 'Send Money', withdraw: 'Withdraw Cash', transfer: 'Bank Transfer', 
                   electricity: 'Electricity', water: 'Water', loan: 'Loans', airtime: 'Airtime'}[selectedService] 
                  : 'Select Service'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </button>
              
              {isServiceOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  <ul>
                    {[
                      { value: 'send', label: 'Send Money' },
                      { value: 'withdraw', label: 'Withdraw Cash' },
                      { value: 'transfer', label: 'Bank Transfer' },
                      { value: 'electricity', label: 'Electricity' },
                      { value: 'water', label: 'Water' },
                      { value: 'loan', label: 'Loans' },
                      { value: 'airtime', label: 'Airtime' }
                    ].map((service) => (
                      <li 
                        key={service.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedService(service.value);
                          setIsServiceOpen(false);
                        }}
                      >
                        {service.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Difficulty Dropdown */}
            <div className="relative flex-1" ref={difficultyDropdownRef}>
              <button 
                className="custom-select-trigger flex justify-between items-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md"
                onClick={() => setIsDifficultyOpen(!isDifficultyOpen)}
              >
                <span>{selectedDifficulty ? 
                  {beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced'}[selectedDifficulty] 
                  : 'Difficulty Level'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </button>
              
              {isDifficultyOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <ul>
                    {[
                      { value: 'beginner', label: 'Beginner' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'advanced', label: 'Advanced' }
                    ].map((difficulty) => (
                      <li 
                        key={difficulty.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedDifficulty(difficulty.value);
                          setIsDifficultyOpen(false);
                        }}
                      >
                        {difficulty.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar and Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && performSearch()}
            placeholder="Search instructions..." 
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
          />
          <div className="flex gap-2">
            <button 
              onClick={performSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              Search
            </button>
            <button 
              onClick={resetFilters}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md transition duration-300"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {results.length > 0 ? `Found ${results.length} results` : 'Results'}
          </h2>
          
          {results.length > 0 ? (
            <ul className="space-y-4">
              {results.map((result, index) => (
                <li key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-blue-600">{result.title}</h3>
                      <p className="text-gray-700 mt-1">{result.content}</p>
                    </div>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {result.difficulty.charAt(0).toUpperCase() + result.difficulty.slice(1)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 mt-2">
                {selectedLanguage || selectedTopic || selectedService || selectedDifficulty || searchQuery 
                  ? 'No matching results found. Try adjusting your filters.' 
                  : 'Use the filters above to find financial service instructions.'}
              </p>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="fixed bottom-6 right-6">
          <div className="bg-white rounded-full shadow-xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-2xl transition-all">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <span className="text-blue-600 font-medium pr-2">Need Help? Chat with Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;