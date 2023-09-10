"use client";


import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import reCenter from '../../assets/images/center.png';
import location from '../../assets/images/destination.png';
import Map from "../Map/Map";
import ChooseRideContainer from "../ChooseRideContainer/ChooseRideContainer";

const center = {
    lat:52.4486,
    lng:-2.0494,
}


const MapWrapper = ()=>{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY as string,
        libraries:['places'],
    })
    const [map,setMap] = useState<google.maps.Map|null>(null);
    const [loc,setLoc] = useState<{
        lat:number,
        lng:number,
      }>({
        lat:25.7867,
        lng:-80.1800
      })

      const [pickUpCoords,setPickUpCoords] = useState<{
        lat:number,
        lng:number,
      }>({
        lat:0.00,
        lng:0.00,
      }); // set query state
      const [destinationCoords,setDestinationCoords] = useState<{
        lat:number,
        lng:number
      }>({
        lat:0.00,
        lng:0.00,
      }); // set query state
      const pickUpLocation = useRef<HTMLInputElement>(null);
      const destinationLocation = useRef<HTMLInputElement>(null);
      const router = useRouter();
      const searchParams = useSearchParams();


      console.log(destinationLocation.current?.value);


      const addLocationMarker = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault(); 

        if(!pickUpLocation.current?.value || !destinationLocation.current?.value) return;

        console.log("HIT");
        const pickUp = new google.maps.Geocoder();

        const pickUpLat = await pickUp.geocode({address:pickUpLocation.current.value})
        const destinationLat = await pickUp.geocode({address:destinationLocation.current.value})

        console.log(pickUpLat.results[0].geometry.location.lat());

        setPickUpCoords({
            lat:pickUpLat.results[0].geometry.location.lat(),
            lng:pickUpLat.results[0].geometry.location.lng(),
        })

        setDestinationCoords({
            lat:destinationLat.results[0].geometry.location.lat(),
            lng:destinationLat.results[0].geometry.location.lng(),
        })

        const pickUpEncoded = encodeURI(JSON.stringify({
            addressName:pickUpLocation.current.value,
            lat:pickUpLat.results[0].geometry.location.lat(),
            lng:pickUpLat.results[0].geometry.location.lng(),
        }))


        const destinationEncoded = encodeURI(JSON.stringify({
            addressName:destinationLocation.current.value,
            lat:destinationLat.results[0].geometry.location.lat(),
            lng:destinationLat.results[0].geometry.location.lng(),
        }))

        router.push(`/book?pickup=${pickUpEncoded}&drop=${destinationEncoded}`);




      }

      const pickUpData = searchParams.get('pickup') as string;
      const dropData = searchParams.get('drop') as string;

      console.log(pickUpData);
      console.log(dropData);


      useEffect(()=>{

      },[])

    return (
        <>

        <div id="map-container" className="h-[44vh] border border-r-red-600 md:fixed md:inset-x-0 md:inset-y-0 md:h-auto">
            {isLoaded? <Map map={map} setMap={setMap} loc={loc} setLoc={setLoc} pickUpLat={pickUpCoords} destinationLat={destinationCoords}/>:<p>Loading Map</p>}
        </div>

        {
            isLoaded 

            &&

            <div className='max-w-xs mx-auto p-2 md:bg-gray-50 md:fixed md:top-1/2'>
                <h2 className={`text-xl text-black font-bold`}>Where can we pick you up</h2>
                <div id="pickup-destination-search-container">
                    <div id='pick-up-container' className='mb-2 relative'>
                        <Image className='w-6 h-6 absolute right-1 transform translate-y-1/2' src={location} alt=''/>
                        <Autocomplete >
                            <input className='w-full px-4 py-2 text-black rounded-md outline-none' type="text" placeholder='Add a pickup location' ref={pickUpLocation} />    
                        </Autocomplete>   
                    </div>

                    <div id='pick-up-container' className='mb-2 relative'>
                        <Image className='w-6 h-6 absolute right-1 transform translate-y-1/2' src={location} alt=''/>
                        <Autocomplete>
                            <input className='w-full px-4 py-2 text-black rounded-md outline-none border-0' type="text" placeholder='Enter your destination' ref={destinationLocation}/>
                        </Autocomplete>
                    </div>
                </div>

                <button className="w-full px-4 py-2 bg-black text-white rounded-md" onClick={addLocationMarker}>Find Ride</button>
            </div>
        }

        <div id="re-center" className="fixed top-0 right-0" onClick={()=>map?.panTo(center)}>
            <Image src={reCenter} className="w-10 h-10 object-contain" alt=""/>
        </div>

        {/* <div>
            <button className="w-full px-4 py-2 bg-blue-400 rounded-md" onClick={addLocationMarker}>Add Location Marker</button>
        </div> */}
        
        </>
    )
}



export default MapWrapper;