import { Link, useNavigate, useParams } from "react-router"

export default function BotLandingPage() {

    const params = useParams();
    const userId = params.id;

    const navigate = useNavigate();

    return <section className="w-full pt-10 h-screen">
        <section class="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-lg shadow-lg py-16 mx-10 mb-8 flex flex-col items-center text-center">
            <h1 class="text-3xl font-bold mb-4">Speak Easy, Understand All</h1>
            <p class="text-lg mb-8">Instantly translate using your voice.  Breaking down language barriers in Kenya.</p>
            <div class="flex items-center justify-center w-full">
                <button id="voice-translate-btn" class="bg-white hover:cursor-pointer text-blue-500 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out shadow-md flex items-center" onClick={() => navigate(`/${userId}/text-to-text`)}>    
                    <span class="mr-3">Text Translate</span>
                    <div class="voice-icon"></div>  </button>
            </div>
        </section>

        <div class="flex mx-16 mt-10 justify-between">
                <div class="border border-slate-400 p-4 rounded">
                    <h3 class="text-xl font-semibold mb-4">Finance</h3>
                    <p class="text-gray-700 mb-4">Reliable and comfortable bus services across the region.</p>
                    <Link to={`../${userId}/finance`} class="text-blue-500 hover:underline">Explore</Link>
                </div>
                <div class="border border-slate-400 p-4 rounded">
                    <h3 class="text-xl font-semibold mb-4">Medical</h3>
                    <p class="text-gray-600 mb-4">Reliable and comfortable bus services across the region.</p>
                    <Link to={`../${userId}/medical`} class="text-blue-500 hover:underline">Explore</Link>
                </div>
                <div class="border border-slate-400 p-4 rounded">
                    <h3 class="text-xl font-semibold mb-4">Transport</h3>
                    <p class="text-gray-700 mb-4">Convenient shuttle service to and from major airports.</p>
                    <Link to={`../${userId}/transport`} class="text-blue-500 hover:underline">Explore</Link>
                </div>
            </div>
    </section>
}