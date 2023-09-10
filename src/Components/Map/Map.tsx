"use client";

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};
  
const center = {
    lat:  51.509865,
    lng:  -0.118092
};

interface Props{
  map:google.maps.Map|null,
  setMap:React.Dispatch<React.SetStateAction<google.maps.Map|null>>,
  loc:{
    lat:number,
    lng:number,
  }
  setLoc:React.Dispatch<React.SetStateAction<{
    lat:number,
    lng:number,
  }>>,
  pickUpLat:{
    lat:number,
    lng:number,
  }|null,
  destinationLat:{
    lat:number,
    lng:number,
  }|null

}



const Map:React.FC<Props> = ({ map, setMap, loc, setLoc, pickUpLat, destinationLat })=>{

    //   const onLoad = React.useCallback(function callback(map) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);
    
    //     setMap(map)
    //   }, [])
    
    //   const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null)
    //   }, [])

    useEffect(()=>{
      setTimeout(()=>{
        setLoc({
          lat:52.4486,
          lng:-2.0494,
        })
      },1000)
    },[])


    return (
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={loc}
      zoom={10}            
      options={
        {
          zoomControl:false,
          streetViewControl:false,
          mapTypeControl:false,
          fullscreenControl:false,
        }
      }
      onLoad={map=>setMap(map)}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <Marker position={pickUpLat}/>
      <Marker position={destinationLat}/>
      <button className='text-red-500 '>SUCCESFULL</button>
    </GoogleMap>
    )
}



export default Map;