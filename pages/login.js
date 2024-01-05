import { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from '../firebase';
import Image from "next/image";
import logo from '../assets/rides/logo.jpg';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Selects from "./components/Selects";


const Login = () => {
    const router = useRouter();
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                router.push('/')
            }
        })
    })

    return (
        <div>
            <Navbar />
            <Hero />
            <Wrapper>
                <CenteredText>Our Vision</CenteredText>
                <Carousel />
            </Wrapper>
            <Wrapper>
              <CenteredText>Our Services</CenteredText>
            <Selects/>
            </Wrapper>
            <Footer/>
            
        </div>
    );
};

const Wrapper = tw.div`
    flex flex-col h-[600] w-screen bg-black p-4
`;

const SignInButton = tw.button`
    bg-black text-white text-center py-4 mt-8 self-center w-full 
`;

const UberLogo = tw.img`
    h-20 w-auto object-contain self-start
`;

const Title = tw.div`
    text-5xl pt-4 text-gray-500
`;

const LoginImage = tw.img`
    object-contain w-full
`;

const CenteredText = tw.h2`
text-white text-4xl font-bold text-center my-4
`;

export default Login;
