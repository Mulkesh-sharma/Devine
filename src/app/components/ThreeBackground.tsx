'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, MeshTransmissionMaterial, TorusKnot, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

function SacredGeometry({ position, rotation, scale, color, type }: any) {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.y = t * 0.3;
    mesh.current.position.y = position[1] + Math.sin(t / 2) / 5;
  });

  const Material = (
    <MeshTransmissionMaterial
      backside
      backsideThickness={5}
      thickness={2}
      roughness={0}
      transmission={1}
      ior={1.5}
      chromaticAberration={1}
      anisotropy={20}
      distortion={0.5}
      distortionScale={0.5}
      temporalDistortion={0.2}
      color={color}
      background={new THREE.Color('#111827')}
    />
  );

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
        {type === 'torus' ? (
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        ) : (
          <octahedronGeometry args={[1, 0]} />
        )}
        {Material}
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#111827']} /> {/* gray-900 */}
      
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.1} />
      <Sparkles count={300} scale={15} size={3} speed={0.4} opacity={0.6} color="#fbbf24" />

      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#fbbf24" castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#f97316" />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
