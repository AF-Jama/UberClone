import React, { useState } from 'react';

interface Props{
    text:string,
    imageURL?:string,
}


const CarSelectionButton:React.FC<Props> = ({ text, imageURL })=>{
    return <button className='px-4 py-2 bg-black w-full rounded-md'>{text}</button>
}



export default CarSelectionButton;