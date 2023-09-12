"use client";


import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { DirectionsService } from "@react-google-maps/api";
import { LocationData } from "@/types/types";
import reCenter from '../../assets/images/center.png';
import location from '../../assets/images/destination.png';
import { carData } from "@/utils/utils";
import Map from "../Map/Map";
import ChooseRideContainer from "../ChooseRideContainer/ChooseRideContainer";
import ChooseCar from "../ChooseCar/ChooseCar";
import styles from '../../styles/global.module.css';

const center = {
    lat:52.4486,
    lng:-2.0494,
}


const MapWrapper = ()=>{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY as string,
        libraries:['places','geocoding','places','maps','drawing','routes'],
    })
    const [map,setMap] = useState<google.maps.Map|null>(null);

      const [pickUpCoords,setPickUpCoords] = useState<{
        lat:number,
        lng:number,
      }|null>(null); // set query state

      const [destinationCoords,setDestinationCoords] = useState<{
        lat:number,
        lng:number
      }|null>(null); // set query state

      const [directionResult,setDirectionResult] = useState<google.maps.DirectionsResult|null>(null);
      const [distanceMatrix,setDistanceMatrix] = useState<google.maps.DistanceMatrixResponse|null>(null);
      
      const pickUpLocation = useRef<HTMLInputElement>(null);
      const destinationLocation = useRef<HTMLInputElement>(null);
      const router = useRouter();
      const searchParams = useSearchParams();


      const addLocationMarker = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault(); 

        if(!pickUpLocation.current?.value || !destinationLocation.current?.value) return;
        
        const pickUp = new google.maps.Geocoder();

        const pickUpLat = await pickUp.geocode({address:pickUpLocation.current.value})
        const destinationLat = await pickUp.geocode({address:destinationLocation.current.value})

        const pickUpEncoded = encodeURI(JSON.stringify({
            addressName:pickUpLocation.current.value,
            lat:pickUpLat.results[0].geometry.location.lat(),
            lng:pickUpLat.results[0].geometry.location.lng(),
            placeId:pickUpLat.results[0].place_id,
        }))


        const destinationEncoded = encodeURI(JSON.stringify({
            addressName:destinationLocation.current.value,
            lat:destinationLat.results[0].geometry.location.lat(),
            lng:destinationLat.results[0].geometry.location.lng(),
            placeId:destinationLat.results[0].place_id,
        }))

        router.push(`/book?pickup=${pickUpEncoded}&drop=${destinationEncoded}`);




      }

      const pickUpData = searchParams.get('pickup') as string;
      const dropData = searchParams.get('drop') as string;
      const  SURGE_CHARGE_RATE = 1.2;


      useEffect(()=>{
          
          const fetchDrivingRoute = async (originData:LocationData,destinationData:LocationData)=>{
            const directionService = new google.maps.DirectionsService();
            const distanceMatrix = new google.maps.DistanceMatrixService();

            const distanceMaxtrix = await distanceMatrix.getDistanceMatrix({
                origins:[originData.addressName],
                destinations:[destinationData.addressName],
                travelMode:google.maps.TravelMode.DRIVING,
                unitSystem:google.maps.UnitSystem.IMPERIAL,
            })

            const directionResult = await directionService.route({
                origin:originData.addressName,
                destination:destinationData.addressName,
                travelMode:google.maps.TravelMode.DRIVING,
                unitSystem:google.maps.UnitSystem.IMPERIAL
            })

            setDirectionResult(directionResult);
            setDistanceMatrix(distanceMaxtrix);
        }

        if(pickUpData && dropData){
            console.log("HIT");

            let originData = JSON.parse(pickUpData);
            let destinationData = JSON.parse(dropData);
            
            fetchDrivingRoute(originData,destinationData);
        }
    

      },[pickUpData,dropData,isLoaded])

      console.log(directionResult);

    return (
        <>

        <div id="map-container" className="h-[44vh] md:fixed md:inset-x-0 md:inset-y-0 md:h-auto">
            {isLoaded? <Map map={map} setMap={setMap} pickUpLat={pickUpCoords} destinationLat={destinationCoords} directionResult={directionResult}/>:<p>Loading Map</p>}
        </div>

        {
            isLoaded 

            &&

            <div className='max-w-xs mx-auto p-2 md:bg-gray-50 md:fixed md:top-1/2'>
                <h2 className={`text-xl text-black font-bold`}>Where can we pick you up</h2>

                {
                    directionResult && distanceMatrix
                    
                    ?

                    <div>
                        <div className="">
                            <div className="mb-2">
                                <input type="text" className="w-full p-2" value={distanceMatrix.originAddresses} readOnly={true} />
                            </div>
                            <div className="mb-2">
                                <input type="text" className="w-full p-2" value={distanceMatrix.destinationAddresses} readOnly={true} />
                            </div>
                        </div>

                        <div id="car-type-container" className={`grid grid-col-1 gap-3 h-60 overflow-y-scroll ${styles['no-scrollbar']}`}>
                            {
                                carData.map(element=>(
                                    <ChooseCar title={element.title} description={element.description} image={element.image} price={distanceMatrix.rows[0].elements[0].duration.value*SURGE_CHARGE_RATE} multiplier={element.multiplier} distance={distanceMatrix.rows[0].elements[0].distance.text} duration={distanceMatrix.rows[0].elements[0].duration.value} surcharge={SURGE_CHARGE_RATE} key={element.id}/>
                                ))
                            }
                        </div>
                    </div>

                    :
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

                }

                {
                    directionResult?<button className="w-full px-4 py-2 bg-black text-white rounded-md" onClick={addLocationMarker}>Select Car Type</button>:<button className="w-full px-4 py-2 bg-black text-white rounded-md" onClick={addLocationMarker}>Find Ride</button>
                }
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