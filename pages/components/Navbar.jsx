import React, { useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {auth, provider} from '../../firebase'

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false)
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo)
  };
  const router= useRouter()
    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user){
                router.push('/')
            }
        })
    })

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
      <div className='text-3xl md:text-4xl font-bold'>
        <h1 onClick={handleNav} className={logo ? 'hidden' : 'block'}>CoRide.</h1>
      </div>
      <ul className='hidden md:flex'>
        <li className='transform hover:scale-105 transition p-4 cursor-pointer'>Home</li>
        <li className='transform hover:scale-105 transition p-4 cursor-pointer' >Vision</li>
        <li className='transform hover:scale-105 transition p-4 cursor-pointer' onClick={() => signInWithPopup(auth, provider)}>Sign Up</li>
        {/* <li className='transform hover:scale-105 transition'>About Us</li> */}
      </ul>
      <div className='hidden md:flex transform hover:scale-105 transition'>
        <BsPerson size={20} onClick={() => signInWithPopup(auth, provider)} className='cursor-pointer'/>
      </div>

      <div onClick={handleNav} className='md:hidden z-10'>
        {nav ? <AiOutlineClose className='text-black' size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

    </div>
  );
};

export default Navbar;
