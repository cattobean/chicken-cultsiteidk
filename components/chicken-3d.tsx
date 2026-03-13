"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

export function Bwak3D({ isOnFire, bwakCount }: { isOnFire: boolean, bwakCount: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/midgefunny.glb")

  useFrame(() => {
    if (!groupRef.current) return
    
    // Rotation speed ramp: 300 to 600 clicks
    const speed = bwakCount > 600 ? 0.2 : (bwakCount / 3000) + 0.01
    groupRef.current.rotation.y += speed

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        
        // Color Evolution
        if (bwakCount > 300) material.color.set("#ffffff") // White
        else if (bwakCount > 200) material.color.set("#ff69b4") // Pink
        else if (bwakCount > 100) material.color.set("#0000ff") // Blue
        else material.color.set("#ffffff")

        material.emissive.set(isOnFire ? "#ff4400" : "#000000")
        material.emissiveIntensity = isOnFire ? 15.0 : 0
      }
    })
  })

  return <primitive ref={groupRef} object={scene} scale={[5, 5, 5]} />
}

export function FireParticles({ isOnFire }: { isOnFire: boolean, bwakCount: number }) {
  const particles = useRef<THREE.Points>(null)
  const count = 300 // Increased particle count for "realistic fire"
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2
      pos[i * 3 + 1] = Math.random() * 3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2
    }
    return pos
  }, [])

  useFrame(() => {
    if (!particles.current) return
    const pos = particles.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.05 // Faster rise
      if (pos[i * 3 + 1] > 3) pos[i * 3 + 1] = 0
    }
    particles.current.geometry.attributes.position.needsUpdate = true
  })

  if (!isOnFire) return null
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} color="#ff4400" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}