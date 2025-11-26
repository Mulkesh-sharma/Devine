'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Cloud, Float } from '@react-three/drei';
import * as THREE from 'three';

function FireEmbers() {
  const mesh = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.001; // Slow rotation
  });

  return (
    <group ref={mesh}>
      {/* Rising Sparks/Embers */}
      <Sparkles
        count={500}
        scale={[20, 10, 20]}
        size={4}
        speed={0.01}
        opacity={0.8}
        color="#FF7A2F" // Fire Orange
        noise={1} // Turbulent movement
      />
      <Sparkles
        count={200}
        scale={[15, 15, 15]}
        size={6}
        speed={0.01}
        opacity={0.5}
        color="#ffff15ff" // Red
        noise={0.5}
      />
    </group>
  );
}

function SmokePlumes() {
  return (
    <group position={[0, -5, -5]}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Cloud
          opacity={0.3}
          speed={0.01} // Animation speed
          segments={20} // Number of particles
          color="#a88028ff" // Deep Brown Smoke
        />
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8} position={[5, 2, -2]}>
        <Cloud
          opacity={0.2}
          speed={0.01}
          segments={15}
          color="#ffcd71ff" // Lighter reddish brown
        />
      </Float>
    </group>
  );
}

function HeatHaze() {
    // Simulating heat distortion with a subtle moving light/shadow play
    const lightRef = useRef<THREE.PointLight>(null!);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        lightRef.current.intensity = 2 + Math.sin(t * 5) * 0.5; // Flickering intensity
        lightRef.current.position.x = Math.sin(t) * 2;
    });
    return <pointLight ref={lightRef} position={[0, -2, 2]} color="#FF7A2F" distance={15} decay={2} />;
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#1A0F0A']} /> {/* Deep Dark Brown/Black Background */}
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.1} />
      
      <FireEmbers />
      <SmokePlumes />
      <HeatHaze />

      {/* Ambient Warmth */}
      <ambientLight intensity={0.2} color="#381E1E" />
      
      {/* Main Fire Glow */}
      <pointLight position={[0, -5, 0]} intensity={3} color="#FF4500" distance={20} />
      
      {/* Rim Light for depth */}
      <spotLight position={[10, 10, 5]} angle={0.5} penumbra={1} intensity={1} color="#FFD700" />
    </>
  );
}

export default function FireBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1A0F0A]">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
