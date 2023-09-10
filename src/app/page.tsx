import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import CarSelectionButton from '@/Components/CarSelectionButton/CarSelectionButton';
import ChooseRideContainer from '@/Components/ChooseRideContainer/ChooseRideContainer';
import ChooseCar from '@/Components/ChooseCar/ChooseCar';
import Image from 'next/image'

const inter = Inter({
  weight:['300'],
  subsets:['latin'],
  display:'swap',
})

export default function Home() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center">
      {/* <ChooseRideContainer/> */}
      <div>
        <Link href={`/book`}>
          <button className={`px-12 py-4 bg-black rounded-lg ${inter.className} text-white font-extrabold`}>Get a ride</button>
        </Link>  
      </div>
    </main>
  )
}
