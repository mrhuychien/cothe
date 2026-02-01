'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows, Float, Grid } from '@react-three/drei';
import { Suspense } from 'react';
import BodyModel from './BodyModel';
import { Organ, BodySystem } from '@/types';

interface SceneProps {
  onOrganClick?: (organ: Organ) => void;
  highlightOrgan?: string;
  visibleSystems?: Set<BodySystem>;
}

function LoadingFallback() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="#3B82F6" wireframe />
      </mesh>
    </Float>
  );
}

export default function Scene({ onOrganClick, highlightOrgan, visibleSystems }: SceneProps) {
  return (
    <div className="w-full h-full canvas-container">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        {/* Dark background like InnerBody */}
        <color attach="background" args={['#0F172A']} />
        <fog attach="fog" args={['#0F172A', 3, 10]} />

        <PerspectiveCamera makeDefault position={[0, 0.5, 2.2]} fov={50} />

        {/* Studio lighting setup */}
        <ambientLight intensity={0.4} />

        {/* Main key light */}
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Fill light */}
        <directionalLight position={[-4, 3, 2]} intensity={0.8} color="#60A5FA" />

        {/* Rim light */}
        <directionalLight position={[0, 3, -4]} intensity={0.6} color="#F472B6" />

        {/* Accent lights */}
        <pointLight position={[2, 2, 2]} intensity={0.4} color="#34D399" />
        <pointLight position={[-2, 1, 2]} intensity={0.4} color="#A78BFA" />

        {/* Subtle ground grid */}
        <Grid
          position={[0, -0.5, 0]}
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#334155"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#475569"
          fadeDistance={8}
          fadeStrength={1}
          infiniteGrid
        />

        {/* Environment */}
        <Environment preset="night" />

        {/* Floor shadow */}
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.6}
          scale={4}
          blur={2.5}
          far={3}
          color="#000000"
        />

        {/* Body Model */}
        <Suspense fallback={<LoadingFallback />}>
          <BodyModel
            onOrganClick={onOrganClick}
            highlightOrgan={highlightOrgan}
            visibleSystems={visibleSystems}
          />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={1}
          maxDistance={6}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 1.2}
          target={[0, 0.3, 0]}
          rotateSpeed={0.6}
          zoomSpeed={1}
          panSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
