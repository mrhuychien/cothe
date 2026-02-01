'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei';
import { Suspense } from 'react';
import BodyModel from './BodyModel';
import { Organ } from '@/types';

interface SceneProps {
  onOrganClick?: (organ: Organ) => void;
  highlightOrgan?: string;
}

function LoadingFallback() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="#F687B3" wireframe />
      </mesh>
    </Float>
  );
}

export default function Scene({ onOrganClick, highlightOrgan }: SceneProps) {
  return (
    <div className="w-full h-full canvas-container">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#F0F8FF']} />

        <PerspectiveCamera makeDefault position={[0, 0.8, 2.5]} fov={45} />

        {/* Ambient lighting - soft overall light */}
        <ambientLight intensity={0.5} />

        {/* Main key light - front */}
        <directionalLight
          position={[2, 4, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />

        {/* Fill light - left side */}
        <directionalLight position={[-3, 2, 2]} intensity={0.6} color="#E3F2FD" />

        {/* Rim light - back */}
        <directionalLight position={[0, 2, -3]} intensity={0.4} color="#FFF3E0" />

        {/* Subtle colored point lights for depth */}
        <pointLight position={[1, 1.5, 1]} intensity={0.3} color="#FFCDD2" />
        <pointLight position={[-1, 1, 1]} intensity={0.3} color="#BBDEFB" />

        {/* Environment for realistic reflections */}
        <Environment preset="studio" />

        {/* Floor shadow */}
        <ContactShadows
          position={[0, -0.3, 0]}
          opacity={0.4}
          scale={3}
          blur={2}
          far={2}
        />

        {/* Body Model */}
        <Suspense fallback={<LoadingFallback />}>
          <BodyModel onOrganClick={onOrganClick} highlightOrgan={highlightOrgan} />
        </Suspense>

        {/* Controls - touch friendly */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.3}
          target={[0, 0.5, 0]}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
