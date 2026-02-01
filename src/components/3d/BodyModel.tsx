'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Cylinder, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { bodySystems } from '@/data/systems';
import { Organ } from '@/types';

interface OrganMeshProps {
  organ: Organ;
  systemColor: string;
  isActive: boolean;
  onClick: () => void;
}

function OrganMesh({ organ, systemColor, isActive, onClick }: OrganMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { language } = useLanguageStore();

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.05);
    }
  });

  const position = organ.position || [0, 0, 0];
  const color = hovered ? '#FFD700' : systemColor;

  return (
    <group position={position as [number, number, number]}>
      <Sphere
        ref={meshRef}
        args={[0.08, 16, 16]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
          transparent
          opacity={isActive ? 1 : 0.3}
        />
      </Sphere>
      {hovered && (
        <Html
          position={[0, 0.15, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-white/90 px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            <p className="text-sm font-semibold text-gray-800">
              {language === 'vi' ? organ.nameVi : organ.nameEn}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

interface BodyModelProps {
  onOrganClick?: (organ: Organ) => void;
  highlightOrgan?: string;
}

export default function BodyModel({ onOrganClick }: BodyModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { activeSystem, xrayOpacity, setSelectedOrgan } = useExplorerStore();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const handleOrganClick = (organ: Organ) => {
    setSelectedOrgan(organ);
    onOrganClick?.(organ);
  };

  return (
    <group ref={groupRef}>
      {/* Body outline - simple humanoid shape */}
      <group>
        {/* Head */}
        <Sphere args={[0.18, 32, 32]} position={[0, 1.6, 0]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.6}
          />
        </Sphere>

        {/* Neck */}
        <Cylinder args={[0.06, 0.08, 0.15, 16]} position={[0, 1.38, 0]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.6}
          />
        </Cylinder>

        {/* Torso */}
        <Box args={[0.4, 0.6, 0.25]} position={[0, 1, 0]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.5}
          />
        </Box>

        {/* Hips */}
        <Box args={[0.35, 0.2, 0.2]} position={[0, 0.6, 0]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.5}
          />
        </Box>

        {/* Left Arm */}
        <Cylinder args={[0.05, 0.04, 0.5, 16]} position={[-0.32, 1.05, 0]} rotation={[0, 0, 0.3]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.6}
          />
        </Cylinder>

        {/* Right Arm */}
        <Cylinder args={[0.05, 0.04, 0.5, 16]} position={[0.32, 1.05, 0]} rotation={[0, 0, -0.3]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.6}
          />
        </Cylinder>

        {/* Left Leg */}
        <Cylinder args={[0.07, 0.05, 0.7, 16]} position={[-0.12, 0.15, 0]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.6}
          />
        </Cylinder>

        {/* Right Leg */}
        <Cylinder args={[0.07, 0.05, 0.7, 16]} position={[0.12, 0.15, 0]}>
          <meshStandardMaterial
            color="#FFE4C4"
            transparent
            opacity={xrayOpacity * 0.6}
          />
        </Cylinder>
      </group>

      {/* Organ points for each system */}
      {bodySystems.map((system) => {
        const isActiveSystem = activeSystem === null || activeSystem === system.id;
        return (
          <group key={system.id}>
            {system.organs.map((organ) => (
              <OrganMesh
                key={organ.id}
                organ={organ}
                systemColor={system.color}
                isActive={isActiveSystem}
                onClick={() => handleOrganClick(organ)}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
}
