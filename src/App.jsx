import React, { Suspense, useEffect } from 'react';
import './App.css';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import Model from './Harmonica';
import { array } from './Harmonica';
import Countdown from 'react-countdown';
import { ResizeObserver } from "@juggle/resize-observer";

function Loader() {
  const { progress } = useProgress()
  return (
    <Html>
      <div className="loader">
        <div className="loader__inner">
          <div className="loader__inner__text"> {Math.round(progress)}% </div>
        </div>
      </div>
    </Html>
  );
}

function App() {
  

  const [recording, setRecording] = React.useState(false);

  const [buttonColour, setButtonColour] = React.useState('#808080');
  const [mobile, setMobile] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [fov, setFov] = React.useState(60);

  const [screenStyle, setScreenStyle] = React.useState("absolute top-0 h-[100vh] w-full bg-slate-600 bg-black z-20");
  /*const RecordingButton = () => {

    if(recording === true) {
      setRecording(false);
      array.poly.recorder.stop()
      setButtonColour("#808080");
    }
    else { setRecording(true); array.poly.recorder.start(); setButtonColour("#FF0000"); }

  }*/
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
    } else {
      // Render a countdown
      return <span className="absolute bottom-28 md:bottom-10 left-1/2 -translate-x-1/2 text-6xl md:text-8xl not-selectable font-sans">{days}:{hours}:{minutes}:{seconds}</span>;
    }
  };
  const menuRenderer = ({ days, hours, minutes, seconds, completed }) => {

      // Render a countdown
      return <span className="absolute text-white bottom-28 md:bottom-10 left-1/2 -translate-x-1/2 text-6xl md:text-8xl not-selectable font-sans">{days}:{hours}:{minutes}:{seconds}</span>;
  };

  useEffect(() => {
  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)) {  
    setMobile(true);
    setRotation(190);
  }else if (navigator.userAgentData?.mobile)  {
    setMobile(true);
    setRotation(190);
  }
  console.log(mobile);
  }, [])

  useEffect(() => {
    if(mobile === true) {
      setFov(98);
    }
    else {
      setFov(60);
    }
  }, [mobile])
//    <svg xmlns="http://www.w3.org/2000/svg" style={{height:"3rem",width:"3rem"}} viewBox="0 0 20 20" fill={buttonColour}>
// <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
// </svg>
  return (
    <div className="h-[100vh] w-full bg-[#585758] touch-none overflow-hidden fixed">
    <button className={screenStyle} onClick={()=>{setScreenStyle("hidden")}}>
      <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-white font-sans text-5xl md:text-8xl'>who is the harmonica player?</div>
      <Countdown date={1666810800000} renderer={menuRenderer}/>
    </button>
    {/*<button className='absolute left-1/2 bg-none -translate-x-1/2 bottom-2 md:bottom-10 z-10' onClick={RecordingButton}>
    <svg style={{height:"3rem",width:"3rem"}}>
      <circle cx="1.5rem" cy="1.5rem" r="20" fill={buttonColour} />
      <circle cx="1.5rem" cy="1.5rem" r="10" fill="#FF0000" />
    </svg>
    </button>*/}
    
    <div className="absolute top-0 h-screen w-screen" >
    <Canvas 
    shadows={true}
    camera={{position: [0,2,8],fov:fov, rotation:[0,4,0]}} style={{background:"#FFFFFF", touchAction:"none"}}
    resize={{polyfill: ResizeObserver}}>
      <OrbitControls />
      <ambientLight intensity={0.25}  />
      <directionalLight position={[-5,6,6]} intensity={1} />
      <Suspense fallback={<Loader/>}>
        <Model />
      </Suspense>
      
    </Canvas>
    </div>
    <Countdown date={1666810800000} renderer={renderer}/>
    </div>
    
  );
}



export default App;
