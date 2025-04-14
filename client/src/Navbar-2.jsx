import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar2() {
  const { t, i18n } = useTranslation();
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'lu', name: 'Dholuo' },
    { code: 'km', name: 'Kikamba' },
    { code: 'ki', name: 'Gikuyu' }
  ];

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setLanguageDropdownOpen(false);
    localStorage.setItem('i18nextLng', languageCode); // Persist language choice
  };

  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="logo text-xl font-bold text-green-500">
        <span className="text-black">Kenya</span> Language Bridge
      </div>
      
      <nav className="flex items-center space-x-8">
        <ul className='flex gap-8'>
          <li><Link to="/" className="hover:text-green-600 transition-colors">{t('Home')}</Link></li>
          {/* <li><Link to="/aboutpage" className="hover:text-green-600 transition-colors">{t('About')}</Link></li> */}
          <li><Link to="/servicepage" className="hover:text-green-600 transition-colors">{t('Services')}</Link></li>
          <li><Link to="/industriespage" className="hover:text-green-600 transition-colors">{t('Industries')}</Link></li>
        </ul>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <button 
              onClick={toggleLanguageDropdown}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors"
            >
              <span>{languages.find(lang => lang.code === i18n.language)?.name || 'English'}</span>
              <svg 
                className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => changeLanguage(lang.code)}
                        className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                          i18n.language === lang.code ? 'bg-gray-100 text-green-600' : 'text-gray-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link 
    to="/login" 
    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
  >
    {t('Login')}
  </Link>
          {/* <Link 
            to="/contact" 
            className="bg-white border border-green-600 text-gray-800 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition-colors duration-300"
          >
            {t('Contact')}
          </Link> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar2;