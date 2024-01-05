import React, { useState } from 'react';
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from 'react-icons/bs';

const sliderData = [
  {
    url: '/v1.png',
  },
  {
    url: '/v2.png',
  },
  {
    url: '/v3.png',
  },
  {
    url: '/v4.jpg',
  }
];

// ... (other imports)

const Carousel = () => {
  const [slide, setSlide] = useState(0);
  const length = sliderData.length;

  const prevSlide = () => {
    setSlide(slide === length - 1 ? 0 : slide + 1);
  };

  const nextSlide = () => {
    setSlide(slide === 0 ? length - 1 : slide - 1);
  };

  return (
    <div className='max-w-[1240px] mx-auto px-4 py-16 relative flex justify-center items-center'>
      <BsArrowLeftSquareFill
        onClick={prevSlide}
        className='absolute top-[50%] text-3xl text-white cursor-pointer left-8'
      />
      <BsArrowRightSquareFill
        onClick={nextSlide}
        className='absolute top-[50%] text-3xl text-white cursor-pointer right-8'
      />
      {sliderData.map((item, index) => (
        <div key={index} className={index === slide ? 'opacity-100' : 'opacity-0'}>
          {index === slide && (
            <img className='w-[1200px] h-[500px] rounded-md' src={item.url} alt={`slide-${index}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
