"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Chicken3D, FireParticles } from "./chicken-3d"

export function ChickenScene({ isOnFire, clickCount }: { isOnFire: boolean, clickCount: number }) {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#0a0a0a"]} />
        
        {/* Fill light to prevent pitch-black shadows */}
        <ambientLight intensity={2.5} />
        
        {/* Soft global lighting from above and below */}
        <hemisphereLight intensity={2.0} color="#ffffff" groundColor="#444444" />
        
        {/* Stronger directional light for depth */}
        <directionalLight position={[5, 5, 5]} intensity={3.0} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        
        <Chicken3D isOnFire={isOnFire} clickCount={clickCount} />
        <FireParticles isOnFire={isOnFire} clickCount={clickCount} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} intensity={1.0} />
        </EffectComposer>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={!isOnFire} />
      </Canvas>
    </div>
  )
}