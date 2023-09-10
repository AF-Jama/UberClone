"use client";

import React from "react";
import { Roboto } from "next/font/google";
import { Inter } from "next/font/google";
import uberCar from '../../assets/images/uber-car.png';
import Image from "next/image";


const roboto = Roboto({
    weight:["700"],
    subsets:["latin"],
    display:"swap",
})

const inter = Inter({
    weight:["700"],
    subsets:["latin"],
    display:"swap",
})

interface Props{
    title:string,
    multiplier:number,
    description:string,
    image:string
    price:number,

}


const ChooseCar:React.FC<Props> = ({ title, description, multiplier, price, image })=>{





    return (
        <div className="flex items-center p-2 border rounded-lg">
            <div className="w-[85px] h-[85px] mr-2">
                <Image className="w-full h-full" src={image} alt=""/>
            </div>

            <div className="flex-1">
                <div className="sm:flex sm:justify-between">
                    <p className={`${roboto.className} text-black font-bold`}>{title}</p>
                    <p className="text-black font-sans text-xs -mt-1">{Math.round(Math.random()*10)} mins away</p>
                </div>
                <span className={`${roboto.className} text-black font-bold`}>${price*multiplier}</span>
            </div>
        </div>
    )
}



export default ChooseCar;