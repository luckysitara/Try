"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box, Sphere } from "@react-three/drei"
import { Suspense } from "react"

function TechObject() {
  return (
    <group>
      <Box args={[1, 1, 1]} position={[-1, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <Sphere args={[0.5, 32, 32]} position={[1, 0, 0]}>
        <meshStandardMaterial color="lightblue" />
      </Sphere>
    </group>
  )
}

export function TechModelViewer() {
  return (
    <div className="h-[300px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <TechObject />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

