/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Scar56 (https://sketchfab.com/Scar56)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/harmonica-blues-harp-af5ac47932f34104a6779e77517c0573
title: Harmonica Blues Harp
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import Wad from 'web-audio-daw';



class FileConstructor {
  constructor() {
    this.array = [];
    this.poly = new Wad.Poly({
      recorder: {
          options: { mimeType : 'audio/webm;codecs=opus' },
          onstop: function(event) {
              let blob = new Blob(this.recorder.chunks, { 'type' : 'audio/mp3;codecs=opus' });
              let url = URL.createObjectURL(blob)
              var a = document.createElement('a');
              a.href = url;
              a.download = 'harmonica.mp3';
              a.click();
              URL.revokeObjectURL(url);
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
    <group castShadow ref={group} {...props} dispose={null}>
      <group position={[0, 2, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh castShadow geometry={nodes.defaultMaterial.geometry} material={materials.M_Metal_1} />
            <mesh castShadow geometry={nodes.defaultMaterial_1.geometry} material={materials.M_Metal_2} />
            <mesh castShadow geometry={nodes.defaultMaterial_2.geometry} material={materials.M_Wood_1} />




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
  const [playing,setPlaying] = React.useState(false);


  var wad = new Wad({source: "/audio/" + props.note + ".ogg", });
  var decay = new Wad({source: "/audio/" + props.note + "decay.ogg", });

  props.FileConstructor.addWad(wad);
  props.FileConstructor.addWad(decay);


  const onHover = () => {
    props.FileConstructor.poly.stop(props.note + "decay");
    setPlaying(true);
    wad.play({"label" : props.note,env:{attack: .1, release:.02}}).then(() => {
      setPlaying(false)
    }).catch(err => {
      console.log(err);
    }
    );

  }

  const onHoverExit = async () => {
    console.log("exit");
    props.FileConstructor.poly.stop(props.note);
    if (playing === true) {
      decay.play({"label" : props.note + "decay",env:{release:.02}});
    }
    setPlaying(false);
  }
  setTimeout(() => {
    if (navigator.userAgentData.mobile) {
      return (
        <mesh {...props} ref={mesh} onPointerDown={() => {onHover();}} onPointerUp={()=>{onHoverExit();}} >
        <boxGeometry args={[.005,.005,.005]} />
        <meshStandardMaterial opacity={0.1} transparent/>
        </mesh>
      )
    }
    else {
      return (
        <mesh {...props} ref={mesh} onPointerOver={() => {onHover();}} onPointerLeave={()=>{onHoverExit();}} >
        <boxGeometry args={[.005,.005,.005]} />
        <meshStandardMaterial opacity={0.1} transparent/>
        </mesh>
      )
      }
  }, 100);


}


useGLTF.preload('/harmonica/harmonica.gltf')

