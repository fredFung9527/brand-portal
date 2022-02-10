import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { OrbitControls, Html, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Suspense } from 'react'
import { getFilePath } from '../utils/file'

function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.floor(progress)}%</Html>
}

function Model({src, scale}) {
  const gltf = useLoader(GLTFLoader, src)
  return (
    <primitive object={gltf.scene} scale={scale}/>
  )
}

export default function My3DViewer({src, width='100%', height=300, scale=1}) {
  if (!src) {
    return null
  }
  return (
    <div style={{width, height}}>
      <Canvas>
        <Suspense fallback={<Loader/>}>
          <Model 
            src={typeof src === 'string' ? 
              (src[0] === '/' ? getFilePath(src) : src) :
              URL.createObjectURL(src)
            } 
            scale={scale}
          />
          <OrbitControls/>
        </Suspense>
      </Canvas>
    </div>
  )
}