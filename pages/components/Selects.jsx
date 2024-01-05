import React from 'react'
import SelectsCard from './SelectsCard';

const Selects = () => {
  return (
    <div className='max-w-[1240px] mx-auto px-4 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
    <SelectsCard bg='/intercity.jpeg' text='Inter City' />
    <SelectsCard bg='/reserve.jpg' text='Reserve Rides' />
    <SelectsCard bg='/car.jpg' text='Rent' />
    
    </div>
  )
}

export default Selects