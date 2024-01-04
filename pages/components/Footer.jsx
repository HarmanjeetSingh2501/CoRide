import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='w-full bg-gray-100 py-16'>
      <div className='max-w-[1240px] mx-auto flex flex-col px-4'>
        <div className='sm:flex text-center justify-between items-center'>
          <h1 className='text-3xl md:text-4xl font-bold'>CoRide.</h1>
          <div className='flex justify-between w-full sm:max-w-[280px] my-4'>
            <FaFacebook className='icon' />
            <FaTwitter className='icon' />
            <FaYoutube className='icon' />
            <FaPinterest className='icon' />
            <FaInstagram className='icon' />
          </div>
        </div>
        <div className='flex justify-between'>
          <ul className='lg:flex'>
            <li className='p-4'>About</li>
            <li  className='p-4'>Partnerships</li>
            <li  className='p-4'>Careers</li>
            <li  className='p-4'>Newsroom</li>
            <li  className='p-4'>Advertising</li>
          </ul>
          <ul className='text-right lg:flex'>
            <li  className='p-4'>Home</li>
            <li  className='p-4'>Destinations</li>
            <li  className='p-4'>Travel</li>
            <li  className='p-4'>View</li>
            <li  className='p-4'>Book</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
