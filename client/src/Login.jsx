// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVb3NM1dh-4jaMt_-sFJkFrINBHclvkfs",
  authDomain: "project-ai-mmust.firebaseapp.com",
  projectId: "project-ai-mmust",
  storageBucket: "project-ai-mmust.firebasestorage.app",
  messagingSenderId: "79714913137",
  appId: "1:79714913137:web:2f1753cd12a0de90f244d0",
  measurementId: "G-G06L0Y1QH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useState } from "react"
import { useNavigate } from "react-router";
import { SiChatbot } from "react-icons/si";
import Loader from "./Loader";


export default function Login(){

    const AUTH_URL = import.meta.env.VITE_API_URL;

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    function continueWithGoogle(){
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(`Token : ${token}`)
            // The signed-in user info.
            const user = result.user;
            console.log(`Signed In User : ${user}`)

            if(user.emailVerified){
                navigate('../dashboard')
            }
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            console.log(`Error : ${error}`)
        });
    }

    const [enteredPhone, setInputPhone] = useState('');
    const [enteredPassword, setInputPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    async function formSubmissionHandler(e){
        e.preventDefault();

        if(enteredPhone.trim() === '' || enteredPassword.trim() === ''){
            setErrorMsg('Kindly fill all the required fields')

            setTimeout(() => {
                setErrorMsg('')
            },3000)
            return
        }

        if(enteredPassword.trim().length < 4){
            setErrorMsg('Password must be a minimum of 4 characters')
            setTimeout(() => {
                setErrorMsg('')
            },3000)
            return
        }

        const isLocalNumber = /^(07\d{8}|01\d{8})$/.test(enteredPhone);
        const isInternationalNumber = /^\+2547\d{8}$/.test(enteredPhone);
    
        if (enteredPhone.trim().length >= 10) {
            console.log(isLocalNumber)
            console.log(isInternationalNumber)
            if ((isLocalNumber === false) && (isInternationalNumber === false)) {
                setErrorMsg('Invalid Kenyan number format. Must start with 07, 01, or +2547 and be 10 or 13 digits long.');

                setTimeout(() => {
                    setErrorMsg('')
                },3000)
                return
            }
        }else{
            setErrorMsg('Number is less than 10 digits');
            setTimeout(() => {
                setErrorMsg('')
            },3000)
            return
        }

        setIsLoading(true)
        const response = await fetch(`${AUTH_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phoneNumber: enteredPhone,
                password: enteredPassword
            })
        })

        if(response.ok){
            const data = await response.json()
            console.log(data)
            setIsLoading(false)

            setInputPhone('')
            setInputPassword('')

            // * used to navigate between pages
            navigate(`../${data.user.id}/dashboard`)
        }else{
            const data = await response.json()
            console.log(data)

            setTimeout(() => {
                setErrorMsg('')
            },3000)
            setErrorMsg(data.message)
            setIsLoading(false)
        }
    } 

    return <section className="bg-[#173DB3] h-[100vh] flex">
        <form className="w-[50%] space-y-8 h-[100vh] bg-white pl-44" onSubmit={formSubmissionHandler}>
            <p className="mt-20 text-[30px] font-bold">Huduma Voice</p>
            <p className="text-[18px] font-medium text-slate-600 mt-10">See your growth and get consulting support</p>
            {/* <button className="mt-10 border border-slate-300 flex justify-center w-[60%] space-x-3 px-4 py-4 rounded-full hover:cursor-pointer" type="button" onClick={continueWithGoogle}>
                <img src={google} alt="pic" className="h-8"/>
                <p className="text-[18px] mt-[2px] font-medium">Sign In with Google</p>
            </button>
            <div className="mt-10 flex space-x-4 w-[60%]">
                <hr className="text-slate-300 w-[32%] mt-3"/>
                <p className="text-slate-600 font-medium">or Sign with Email</p>
                <hr className="text-slate-300 w-[32%] mt-3"/>
            </div> */}
            <div className="w-[60%] mt-8">
                <p className="font-medium">Phone Number<span className="text-[#173DB3]">*</span></p>
                <input
                    value={enteredPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    className={`border border-slate-300 px-6 py-4 rounded-full w-full mt-4 focus:outline-none focus:border-slate-400`}
                    placeholder="e.g. 0712345678"
                />
            </div>
            <div className="w-[60%] mt-8">
                <p className="font-medium">Password <span className="text-[#173DB3]">*</span></p>
                <input
                    type="password"
                    autoComplete="on"
                    minLength={4}
                    value={enteredPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    className={`border border-slate-300 px-6 py-4 rounded-full w-full mt-4 focus:outline-none focus:border-slate-400`}
                    placeholder="min.4 characters"
                />
            </div>
             <div className="w-[60%] mt-12">
                <button className="text-center border w-full py-4 rounded-full border-slate-300 font-medium hover:cursor-pointer bg-[#0258F8] text-white">Login</button>
            </div>
            {isLoading && <div className="flex justify-center mt-4 w-[60%]">
                <Loader/>
            </div>}
            {errorMsg.trim().length !== 0 && <p className="mt-8 text-[16px] font-medium text-red-500 text-center w-[60%]">{errorMsg}</p>}
            <div className="flex mt-10 space-x-4 font-medium">
                <p>Not registered yet?</p>
                <button className="text-[#173DB3]" type="button" onClick={() => navigate('../createaccount')}>Create An Account</button>
            </div>
        </form>
        <div className="w-[50%] text-white">
            <div className="flex flex-col items-center mt-96 uppercase text-[20px]">
                <SiChatbot size={60} className="mb-10"/>
                <p>LEGISLATIVE</p>
                <p>INTELLIGENCE</p>
            </div>
        </div>
    </section>
}