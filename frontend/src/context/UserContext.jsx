import React, { createContext, useState ,useEffect} from 'react'
import axios from 'axios';

export const userDataContext = createContext();
function UserContext({children}) {

  const ServerUrl="http://localhost:8000";

  

  const [userData, setUserData]=useState(null);
  const [frontendImage, setFrontendImage]=useState(null);
  const [backendImage, setBackendImage]=useState(null);
  const[selectedImage, setSelectedImage]=useState(null);
  
  const handleCurrentUser=async()=>{
    try {
      const result=await axios.get(`${ServerUrl}/api/user/current`,{withCredentials: true});
      setUserData(result.data);
      console.log(result.data);
    } 
    catch (error) {
      console.log(error);
    }
  }

  const getGeminiResponse=async(command)=>{
      try {
        const result = await axios.post(`${ServerUrl}/api/user/asktoassistant`, {command},{withCredentials: true});

        return result.data
      } 
      catch (error) {
        console.log(error);
      }
  }

  useEffect(()=>{
    handleCurrentUser();
  },[])

  const value={ServerUrl,userData, setUserData,backendImage, setBackendImage,frontendImage, setFrontendImage,selectedImage, setSelectedImage, getGeminiResponse};

  return (
    <div>
      <userDataContext.Provider value={value}>
      {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext