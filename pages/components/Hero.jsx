import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Hero = () => {
  return (
    <div className='w-full h-screen relative'>
      <video className='w-full h-full object-cover black-bg' autoPlay loop muted>
        <source src='/beachVid.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>
      <audio className='hidden' autoPlay loop muted>
        <source src='/music.mp3' type='audio/mp3' />
      </audio>
      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>
        <h1 className='text-3xl md:text-4xl font-bold'>Go Anywhere With CoRide.</h1>
        <h2 className='py-4 text-3xl font-bold'>We are the riders providers</h2>
        {/* Add your form or other content here */}
      </div>

      <style jsx>{`
        .black-bg {
          background-color: black;
        }

        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Hero;
