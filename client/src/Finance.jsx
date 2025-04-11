import React, { useState } from 'react';
import Loader from './Loader';
import { NavLink, useParams } from 'react-router';

const dummyResults = [
  { language: 'en', topic: 'send', title: 'How to Send Money', content: 'Step-by-step guide on sending money via M-Pesa.' },
  { language: 'sw', topic: 'send', title: 'Jinsi ya Kutuma Pesa', content: 'Mwongozo wa hatua kwa hatua wa kutuma pesa kupitia M-Pesa.' },
  { language: 'en', topic: 'payment', title: 'Making Payments', content: 'Instructions for paying bills and merchants with M-Pesa.' },
  { language: 'sw', topic: 'payment', title: 'Kufanya Malipo', content: 'Maelekezo ya kulipa bili na wafanyabiashara kwa M-Pesa.' },
  { language: 'en', topic: 'withdraw', title: 'Withdrawing Money', content: 'Instructions on how to withdraw money.' },
  { language: 'sw', topic: 'withdraw', title: 'Kutoa Pesa', content: 'Maelekezo juu ya jinsi ya kutoa pesa.' },
  { language: 'en', topic: 'airtime', title: 'Buying Airtime', content: 'Instructions on how to buy airtime.' },
  { language: 'sw', topic: 'airtime', title: 'Kununua Muda wa Maongezi', content: 'Maelekezo juu ya jinsi ya kununua muda wa maongezi.' },
  { language: 'lu', topic: 'send', title: 'Iruyo pesa', content: 'Mokwongo mar chawruok pesa e M-Pesa.' },
  { language: 'ki', topic: 'send', title: 'Gūtuma Mbeca', content: 'Ũrĩa wa kũtũma mbeca kũgerera M-Pesa.' },
  { language: 'kl', topic: 'send', title: 'Koru Pesa', content: 'Koru pesa kityo M-Pesa.' },
];

const Finance = () => {

  const params = useParams();

  const [language, setLanguage] = useState('');
  const [topic, setTopic] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const filtered = dummyResults.filter(item => {
      return (
        (!language || item.language === language) &&
        (!topic || item.topic === topic) &&
        (!query || item.title.toLowerCase().includes(query.toLowerCase()) || item.content.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setTimeout(() => {
      setIsLoading(false);
      setResults(filtered);
    },3000); // Simulate a 3-second delay
  };

  const handleReset = () => {
    setLanguage('');
    setTopic('');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">M-Pesa Instructions & Help</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Language Dropdown */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Language</option>
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
            <option value="lu">Luo</option>
            <option value="ki">Kikuyu</option>
            <option value="kl">Kalenjin</option>
          </select>

          {/* Topic Dropdown */}
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Topic</option>
            <option value="send">Send Money</option>
            <option value="payment">Payment</option>
            <option value="withdraw">Withdrawal</option>
            <option value="airtime">Airtime</option>
          </select>

          {/* Search Input */}
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Search by content"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="mb-6 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-md"
        >
          Reset
        </button>

        {/* Results */}
        {!isLoading && <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
          {results.length === 0 ? (
            <p className="text-gray-600">No results found. Please select a language and topic, or use the search bar.</p>
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

        {/* Chat Widget */}
        <NavLink className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-4 flex items-center gap-2 cursor-pointer hover:shadow-xl transition duration-300" to={`../${params.id}/text-to-text`}>
          <p className="text-blue-500 font-semibold">Need Help? Chat with Emma</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.11 3.13a8 8 0 0 1 0 11.31L12 20l-8.11-5.56a8 8 0 0 1 0-11.31a8 8 0 0 1 11.31 0Z" />
            <path d="M18 8a2 2 0 1 0-4 0a2 2 0 0 0 4 0Z" />
            <path d="M6.1 15.1a7 7 0 0 0 12.8 0" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default Finance;
