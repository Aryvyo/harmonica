import React, { Suspense } from 'react';
import './App.css';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Harmonica';
import { array } from './Harmonica';
import Countdown from 'react-countdown';

function App() {

  const [recording, setRecording] = React.useState(false);

  const [buttonColour, setButtonColour] = React.useState('#808080');
  
  const RecordingButton = () => {

    if(recording === true) {
      setRecording(false);
      array.poly.recorder.stop()
      setButtonColour("#808080");
    }
    else { setRecording(true); array.poly.recorder.start(); setButtonColour("#FF0000"); }

  }
  const renderer = ({ days, hours, minutes, seconds, completed }:any) => {
    if (completed) {
      // Render a completed state
    } else {
      // Render a countdown
      return <span className="absolute top-24 left-1/2 -translate-x-1/2 text-8xl text-white">{days}:{hours}:{minutes}:{seconds}</span>;
    }
  };

//    <svg xmlns="http://www.w3.org/2000/svg" style={{height:"3rem",width:"3rem"}} viewBox="0 0 20 20" fill={buttonColour}>
// <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
// </svg>
  return (
    <div className="h-[100vh] w-full bg-[#585758]">
    <button className='relative left-1/2 bg-none -translate-x-1/2 bottom-10 z-10' onClick={RecordingButton}>
    <svg style={{height:"3rem",width:"3rem"}}>
      <circle cx="1.5rem" cy="1.5rem" r="20" fill={buttonColour} />
      <circle cx="1.5rem" cy="1.5rem" r="10" fill="#FF0000" />
    </svg>
    </button>
    
    <div className="absolute top-0 h-screen w-screen" >
    <Canvas 
    shadows={true}
    camera={{position: [0,2,8],fov:60, rotation:[0,0,0]}}>
      <OrbitControls />
      <ambientLight intensity={0.25} castShadow />
      <directionalLight position={[-5,6,6]} intensity={1} castShadow/>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      
    </Canvas>
    </div>
    <Countdown date={1659352800000} renderer={renderer}/>
    </div>
    
  );
}



export default App;
