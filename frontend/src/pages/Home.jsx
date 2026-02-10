// import React, { use, useContext, useEffect, useRef, useState } from 'react'
// import { userDataContext } from '../context/userContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import aiImg from '../assets/ai.gif';
// import userImg from '../assets/user.gif';
// import { CgMenuRight } from "react-icons/cg";
// import { ImCross } from "react-icons/im";

// function Home() {

// const {userData,ServerUrl,setUserData,getGeminiResponse}=useContext(userDataContext);
// const navigate=useNavigate();
// const [listening, setListening] = useState(false);
// const [userText, setUserText] = useState("");
// const [aiText, setAiText] = useState("");
// const isSpeakingRef=useRef(false);
// const recognitionRef=useRef(null);
// const isRecognizingRef=useRef(false);
// const [ham, setHam]=useState(false);
// const synth=window.speechSynthesis;

// const handleLogOut=async()=>{
//   try {
//     const result=await axios.get(`${ServerUrl}/api/auth/logout`,{withCredentials: true});
//     setUserData(null);
//     navigate("/signin");
//   } 
//   catch (error) {
//     setUserData(null);
//     console.log(error);
//   }
// }


// const startRecognition=()=>{
//   if(!isSpeakingRef.current && !isRecognizingRef.current){
    
//     try {
//       recognitionRef.current?.start();
//       setListening(true);
//     } catch (error) {
//       if(!error.message.includes("start")){
//         console.log("Recognition error:", error);
//       }
//     }
//   }
// }


// const speak=(text)=>{
//   const utterence=new SpeechSynthesisUtterance(text);

//    utterence.lang = 'hi-IN'; 
//    const voices =window.speechSynthesis.getVoices();
//    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
//    if (hindiVoice) {
//    utterence.voice = hindiVoice;
//    }

//   isSpeakingRef.current=true;
//   utterence.onend=()=>{
//     setAiText("")
//     isSpeakingRef.current=false;

//     setTimeout(()=>{
//       startRecognition();
//     },800);
//   };
//   synth.cancel();
//   synth.speak(utterence);
// }

// const handleCommand=(data)=>{

//   const {type,userInput,response}=data;
//   speak(response);

// if (type === "google_search") {
//   const query = encodeURIComponent(userInput);
//   window.open(`https://www.google.com/search?q=${query}`, "_blank");
// }

// if (type === "youtube_search") {
//   const query = encodeURIComponent(userInput);
//   window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
// }

// if (type === "youtube_play") {
//   const query = encodeURIComponent(userInput);
//   window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
// }

// if (type === "instagram_open") {
//   window.open("https://www.instagram.com/", "_blank");
// }

// if (type === "facebook_open") {
//   window.open("https://www.facebook.com/", "_blank");
// }

// if (type === "calculator_open") {
//   window.open("https://www.google.com/search?q=calculator", "_blank");
// }

// if (type === "weather-show") {
//   const query = encodeURIComponent(userInput.replace(/weather/i, "").trim() || "current location");
//   window.open(`https://www.google.com/search?q=weather+${query}`, "_blank");
// }
// }



// useEffect(()=>{
//     const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

//     const recognition=new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang="en-US";
//     recognition.interimResults = false;

//     recognitionRef.current=recognition;

//     let isMounted = true;

//     const startTimeout=setTimeout(()=>{
//       if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){

//          try {
//               recognition.start();
//               console.log("Recognition requested to start");
//               } 
//          catch (err) {
//             if (err.name !== "InvalidStateError") {
//               console.error("Start error:", err);
//           }
//          }
//         }
//       },1000);

//       recognition.onstart=()=>{
//         console.log("recognition started");
//         isRecognizingRef.current=true
//         setListening(true);
//       }

//       recognition.onend=()=>{
//         console.log("recognition ended");
//         isRecognizingRef.current=false
//         setListening(false);
//         if(!isMounted && !isSpeakingRef.current){
//           setTimeout(()=>{
//             if(isMounted){
//               try {
//                 recognition.start();
//                 console.log("Recognition restarted");
//               } catch (error) {
//                 if(error.name !== "InvalidStateError"){
//                   console.error("Start error:", error);
//                 }
//               }
//             }
//           },1000);
//         }
//         };

//       recognition.onerror = (event) => {
//         console.warn("Recognition error:", event.error);
//         isRecognizingRef.current = false;
//         setListening(false);

