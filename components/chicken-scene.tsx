"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Bwak3D, FireParticles } from "./chicken-3d"

export function ChickenScene({ isOnFire, bwakCount }: { isOnFire: boolean, bwakCount: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={2.0} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Bwak3D isOnFire={isOnFire} bwakCount={bwakCount} />
      <FireParticles isOnFire={isOnFire} />
      <OrbitControls enableZoom={false} />
      <Stars />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} intensity={1.5} mipmapBlur />
      </EffectComposer>
    </Canvas>
  )
}