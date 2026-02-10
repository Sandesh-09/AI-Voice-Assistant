import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { IoArrowBackOutline } from "react-icons/io5";

import Card from '../components/Card'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'

function Customize() {

const {ServerUrl,userData, setUserData,backendImage, setBackendImage,frontendImage, setFrontendImage,selectedImage, setSelectedImage}=useContext(userDataContext);
const inputImage=useRef();
const navigate=useNavigate();

const handleImage=(e)=>{
  e.preventDefault();
  const file=e.target.files[0];
  setBackendImage(file);
  setFrontendImage(URL.createObjectURL(file));
  console.log(frontendImage);
}

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] '>
      <IoArrowBackOutline className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[35px] h-[35px]' onClick={()=>navigate("/")}/>

      <h1 className='text-white text-[50px] mb-[40px] text-center'>Select your <span className='text-sky-400'>Assistant Image</span>

      </h1>

      <div className='w-90% max-w-[900px] flex justify-center items-center flex-wrap gap-[30px]'>
          <Card image={image1}/>
          <Card image={image2}/>
          <Card image={image3}/>
          <Card image={image4}/>
          <Card image={image5}/>
          <Card image={image6}/>
          <Card image={image7}/>

         <div 
           className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:shadow-[0_0_20px_3px_rgb(59,130,246,0.7)] transition-all duration-300 ease-in-out cursor-pointer hover:border-[white] flex justify-center items-center  ${selectedImage==="input"?"border-[white] shadow-[0_0_20px_3px_rgb(59,130,246,0.7)]":null}`} 
           onClick={()=>{
            inputImage.current.click()
            setSelectedImage("input")
            }}>

            {!frontendImage && <RiImageAddLine className='text-white w-[25px] h-[25px]'/>}
            {frontendImage && <img src={frontendImage} className='h-full object-cover' />}

         </div>
          
         <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
       </div>
       {selectedImage && <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold text-[19px]  bg-white rounded-full cursor-pointer' onClick={()=>navigate("/customize2")}>Next</button>}
       
    </div>
  )
}

export default Customize