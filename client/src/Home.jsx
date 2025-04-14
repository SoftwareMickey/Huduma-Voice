import pimbi from './voice.jpg'
import bulb from './bulb.jpg'
import { useNavigate } from 'react-router'
import sound from './sound.png'

export default function Home(){

    const navigate = useNavigate();

    function navigateToLogin(){
        navigate('login')
    }

    return (
        <>
         <div className="bg-gray-100 font-sans">
         <div className="container mx-auto px-4 py-10">
         <section class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg shadow-lg py-16 px-10 mb-8 flex flex-col items-center text-center">
            <h1 class="text-3xl font-bold mb-4">Speak Easy, Understand All</h1>
            <p class="text-lg mb-8">Instantly translate using your voice.  Breaking down language barriers in Kenya.</p>
            <div class="flex items-center justify-center w-full">
                <button id="voice-translate-btn" class="bg-white text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out shadow-md flex items-center"
                onClick={navigateToLogin}>
                Get Started
                                 </button>
            </div>
        </section>

        <section class="bg-white rounded-lg shadow-md py-10 px-8 mb-8">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Key Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="service-card bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
                    <h3 class="text-xl font-semibold text-teal-500 mb-4">Image Translation</h3>
                    <p class="text-gray-700 mb-4">Upload an image and get the text translated.</p>
                </div>
                <div class="service-card bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
                    <h3 class="text-xl font-semibold text-teal-500 mb-4">Wide Language Support</h3>
                    <p class="text-gray-700 mb-4">Translate to and from many Kenyan languages.</p>
                </div>
                <div class="service-card bg-gray-100 rounded-lg p-6 flex flex-col justify-between">
                    <h3 class="text-xl font-semibold text-teal-500 mb-4">User-Friendly Interface</h3>
                    <p class="text-gray-700 mb-4">Simple and intuitive design for all users.</p>
                </div>
            </div>
        </section>

        <footer class="bg-gray-800 text-white rounded-lg py-4 px-8 text-center">
            <p>© 2025 Kenya Language Bridge. All rights reserved.</p>
        </footer>
        </div>
        </div>
        </>
    )
}