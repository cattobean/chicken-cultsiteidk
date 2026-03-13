"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

// Exporting the renamed function
export function Bwak3D({ isOnFire, bwakCount }: { isOnFire: boolean, bwakCount: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/midgefunny.glb")

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.material = new THREE.MeshStandardMaterial({
          map: (mesh.material as any).map,
          color: 0xffffff,
          roughness: 0.3,
          metalness: 0.1,
        })
      }
    })
  }, [scene])

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.01
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        material.emissive.set(isOnFire ? "#ff4400" : "#000000")
        material.emissiveIntensity = isOnFire ? 15.0 : 0
      }
    })
  })

  return <primitive ref={groupRef} object={scene} scale={[5, 5, 5]} />
}

export function FireParticles({ isOnFire }: { isOnFire: boolean, bwakCount: number }) {
  const particles = useRef<THREE.Points>(null)
  const count = 100
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5
      pos[i * 3 + 1] = Math.random() * 2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
    }
    return pos
  }, [isOnFire])

  useFrame(() => {
    if (!particles.current) return
    const pos = particles.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.03
      if (pos[i * 3 + 1] > 2) pos[i * 3 + 1] = 0
    }
    particles.current.geometry.attributes.position.needsUpdate = true
  })

  if (!isOnFire) return null
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#ff4400" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}