//       if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
//         setTimeout(() => {
//          if(isMounted){
//           try {
//             recognition.start();
//             console.log("Recognition restarted");
//           } catch (error) {
//             if(error.name !== "InvalidStateError"){
//               console.error("Start error:", error);
//             }
//           }
//          }
//          }, 1000);
// }
// };

//      recognition.onresult=async (e)=>{
     
//         const transcript = e.results[e.results.length-1][0].transcript.trim();
//         console.log("heared : "+ transcript);
        
//         if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){

//           setAiText("");
//           setUserText(transcript);
//           recognition.stop();
//           isRecognizingRef.current=false
//           setListening(false);

//          const data = await getGeminiResponse(transcript);
//          console.log(data);
//          handleCommand(data);
//          setAiText(data.response);
//          setUserText("");
//         } 
//      }

     
//        const greeting=new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
//        greeting.lang="hi-IN";
//        window.speechSynthesis.speak(greeting);

// return ()=>{
//   isMounted=false;
//   clearTimeout(startTimeout);
//    recognition.stop()
//    setListening(false)
//    isRecognizingRef.current=false
// }

// },[])

//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px] overflow-hidden'>

//       <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer' onClick={()=>setHam(true)}/>

//       <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000055] backdrop-blur-lg z-20 p-[20px] flex flex-col gap-[20px] items-start ${ham?"translate-x-0":"translate-x-full"} transition-transform duration-500`}>

//       <ImCross className=' text-white absolute top-[25px] right-[25px] w-[25px] h-[25px] cursor-pointer' onClick={()=>{setHam(false)}}/>

//       <button 
//         className='min-w-[150px] h-[60px] text-black font-semibold text-[19px] bg-white
//          rounded-full  cursor-pointer' onClick={handleLogOut}
//         >Log Out</button>

//       <button 
//         className='min-w-[150px] h-[60px] text-black font-semibold text-[19px] bg-white
//          rounded-full px-[20px] py-[10px] cursor-pointer'
//         onClick={()=>navigate("/customize")}
//       >Customize your assistant</button>

//       <div className='w-full h-[2px] bg-gray-400'></div>

//       <h1 className='text-white text-[25px] font-semibold'>History</h1>

//       <div className='w-full h-[500px] gap-[20px] overflow-y-auto flex flex-col truncate'>

//         {userData.history?.map((his)=>(
//           <span className='text-gray-200 text-[18px] w-full h-[30px] '>{his}</span>
//         ))
//         }
//       </div>

//       </div>

//       <button 
//         className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold text-[19px] bg-white
//         absolute hidden lg:block top-[18px] right-[20px]  rounded-full  cursor-pointer' onClick={handleLogOut}
//         >Log Out</button>

//       <button 
//         className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold text-[19px] bg-white
//         absolute hidden lg:block top-[100px] right-[20px] rounded-full px-[20px] py-[10px] cursor-pointer'
//         onClick={()=>navigate("/customize")}
//       >Customize your assistant</button>

//     <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-[0_0_20px_3px_rgb(59,130,246,0.7)]'>
//         <img src={userData?.assistantImage} className=' h-full object-cover'/>

//     </div>
       
//      <h1 className='text-white text-[32px] font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]'>I’m {userData?.assistantName}
//      </h1>

//      {!aiText && <img src={userImg} alt="" className='w-[200px]'/>}
//      {aiText && <img src={aiImg} alt="" className='w-[200px]'/>}

//      <h1 className='text-white text-[20px] font-semibold text-wrap text-center'>{userText?userText:aiText?aiText:null}</h1>

//     </div>
//   )
// }


//  export default Home;



























import React, { useContext, useEffect, useRef, useState } from 'react'
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from '../assets/ai.gif';
import userImg from '../assets/user.gif';
import { CgMenuRight } from "react-icons/cg";
import { ImCross } from "react-icons/im";

