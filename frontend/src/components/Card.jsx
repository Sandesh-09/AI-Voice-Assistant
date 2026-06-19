import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext';

function Card({image}) {

    const {ServerUrl,userData, setUserData,backendImage, setBackendImage,frontendImage, setFrontendImage,selectedImage, setSelectedImage}=useContext(userDataContext);

  return (

    <div 
        className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-[0_0_20px_3px_rgb(59,130,246,0.7)] transition-all duration-300 ease-in-out cursor-pointer hover:border-[white] ${selectedImage===image?"border-[white] shadow-[0_0_20px_3px_rgb(59,130,246,0.7)]":null}`} onClick={()=>{
        setSelectedImage(image)
        setBackendImage(null);
        setFrontendImage(null);
        }}>
        <img src={image} className='h-full object-cover'/>
    </div>

  )
}

export default Card
