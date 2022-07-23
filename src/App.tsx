import React, { Suspense } from 'react';
import './App.css';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Harmonica';
import FileReplay from './FileReplay';

function App() {
  return (
    <div className="h-[100vh] w-full bg-[#585758]">
      <FileReplay/>
    <Canvas 
    shadows={true}
    camera={{position: [0,1,8],fov:60, rotation:[0,0,0]}}>
      <OrbitControls />
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
