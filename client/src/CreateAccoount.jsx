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

import { SiChatbot } from "react-icons/si";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useState } from "react"
import { useNavigate } from "react-router";
import talk from './talk.png'
import bulb from './bulb.png'
import Loader from "./Loader";


export default function CreateAccount(){

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
    const [isEmailFocused, setIsEmailFocused] = useState('');

    const [enteredPassword, setInputPassword] = useState('');
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [confirmPassword, setInputConfirmPassword] = useState('');
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function formSubmissionHandler(e){
        e.preventDefault();

        if(enteredPhone.trim() === '' || enteredPassword.trim() === '' || confirmPassword.trim() === ''){
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
        const response = await fetch(`${AUTH_URL}/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: enteredPhone,
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
            navigate('../login')
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
        <form className="w-[50%] h-[100vh] bg-white pl-44" onSubmit={formSubmissionHandler}>
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
                <p className="font-medium">Phone <span className="text-[#173DB3]">*</span></p>
                <input
                    value={enteredPhone}
                    onChange={(e) => setInputPhone(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    className={`border border-slate-300 px-6 py-4 rounded-full w-full mt-4 ${isEmailFocused ? 'outline-none border-slate-400' : ''}`}
                    placeholder="e.g 0766347463"
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
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className={`border border-slate-300 px-6 py-4 rounded-full w-full mt-4 ${isPasswordFocused ? 'outline-none border-slate-400' : ''}`}
                    placeholder="min.4 characters"
                />
            </div>
            <div className="w-[60%] mt-8">
                <p className="font-medium">Confirm Password <span className="text-[#173DB3]">*</span></p>
                <input
                    type="password"
                    autoComplete="on"
                    minLength={4}
                    value={confirmPassword}
                    onChange={(e) => setInputConfirmPassword(e.target.value)}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                    className={`border border-slate-300 px-6 py-4 rounded-full w-full mt-4 ${isConfirmPasswordFocused ? 'outline-none border-slate-400' : ''}`}
                    placeholder="min.4 characters"
                />
            </div>
             <div className="w-[60%] mt-12">
                <button className="text-center border w-full py-4 rounded-full border-slate-300 font-medium hover:cursor-pointer bg-[#0258F8] text-white">Create Account</button>
            </div>
            {isLoading && <div className="flex justify-center mt-4 w-[60%]">
                <Loader/>
            </div>}
            {errorMsg.trim().length !== 0 && <p className="mt-8 text-[14px] text-red-500">{errorMsg}</p>}
            <div className="flex mt-10 space-x-4 font-medium">
                <p>Already have an account?</p>
                <button className="text-[#173DB3]" type="button" onClick={() => navigate('../login')}>Sign In</button>
            </div>
        </form>
        <div className="w-[50%]">
            <div className="flex justify-between mt-40 w-[88%]">
                <SiChatbot className="ml-24 mb-20 text-white" size={30}/>
                <img src={bulb} alt="pic" className="h-10"/>
            </div>
            <p className="w-[80%] mx-auto leading-8 font-medium text-[18px] text-white">Welcome to your AI-powered multilingual assistant! Our intelligent chatbot understands and communicates in multiple languages, making conversations effortless and natural. Whether you're chatting, translating, or seeking information, our AI ensures accuracy, clarity, and cultural relevance.Create your account today and unlock a world of seamless multilingual communication anytime, anywhere!</p>
            <img src={talk} alt="pic" className="ml-24 mt-20"/>
        </div>
    </section>
}