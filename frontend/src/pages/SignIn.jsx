import React, { useContext } from 'react'
import bg from "../assets/authBg.png"
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function SignIn() {

  const [showPassword, setShowPassword]=useState(false);

  const {ServerUrl,userData, setUserData}=useContext(userDataContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
       e.preventDefault()
       setErr("")
       setLoading(true)
    try {
      let result = await axios.post(`${ServerUrl}/api/auth/signin`, {email, password},{withCredentials: true});
      setUserData(result.data);
      setLoading(false)
      navigate("/")
      
    } 
    catch (error) {
      console.log(error);
      setUserData(null);
      setLoading(false);
      setErr(error.response.data.message);
    }
  }

  return (
    <div 
        className='w-full h-[100vh] bg-cover flex justify-center items-center ' 
        style={{backgroundImage: `url(${bg})`}}>

      <form 
          className='w-[90%] h-[650px] max-w-[550px] bg-[#00000069] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px]'
          onSubmit={handleSignIn}>

<h1 className='text-white text-[30px] font-semibold mb-[30px] '>Sign In to <span className ='text-blue-500'>Virtual Assistant</span></h1>

<input 
     type="email" 
     placeholder=' Email ' 
     className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' 
     required 
     value={email} 
     onChange={(e)=>setEmail(e.target.value)}/>

<div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>

  <input 
     type={showPassword ? "text" : "password"} 
     placeholder=' Password ' 
     className="w-full h-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px]" 
     required 
     value={password} 
     onChange={(e)=>setPassword(e.target.value)}/>

  {!showPassword && <IoEye className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' 
  onClick={()=>setShowPassword(true)}/>
  }

    {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] w-[25px] h-[25px] text-[white] cursor-pointer' 
    onClick={()=>setShowPassword(false)}/>
    }

</div>

{err && <p className='text-red-500 text-[18px]'>*{err}</p>}
<button 
    className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold text-[19px] bg-white rounded-full cursor-pointer' 
    disabled={loading}
    >{loading ? "Loading..." : "Sign In"}
</button>
  
<p 
   className='text-white text-[18px]' 
   onClick={()=>navigate("/signup")}>Want to create a new account? <span className='text-blue-500 cursor-pointer'>Sign Up</span>

</p>

      </form>
    </div>
  )
}

export default SignIn