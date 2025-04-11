import { useState } from "react"
import { useDispatch } from "react-redux";
import { projectActions } from "./src/store";
import { useNavigate, useParams } from "react-router";

export default function LanguageChooser(){

    const dispath = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const [selectedLanguage, setSelectedLanguage] = useState('english');

    async function handleLanguageSelection(){
        dispath(projectActions.addLanguageHandler(selectedLanguage))

        navigate(`../${params.id}/dashboard`)
    }

    return <section className={`flex flex-col items-center justify-center h-screen `}>
        <p className="font-bold text-[30px] mb-6 text-slate-800">Choose Your Language</p>
        <div className="w-[20%] mx-auto space-y-6">
            <div className={`flex items-center justify-between ${selectedLanguage === 'english' ? 'border border-purple-500' : 'border border-slate-300'} text-[13px] px-4 py-2 rounded`}>
                <p>English</p>
                <input 
                    checked={selectedLanguage === 'english'}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    type="radio" 
                    name="language" 
                    value="english"
                    className="checked:border checked:border-purple-500 hover:cursor-pointer"/>
            </div>
            <div className={`flex items-center justify-between ${selectedLanguage === 'swahili' ? 'border border-purple-500' : 'border border-slate-300'} text-[13px] px-4 py-2 rounded`}>
                <p>Swahili</p>
                <input 
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    checked={selectedLanguage === 'swahili'}
                    type="radio" 
                    name="swahili" 
                    value="swahili" 
                    className="checked:border checked:border-purple-500 hover:cursor-pointer"/>
            </div>

            <button className="text-center bg-gradient-to-br from-blue-500 to-purple-500 text-white w-full py-2 rounded text-[13px] hover:cursor-pointer" onClick={handleLanguageSelection}>Continue</button>
        </div>
    </section>
}