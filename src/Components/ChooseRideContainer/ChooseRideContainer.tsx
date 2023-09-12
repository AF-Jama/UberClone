"use client";

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import location from '../../assets/images/destination.png';
import ChooseCar from '../ChooseCar/ChooseCar';
import Image from 'next/image';
import { LocationResult } from '@/types/types';
import styles from '../../styles/global.module.css';


const inter = Inter({
    weight:['600'],
    subsets:['latin'],
    display:'swap',
})

interface Props{
    Autocomplete:any,
}


const ChooseRideContainer:React.FC = ()=>{
    const [pickUpQuery,setPickUpQuery] = useState<string>(''); // set query state
    const [destinationQuery,setDestinationQuery] = useState<string>(''); // set query state
    // const { isLoading, error, data } = useQuery<LocationResult,Error>({queryFn:()=>fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=a&key=`).then(res=>res.json()),queryKey:[]});
    
    // console.log(data);
    
    
    // useEffect(()=>{
    //     const fetchData = async ()=>{
    //         let res = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=a&key=`);

    //         res = await res.json();

    //         console.log(res);
    //     }

    //     fetchData();
    // },[])




    return (
        <div className='max-w-xs mx-auto p-2 md:bg-gray-50 md:fixed md:top-1/2'>
            <h2 className={`text-xl text-black font-bold ${inter.className}`}>Where can we pick you up</h2>
            <div id="pickup-destination-search-container">
                <div id='pick-up-container' className='mb-2 relative'>
                    <Image className='w-6 h-6 absolute right-1 transform translate-y-1/2' src={location} alt=''/>
                   <input className='w-full px-4 py-2 text-black rounded-md outline-none' type="text" placeholder='Add a pickup location' onChange={(e)=>setPickUpQuery(e.target.value)} />   
                </div>

                <div id='pick-up-container' className='mb-2 relative'>
                <Image className='w-6 h-6 absolute right-1 transform translate-y-1/2' src={location} alt=''/>
                    <input className='w-full px-4 py-2 text-black rounded-md outline-none border-0' type="text" placeholder='Enter your destination'/>
                </div>
            </div>

            {/* <div className='h-32 overflow-y-scroll'>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
                <p className='text-red-700'>1</p>
            </div> */}

            {/* <div className={`grid grid-col-1 gap-2 h-56 overflow-y-scroll ${styles['no-scrollbar']}`}>
                <ChooseCar title='Uber Car' description='Affordable rides' price={8.99}/>
                <ChooseCar title='Uber Car' description='Affordable rides' price={8.99}/>
                <ChooseCar title='Uber Car' description='Affordable rides' price={8.99}/>
            </div> */}
        </div>
    )
}



export default ChooseRideContainer;