'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import BodyModel from './BodyModel';
import { Organ } from '@/types';

interface SceneProps {
  onOrganClick?: (organ: Organ) => void;
  highlightOrgan?: string;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#F687B3" wireframe />
    </mesh>
  );
}

export default function Scene({ onOrganClick, highlightOrgan }: SceneProps) {
  return (
    <div className="w-full h-full canvas-container">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 1, 3]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <pointLight position={[0, 2, 2]} intensity={0.5} color="#FFB6C1" />

        {/* Environment */}
        <Environment preset="studio" />

        {/* Body Model */}
        <Suspense fallback={<LoadingFallback />}>
          <BodyModel onOrganClick={onOrganClick} highlightOrgan={highlightOrgan} />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2}
          maxDistance={6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          target={[0, 1, 0]}
        />
      </Canvas>
    </div>
  );
}
