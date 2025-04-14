import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      title: "Language Services",
      description: "Professional translation, interpretation, and localization services powered by AI and human expertise.",
      icon: "🌐",
      link: "/language-services"
    },
    {
      title: "Technology Solutions",
      description: "Custom software solutions for language access including API integrations and workflow automation.",
      icon: "💻",
      link: "/technology-solutions"
    },
    {
      title: "Industry Specialization",
      description: "Tailored solutions for healthcare, legal, government, and enterprise sectors.",
      icon: "🏥",
      link: "/industries"
    }
  ];

  const features = [
    "AI-Powered Translation Engines",
    "Secure & Compliant (HIPAA, GDPR)",
    "Real-Time Interpretation",
    "150+ Languages Supported",
    "Enterprise-Grade Scalability",
    "24/7 Customer Support"
  ];

  return (
    <div className="services-page bg-white">
        <div className="bg-gray-100 font-sans">
        <div className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="hero rounded-lg bg-blue-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Language & Technology Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Bridging communication gaps with innovative technology and human expertise
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Solutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="text-blue-600 font-semibold hover:underline inline-flex items-center"
                >
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Solutions</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Communication?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us to discuss how we can meet your language technology needs
          </p>
          <button className="bg-white text-blue-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </section>
    </div>
    </div>
    </div>
  );
};

export default ServicesPage;