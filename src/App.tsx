import React, { Suspense } from 'react';
import './App.css';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Harmonica';

function App() {
  return (
    <div className="h-[100vh] w-full bg-[#585758]">
    <button className='relative left-1/2 bg-none -translate-x-1/2 top-10 z-10'>
    <svg xmlns="http://www.w3.org/2000/svg" style={{height:"3rem",width:"3rem"}} viewBox="0 0 20 20" fill="#FF0000">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
  </svg>
    </button>
    
    <Canvas 
    shadows={true}
    camera={{position: [0,1,8],fov:60, rotation:[0,0,0]}}>
      <ambientLight intensity={0.25}/>
      <directionalLight position={[-5,6,6]} intensity={1}/>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      
    </Canvas>
    </div>
  );
}

export default App;
