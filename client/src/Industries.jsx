import React from 'react'

// src/pages/IndustriesPage.jsx
import { Link } from 'react-router-dom';

const IndustriesPage = () => {
  const industries = [
    {
      title: "Healthcare",
      description: "Language solutions for hospitals, clinics, and healthcare providers to ensure compliance and patient safety.",
      icon: "🏥",
      highlights: [
        "HIPAA-compliant solutions",
        "Medical interpretation",
        "Clinical document translation",
        "Telehealth support"
      ]
    },
    {
      title: "Legal",
      description: "Precise legal translation and certified interpretation for courts, law firms, and immigration services.",
      icon: "⚖️",
      highlights: [
        "Certified translations",
        "Courtroom interpretation",
        "Document notarization",
        "Multilingual deposition support"
      ]
    },
    {
      title: "Government",
      description: "Secure language services for public agencies, municipalities, and social services.",
      icon: "🏛️",
      highlights: [
        "ADA compliance",
        "Emergency response systems",
        "Multilingual public notices",
        "Citizen services support"
      ]
    },
    {
      title: "Financial Services",
      description: "Accurate financial translation and interpretation for banking, insurance, and fintech.",
      icon: "💰",
      highlights: [
        "Regulatory compliance",
        "Financial document translation",
        "Multilingual customer support",
        "Fraud prevention systems"
      ]
    },
    {
      title: "Education",
      description: "Language access solutions for schools, universities, and e-learning platforms.",
      icon: "🎓",
      highlights: [
        "Parent-teacher communication",
        "Academic transcript translation",
        "ELL/ESL support",
        "Accessibility compliance"
      ]
    },
    {
      title: "Technology",
      description: "Localization and multilingual support for SaaS, hardware, and IT services.",
      icon: "💻",
      highlights: [
        "Software localization",
        "Technical documentation",
        "Multilingual support",
        "API integration"
      ]
    }
  ];

  return (
    <div className="industries-page bg-white">
      {/* Hero Section */}
      <div className="bg-gray-100 font-sans">
        <div className=" container mx-auto px-4 py-10">
      <section className="hero rounded-lg bg-indigo-900 text-white py-20">
        <div className="container mx-auto px-6 text-center ">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Tailored language technology solutions for your specific industry needs
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Serving Diverse Industries</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We understand each industry has unique requirements. Our solutions are customized to meet your specific compliance, workflow, and communication needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-4">{industry.icon}</span>
                    <h3 className="text-xl font-bold text-indigo-800">{industry.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {industry.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={`/industries/${industry.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-indigo-600 font-semibold hover:underline"
                  >
                    View {industry.title} solutions
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-800 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Need a Custom Solution for Your Industry?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our team specializes in developing tailored language technology solutions for unique industry requirements
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-indigo-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Contact Our Experts
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-indigo-800 transition-colors">
              Request a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
    </div>
    </div>
  );
};

export default IndustriesPage;