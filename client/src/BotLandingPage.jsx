import React from 'react'
import { Link, useParams } from 'react-router-dom';

const Services = () => {

    const params = useParams()
  return (
    <div>
      <section id="services" class="container mx-auto py-16 px-4">
            <h2 class="text-3xl font-semibold text-gray-800 text-center mb-12">Our Services</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="service-card">
                    <h3 class="text-xl font-semibold mb-4">Finance</h3>
                    <p class="text-gray-700 mb-4">Reliable and comfortable bus services across the region.</p>
                    <Link to={`../${params.id}/finance`}class="text-blue-500 hover:text-blue-700 transition duration-300">Explore </Link>
                </div>
                <div class="service-card">
                    <h3 class="text-xl font-semibold mb-4">Medical</h3>
                    <p class="text-gray-700 mb-4">Reliable and comfortable bus services across the region.</p>
                    {/* <a href="#medical" class="text-blue-500 hover:text-blue-700 transition duration-300">Explore</a> */}
                    <Link to={`../${params.id}/medical`} class="text-blue-500 hover:text-blue-700 transition duration-300">Explore </Link>
                </div>
                <div class="service-card">
                    <h3 class="text-xl font-semibold mb-4">Agriculture</h3>
                    <p class="text-gray-700 mb-4">Fast and efficient train travel for long-distance journeys.</p>
                    <Link to={`../${params.id}/agriculture`} class="text-blue-500 hover:text-blue-700 transition duration-300">Explore </Link>
                </div>
                <div class="service-card">
                    <h3 class="text-xl font-semibold mb-4">Transport</h3>
                    <p class="text-gray-700 mb-4">Convenient shuttle service to and from major airports.</p>
                    <Link to={`../${params.id}/transport`} class="text-blue-500 hover:text-blue-700 transition duration-300">Explore </Link>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Services