function Home() {

  const {userData,ServerUrl,setUserData,getGeminiResponse}=useContext(userDataContext);
  const navigate=useNavigate();
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const isSpeakingRef=useRef(false);
  const recognitionRef=useRef(null);
  const isRecognizingRef=useRef(false);
  const [ham, setHam]=useState(false);
  const synth=window.speechSynthesis;

  // ---------- Chat states (ADDED) ----------
  const [messages, setMessages] = useState([]);           // chat messages list
  const [chatInput, setChatInput] = useState("");         // input box value
  const chatEndRef = useRef(null);                       // auto-scroll ref
  // ------------------------------------------

  const handleLogOut=async()=>{
    try {
      const result=await axios.get(`${ServerUrl}/api/auth/logout`,{withCredentials: true});
      setUserData(null);
      navigate("/signin");
    } 
    catch (error) {
      setUserData(null);
      console.log(error);
    }
  }


  const startRecognition=()=>{
    if(!isSpeakingRef.current && !isRecognizingRef.current){
      try {
        recognitionRef.current?.start();
        setListening(true);
      } catch (error) {
        if(!error.message.includes("start")){
          console.log("Recognition error:", error);
        }
      }
    }
  }


  const speak=(text)=>{
    const utterence=new SpeechSynthesisUtterance(text);

    utterence.lang = 'hi-IN'; 
    const voices =window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterence.voice = hindiVoice;
    }

    isSpeakingRef.current=true;
    utterence.onend=()=>{
      setAiText("")
      isSpeakingRef.current=false;

      setTimeout(()=>{
        startRecognition();
      },800);
    };
    synth.cancel();
    synth.speak(utterence);
  }

  const handleCommand=(data)=>{

    const {type,userInput,response}=data;

    // update chat messages from voice flow (ADDED)
    // push both user & ai messages if userInput exists
    if (userInput) {
      setMessages(prev => [...prev, { from: "user", text: userInput }]);
    }
    setMessages(prev => [...prev, { from: "ai", text: response }]);

    speak(response);

    if (type === "google_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
    }

    if (type === "youtube_play") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank");
    }

    if (type === "instagram_open") {
      window.open("https://www.instagram.com/", "_blank");
    }

    if (type === "facebook_open") {
      window.open("https://www.facebook.com/", "_blank");
    }

    if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    }

    if (type === "weather-show") {
      const query = encodeURIComponent(userInput.replace(/weather/i, "").trim() || "current location");
      window.open(`https://www.google.com/search?q=weather+${query}`, "_blank");
    }
  }


  useEffect(()=>{
    const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition=new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang="en-US";
    recognition.interimResults = false;

    recognitionRef.current=recognition;

    let isMounted = true;

    const startTimeout=setTimeout(()=>{
      if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){

         try {
              recognition.start();
              console.log("Recognition requested to start");
              } 
         catch (err) {
            if (err.name !== "InvalidStateError") {
              console.error("Start error:", err);
            }
         }
        }
      },1000);

      recognition.onstart=()=>{
        console.log("recognition started");
        isRecognizingRef.current=true
        setListening(true);
      }

      recognition.onend=()=>{
        console.log("recognition ended");
        isRecognizingRef.current=false
        setListening(false);
        if(!isMounted && !isSpeakingRef.current){
          setTimeout(()=>{
            if(isMounted){
              try {
                recognition.start();
                console.log("Recognition restarted");
              } catch (error) {
                if(error.name !== "InvalidStateError"){
                  console.error("Start error:", error);
                }
              }
            }
          },1000);
        }
        };

      recognition.onerror = (event) => {
        console.warn("Recognition error:", event.error);
        isRecognizingRef.current = false;
        setListening(false);

      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
         if(isMounted){
          try {
            recognition.start();
            console.log("Recognition restarted");
          } catch (error) {
            if(error.name !== "InvalidStateError"){
              console.error("Start error:", error);
            }
          }
         }
         }, 1000);
}
};

     recognition.onresult=async (e)=>{
     
        const transcript = e.results[e.results.length-1][0].transcript.trim();
        console.log("heared : "+ transcript);
        
        if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){

          setAiText("");
          setUserText(transcript);
          recognition.stop();
          isRecognizingRef.current=false
          setListening(false);

         const data = await getGeminiResponse(transcript);
         console.log(data);
         handleCommand(data);
         setAiText(data.response);
         setUserText("");
        } 
     }

     
       const greeting=new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you with?`);
       greeting.lang="hi-IN";
       window.speechSynthesis.speak(greeting);

return ()=>{
  isMounted=false;
  clearTimeout(startTimeout);
   recognition.stop()
   setListening(false)
   isRecognizingRef.current=false
}

},[])

  // Auto-scroll chat to bottom whenever messages change (ADDED)
  useEffect(() => {
    if (chatEndRef.current) {
      try {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (e) {
        // ignore
      }
    }
  }, [messages]);

  // Send typed chat (ADDED)
  const sendTypedMessage = async () => {
    const text = chatInput.trim();
    if (!text) return;
    // add user message
    setMessages(prev => [...prev, { from: "user", text }]);
    setChatInput("");
    // call your existing backend function
    try {
      const data = await getGeminiResponse(text);
      const reply = data?.response || "Sorry, no response.";
      setMessages(prev => [...prev, { from: "ai", text: reply }]);
      setAiText(reply);
      // speak response (optional) — keeping behavior consistent with voice flow:
      speak(reply);
    } catch (err) {
      console.log("chat send error", err);
      setMessages(prev => [...prev, { from: "ai", text: "Error contacting server." }]);
    }
  }

  // allow Enter to send (ADDED)
  const handleChatKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendTypedMessage();
    }
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px] overflow-hidden relative'>

      {/* Left Chat Section (ADDED) */}
      <div className='absolute left-5 top-[50%] -translate-y-[50%] w-[350px] h-[80vh] bg-[#0b0b2a80] border border-blue-500 rounded-2xl p-4 shadow-[0_0_15px_2px_rgb(59,130,246,0.6)] flex flex-col overflow-hidden z-30'>
        <h2 className='text-white font-semibold text-[20px] mb-2'>Chat</h2>

        <div className='flex-1 overflow-y-auto space-y-3 pr-2'>
          {messages.map((msg, index) => (
            <div key={index} className={`w-fit max-w-[80%] px-3 py-2 rounded-lg text-white ${msg.from === "user" ? "bg-blue-600 self-end ml-auto" : "bg-gray-700 self-start"}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className='mt-3 flex gap-2'>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleChatKey}
            placeholder="Ask Anything..."
            className='flex-1 bg-[#0b0b2a] text-white border border-blue-500 rounded-l-2xl px-4 py-3 outline-none'
          />
          <button onClick={sendTypedMessage} className='bg-blue-600 text-white px-5 py-3 rounded-r-2xl font-semibold hover:bg-blue-700 transition-all'>Send</button>
        </div>
      </div>

      <CgMenuRight className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px] cursor-pointer' onClick={() => setHam(true)} />

      <div className={`absolute lg:hidden top-0 w-full h-full bg-[#00000055] backdrop-blur-lg z-20 p-[20px] flex flex-col gap-[20px] items-start ${ham ? "translate-x-0" : "translate-x-full"} transition-transform duration-500`}>
        <ImCross className=' text-white absolute top-[25px] right-[25px] w-[25px] h-[25px] cursor-pointer' onClick={() => { setHam(false) }} />

        <button className='min-w-[150px] h-[60px] text-black font-semibold text-[19px] bg-white rounded-full cursor-pointer' onClick={handleLogOut} >Log Out</button>

        <button className='min-w-[150px] h-[60px] text-black font-semibold text-[19px] bg-white rounded-full px-[20px] py-[10px] cursor-pointer' onClick={() => navigate("/customize")}>Customize your assistant</button>

        <div className='w-full h-[2px] bg-gray-400'></div>

        <h1 className='text-white text-[25px] font-semibold'>History</h1>

        <div className='w-full h-[500px] gap-[20px] overflow-y-auto flex flex-col truncate'>
          {userData.history?.map((his) => (
            <span key={his} className='text-gray-200 text-[18px] w-full h-[30px] '>{his}</span>
          ))
          }
        </div>

      </div>

      <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold text-[19px] bg-white absolute hidden lg:block top-[18px] right-[20px]  rounded-full  cursor-pointer' onClick={handleLogOut}
      >Log Out</button>

      <button className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold text-[19px] bg-white absolute hidden lg:block top-[100px] right-[20px] rounded-full px-[20px] py-[10px] cursor-pointer'
        onClick={() => navigate("/customize")}
      >Customize your assistant</button>

    <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-[0_0_20px_3px_rgb(59,130,246,0.7)]'>
        <img src={userData?.assistantImage} className=' h-full object-cover'/>

    </div>
       
     <h1 className='text-white text-[32px] font-semibold tracking-wide drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]'>I’m {userData?.assistantName}
     </h1>

     {!aiText && <img src={userImg} alt="" className='w-[200px]'/>}
     {aiText && <img src={aiImg} alt="" className='w-[200px]'/>}

     <h1 className='text-white text-[20px] font-semibold text-wrap text-center'>{userText?userText:aiText?aiText:null}</h1>

    </div>
  )
}

export default Home;
