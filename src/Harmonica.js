/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Scar56 (https://sketchfab.com/Scar56)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/harmonica-blues-harp-af5ac47932f34104a6779e77517c0573
title: Harmonica Blues Harp
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import Wad from 'web-audio-daw';



class FileConstructor {
  constructor() {
    this.array = [];
    this.poly = new Wad.Poly({
      recorder: {
          options: { mimeType : 'audio/webm' },
          onstop: function(event) {
              let blob = new Blob(this.recorder.chunks, { 'type' : 'audio/mp3;codecs=opus' });
              window.open(URL.createObjectURL(blob));
          }
      }
  });

  }
  addWad(wad) {
    this.poly.add(wad);
  }
  getArray() {
    return this.array;
  }
}

const array = new FileConstructor();
export { array }

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/harmonica/harmonica.gltf')
  


  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 2, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.defaultMaterial.geometry} material={materials.M_Metal_1} />
            <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.M_Metal_2} />
            <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.M_Wood_1} />




            <HoverZone position={[0.012,0.0321,0.01]} note="1" FileConstructor={array}/>
            <HoverZone position={[0.012,0.025,0.01]} note="2" FileConstructor={array}/>
            <HoverZone position={[0.012,0.0179,0.01]} note="3" FileConstructor={array}/>
            <HoverZone position={[0.012,0.0108,0.01]} note="4" FileConstructor={array}/>
            <HoverZone position={[0.012,0.0037,0.01]} note="5" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0037,0.01]} note="6" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0108,0.01]} note="7" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0179,0.01]} note="8" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.025,0.01]} note="9" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0321,0.01]} note="10" FileConstructor={array}/>

          </group>
        </group>
      </group>
    </group>
  )
}



function HoverZone({...props}) {
  const mesh = useRef();
  const [colour,setColour] = React.useState("orange");


  const SustainLengthSwitch = () => {
    //switch statement 
    switch(props.note) {
      case "6": 
      return 1.02647
      default:
      return 1.02647
    }
  }

  var wad = new Wad({source: "/audio/" + props.note + ".ogg", 
    
    sprite: {
      attack: [0, 0.889],
      sustain: [1, 1 + SustainLengthSwitch()],
      decay: [3, 4.5]

    }  
  });


  props.FileConstructor.addWad(wad);

  useEffect(() => {
    if(playing === false) {
      clearInterval(sustainInterval);
    }
  });

  const onHover = () => {
    wad.stop();

    setColour("red");
    wad.attack.play();
    setPlaying(true);
    setTimeout(() => {
      wad.sustain.play();  
      const interval = setInterval(() => {
        wad.sustain.play();
      }, 1026.5);
      setSustainInterval(interval);
    }, 889);
  }

  const onHoverExit = async () => {
    console.log("exit" , playing);
    await clearInterval(sustainInterval);
    await wad.stop()
    await setPlaying(false);
    setColour("orange");
    wad.stop();
    wad.decay.play();
  }
    
  return (
    <mesh {...props} ref={mesh} onPointerOver={() => {onHover();}} onPointerLeave={()=>{onHoverExit();}} >
    <boxGeometry args={[.005,.005,.005]} />
    <meshStandardMaterial color={colour} opacity={0.1} transparent/>
    </mesh>
  )
}


useGLTF.preload('/harmonica/harmonica.gltf')

