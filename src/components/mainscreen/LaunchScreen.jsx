import React from 'react'
import BallTriangle from '../../CustomComponents/BallTriangle'
import logo from '../../assets/images/feathersoftwareslogo (1).webp'

const LaunchScreen = () => {
  return (
    <div className='w-screen h-screen flex flex-col gap-5  p-4  justify-center items-center text-3xl bg-gray-300'>
     <img src={logo} className='w-[400px] ' alt="" />
      <BallTriangle/>
    </div>
  )
}

export default LaunchScreen
