'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { bodySystems } from '@/data/systems';
import { Organ, BodySystem } from '@/types';

// Organ hotspot component - smaller and cleaner
interface OrganHotspotProps {
  organ: Organ;
  systemColor: string;
  isActive: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
}

function OrganHotspot({ organ, systemColor, isActive, isHighlighted, onClick }: OrganHotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { language } = useLanguageStore();

  useFrame(() => {
    if (meshRef.current) {
      const scale = hovered || isHighlighted ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15);
    }
  });

  const position = organ.position || [0, 0, 0];

  return (
    <group position={position as [number, number, number]}>
      {/* Main hotspot - glowing sphere */}
      <mesh
        ref={meshRef}
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
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial
          color={hovered || isHighlighted ? '#FFFFFF' : systemColor}
          emissive={systemColor}
          emissiveIntensity={hovered || isHighlighted ? 1 : 0.5}
          transparent
          opacity={isActive ? 0.9 : 0.3}
        />
      </mesh>

      {/* Tooltip */}
      {hovered && (
        <Html position={[0, 0.1, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="bg-slate-900/95 px-3 py-2 rounded-lg shadow-xl whitespace-nowrap border border-slate-600">
            <p className="text-sm font-semibold text-white">
              {language === 'vi' ? organ.nameVi : organ.nameEn}
            </p>
            <p className="text-xs text-cyan-400">
              {language === 'vi' ? 'Nhấn để xem' : 'Click to view'}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Clean, professional body outline - wire frame style
function BodyOutline({ opacity }: { opacity: number }) {
  const outlineMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#1e3a5f',
      transparent: true,
      opacity: opacity * 0.15,
      side: THREE.DoubleSide,
      wireframe: false,
    });
  }, [opacity]);

  const edgeMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: '#3b82f6',
      transparent: true,
      opacity: opacity * 0.3,
    });
  }, [opacity]);

  // Create body shape using LatheGeometry for smooth silhouette
  const bodyProfile = useMemo(() => {
    const points = [
      new THREE.Vector2(0, 0),       // bottom
      new THREE.Vector2(0.06, 0.02), // feet
      new THREE.Vector2(0.055, 0.35), // lower leg
      new THREE.Vector2(0.065, 0.55), // knee
      new THREE.Vector2(0.07, 0.75),  // thigh
      new THREE.Vector2(0.12, 0.85),  // hip
      new THREE.Vector2(0.13, 0.95),  // waist
      new THREE.Vector2(0.16, 1.1),   // chest
      new THREE.Vector2(0.18, 1.2),   // shoulders
      new THREE.Vector2(0.05, 1.35),  // neck
      new THREE.Vector2(0.1, 1.5),    // head
      new THREE.Vector2(0.09, 1.65),  // top of head
      new THREE.Vector2(0, 1.7),      // crown
    ];
    return new THREE.LatheGeometry(points, 32);
  }, []);

  return (
    <group>
      {/* Main body silhouette */}
      <mesh geometry={bodyProfile}>
        <primitive object={outlineMaterial} />
      </mesh>

      {/* Body outline edges */}
      <lineSegments>
        <edgesGeometry args={[bodyProfile]} />
        <primitive object={edgeMaterial} />
      </lineSegments>
    </group>
  );
}

// Professional skeletal system
function SkeletalSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const boneColor = '#E8E4D9';
  const jointColor = '#D4CFC4';

  const boneMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: boneColor,
    roughness: 0.6,
    metalness: 0.1,
    transparent: true,
    opacity: opacity,
    clearcoat: 0.3,
  }), [opacity]);

  if (!visible) return null;

  return (
    <group>
      {/* Skull - more detailed */}
      <mesh position={[0, 1.58, 0]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <primitive object={boneMaterial} />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, 1.48, 0.03]} scale={[0.7, 0.4, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Cervical spine (neck) */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={`c-${i}`} position={[0, 1.4 - i * 0.025, -0.01]}>
          <cylinderGeometry args={[0.018, 0.02, 0.02, 8]} />
          <primitive object={boneMaterial} />
        </mesh>
      ))}

      {/* Thoracic spine */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`t-${i}`} position={[0, 1.22 - i * 0.035, -0.015]}>
          <cylinderGeometry args={[0.022, 0.024, 0.028, 8]} />
          <primitive object={boneMaterial} />
        </mesh>
      ))}

      {/* Lumbar spine */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`l-${i}`} position={[0, 0.78 - i * 0.04, -0.01]}>
          <cylinderGeometry args={[0.028, 0.03, 0.035, 8]} />
          <primitive object={boneMaterial} />
        </mesh>
      ))}

      {/* Ribcage */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 1.22 - i * 0.035;
        const radius = 0.12 - Math.abs(i - 5) * 0.008;
        return (
          <group key={`rib-${i}`} position={[0, y, 0]}>
            {/* Left rib */}
            <mesh position={[0, 0, 0.02]} rotation={[0, 0.2, 0]}>
              <torusGeometry args={[radius, 0.006, 8, 24, Math.PI * 0.65]} />
              <primitive object={boneMaterial} />
            </mesh>
            {/* Right rib */}
            <mesh position={[0, 0, 0.02]} rotation={[0, Math.PI - 0.2, 0]}>
              <torusGeometry args={[radius, 0.006, 8, 24, Math.PI * 0.65]} />
              <primitive object={boneMaterial} />
            </mesh>
          </group>
        );
      })}

      {/* Sternum */}
      <mesh position={[0, 1.1, 0.1]}>
        <boxGeometry args={[0.03, 0.2, 0.015]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Clavicles */}
      <mesh position={[-0.08, 1.25, 0.06]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.008, 0.01, 0.14, 8]} />
        <primitive object={boneMaterial} />
      </mesh>
      <mesh position={[0.08, 1.25, 0.06]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.008, 0.01, 0.14, 8]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Scapulae */}
      <mesh position={[-0.12, 1.18, -0.04]} rotation={[0.2, 0.3, 0]} scale={[1, 1.2, 0.1]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={jointColor} transparent opacity={opacity * 0.8} />
      </mesh>
      <mesh position={[0.12, 1.18, -0.04]} rotation={[0.2, -0.3, 0]} scale={[1, 1.2, 0.1]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={jointColor} transparent opacity={opacity * 0.8} />
      </mesh>

      {/* Pelvis */}
      <mesh position={[0, 0.62, 0]} rotation={[1.2, 0, 0]} scale={[1.2, 0.8, 0.4]}>
        <torusGeometry args={[0.1, 0.04, 8, 16, Math.PI]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Sacrum */}
      <mesh position={[0, 0.58, -0.02]} rotation={[0.3, 0, 0]} scale={[0.6, 1, 0.3]}>
        <coneGeometry args={[0.05, 0.12, 6]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Humerus (upper arms) */}
      <mesh position={[-0.2, 1.1, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.018, 0.015, 0.28, 8]} />
        <primitive object={boneMaterial} />
      </mesh>
      <mesh position={[0.2, 1.1, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.018, 0.015, 0.28, 8]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Radius & Ulna (forearms) */}
      <mesh position={[-0.22, 0.85, 0.02]} rotation={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.012, 0.01, 0.24, 8]} />
        <primitive object={boneMaterial} />
      </mesh>
      <mesh position={[0.22, 0.85, 0.02]} rotation={[0, 0, -0.05]}>
        <cylinderGeometry args={[0.012, 0.01, 0.24, 8]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Femur (thigh bones) */}
      <mesh position={[-0.08, 0.42, 0]}>
        <cylinderGeometry args={[0.028, 0.022, 0.38, 8]} />
        <primitive object={boneMaterial} />
      </mesh>
      <mesh position={[0.08, 0.42, 0]}>
        <cylinderGeometry args={[0.028, 0.022, 0.38, 8]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Patella (kneecaps) */}
      <mesh position={[-0.08, 0.22, 0.03]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <primitive object={boneMaterial} />
      </mesh>
      <mesh position={[0.08, 0.22, 0.03]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <primitive object={boneMaterial} />
      </mesh>

      {/* Tibia & Fibula (lower legs) */}
      <mesh position={[-0.08, 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.015, 0.32, 8]} />
        <primitive object={boneMaterial} />
      </mesh>
      <mesh position={[0.08, 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.015, 0.32, 8]} />
        <primitive object={boneMaterial} />
      </mesh>
    </group>
  );
}

// Professional circulatory system with animated heart
function CirculatorySystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const heartRef = useRef<THREE.Group>(null);

  const arteryMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#DC2626',
    roughness: 0.3,
    metalness: 0.2,
    transparent: true,
    opacity: opacity,
    emissive: '#7f1d1d',
    emissiveIntensity: 0.2,
  }), [opacity]);

  const veinMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#3B82F6',
    roughness: 0.3,
    metalness: 0.2,
    transparent: true,
    opacity: opacity * 0.9,
    emissive: '#1e3a8a',
    emissiveIntensity: 0.15,
  }), [opacity]);

  useFrame((state) => {
    if (heartRef.current && visible) {
      const beat = Math.sin(state.clock.elapsedTime * 4) * 0.05 + 1;
      heartRef.current.scale.setScalar(beat);
    }
  });

  if (!visible) return null;

  return (
    <group>
      {/* Heart */}
      <group ref={heartRef} position={[0.02, 1.12, 0.05]}>
        {/* Left ventricle */}
        <mesh position={[-0.02, 0, 0]} rotation={[0, 0, 0.3]} scale={[0.8, 1.1, 0.7]}>
          <sphereGeometry args={[0.045, 24, 24]} />
          <primitive object={arteryMaterial} />
        </mesh>
        {/* Right ventricle */}
        <mesh position={[0.02, 0, 0]} rotation={[0, 0, -0.3]} scale={[0.7, 1, 0.65]}>
          <sphereGeometry args={[0.04, 24, 24]} />
          <primitive object={arteryMaterial} />
        </mesh>
        {/* Atria */}
        <mesh position={[0, 0.04, 0]} scale={[1, 0.5, 0.8]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#9f1239" transparent opacity={opacity * 0.9} />
        </mesh>
      </group>

      {/* Aortic arch */}
      <mesh position={[0, 1.2, 0.03]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.02, -0.06, 0.02),
            new THREE.Vector3(0, 0, 0.01),
            new THREE.Vector3(-0.03, 0.06, -0.01),
            new THREE.Vector3(-0.02, 0.12, -0.02),
          ]),
          32, 0.015, 12, false
        ]} />
        <primitive object={arteryMaterial} />
      </mesh>

      {/* Descending aorta */}
      <mesh position={[0, 0.9, -0.01]}>
        <cylinderGeometry args={[0.012, 0.01, 0.5, 12]} />
        <primitive object={arteryMaterial} />
      </mesh>

      {/* Iliac arteries */}
      <mesh position={[-0.05, 0.58, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.008, 0.006, 0.15, 8]} />
        <primitive object={arteryMaterial} />
      </mesh>
      <mesh position={[0.05, 0.58, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.008, 0.006, 0.15, 8]} />
        <primitive object={arteryMaterial} />
      </mesh>

      {/* Superior vena cava */}
      <mesh position={[0.04, 1.25, 0.01]}>
        <cylinderGeometry args={[0.012, 0.015, 0.12, 12]} />
        <primitive object={veinMaterial} />
      </mesh>

      {/* Inferior vena cava */}
      <mesh position={[0.03, 0.9, 0]}>
        <cylinderGeometry args={[0.014, 0.012, 0.45, 12]} />
        <primitive object={veinMaterial} />
      </mesh>

      {/* Pulmonary arteries */}
      <mesh position={[-0.04, 1.15, 0.04]} rotation={[0.5, 0.5, 0.5]}>
        <cylinderGeometry args={[0.008, 0.006, 0.08, 8]} />
        <meshStandardMaterial color="#7f1d1d" transparent opacity={opacity * 0.8} />
      </mesh>
      <mesh position={[0.06, 1.15, 0.04]} rotation={[0.5, -0.5, -0.5]}>
        <cylinderGeometry args={[0.008, 0.006, 0.08, 8]} />
        <meshStandardMaterial color="#7f1d1d" transparent opacity={opacity * 0.8} />
      </mesh>
    </group>
  );
}

// Professional respiratory system
function RespiratorySystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const breathRef = useRef<THREE.Group>(null);

  const lungMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FDA4AF',
    roughness: 0.5,
    metalness: 0,
    transparent: true,
    opacity: opacity * 0.85,
    clearcoat: 0.2,
  }), [opacity]);

  const airwayMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FCD34D',
    roughness: 0.4,
    metalness: 0.1,
    transparent: true,
    opacity: opacity,
  }), [opacity]);

  useFrame((state) => {
    if (breathRef.current && visible) {
      const breath = Math.sin(state.clock.elapsedTime * 1.5) * 0.03 + 1;
      breathRef.current.scale.set(breath, breath * 1.02, breath);
    }
  });

  if (!visible) return null;

  return (
    <group ref={breathRef}>
      {/* Trachea */}
      <mesh position={[0, 1.32, 0.02]}>
        <cylinderGeometry args={[0.02, 0.02, 0.14, 16]} />
        <primitive object={airwayMaterial} />
      </mesh>

      {/* Main bronchi */}
      <mesh position={[-0.03, 1.22, 0.025]} rotation={[0.1, 0, 0.5]}>
        <cylinderGeometry args={[0.012, 0.01, 0.08, 12]} />
        <primitive object={airwayMaterial} />
      </mesh>
      <mesh position={[0.03, 1.22, 0.025]} rotation={[0.1, 0, -0.5]}>
        <cylinderGeometry args={[0.012, 0.01, 0.08, 12]} />
        <primitive object={airwayMaterial} />
      </mesh>

      {/* Left lung - multiple lobes */}
      <group position={[-0.085, 1.08, 0.02]}>
        {/* Upper lobe */}
        <mesh position={[0, 0.04, 0]} scale={[0.7, 0.7, 0.5]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <primitive object={lungMaterial} />
        </mesh>
        {/* Lower lobe */}
        <mesh position={[0, -0.04, 0]} scale={[0.75, 0.8, 0.5]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <primitive object={lungMaterial} />
        </mesh>
      </group>

      {/* Right lung - three lobes */}
      <group position={[0.085, 1.08, 0.02]}>
        {/* Upper lobe */}
        <mesh position={[0, 0.05, 0]} scale={[0.75, 0.6, 0.5]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <primitive object={lungMaterial} />
        </mesh>
        {/* Middle lobe */}
        <mesh position={[0.01, 0, 0.02]} scale={[0.5, 0.4, 0.4]}>
          <sphereGeometry args={[0.06, 24, 24]} />
          <primitive object={lungMaterial} />
        </mesh>
        {/* Lower lobe */}
        <mesh position={[0, -0.05, 0]} scale={[0.8, 0.75, 0.5]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <primitive object={lungMaterial} />
        </mesh>
      </group>

      {/* Diaphragm */}
      <mesh position={[0, 0.92, 0.02]} rotation={[1.4, 0, 0]} scale={[1.3, 1, 0.3]}>
        <sphereGeometry args={[0.12, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#F9A8D4" transparent opacity={opacity * 0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Professional digestive system
function DigestiveSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const stomachMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FB923C',
    roughness: 0.4,
    metalness: 0,
    transparent: true,
    opacity: opacity,
    clearcoat: 0.3,
  }), [opacity]);

  const intestineMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#FCD34D',
    roughness: 0.5,
    metalness: 0,
    transparent: true,
    opacity: opacity * 0.9,
  }), [opacity]);

  if (!visible) return null;

  return (
    <group>
      {/* Esophagus */}
      <mesh position={[0, 1.15, 0]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0.1, 0.02),
            new THREE.Vector3(0, 0, 0.01),
            new THREE.Vector3(-0.02, -0.1, 0.02),
            new THREE.Vector3(-0.03, -0.18, 0.03),
          ]),
          24, 0.012, 8, false
        ]} />
        <meshStandardMaterial color="#D97706" transparent opacity={opacity} />
      </mesh>

      {/* Stomach */}
      <group position={[-0.04, 0.93, 0.04]}>
        {/* Main body */}
        <mesh rotation={[0, 0, 0.4]} scale={[0.9, 1.3, 0.6]}>
          <sphereGeometry args={[0.06, 24, 24]} />
          <primitive object={stomachMaterial} />
        </mesh>
        {/* Fundus */}
        <mesh position={[-0.03, 0.04, 0]} scale={[0.6, 0.5, 0.5]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <primitive object={stomachMaterial} />
        </mesh>
      </group>

      {/* Liver */}
      <group position={[0.08, 0.98, 0.03]}>
        {/* Right lobe */}
        <mesh scale={[1.2, 0.7, 0.4]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshPhysicalMaterial
            color="#7C2D12"
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={opacity}
            clearcoat={0.2}
          />
        </mesh>
        {/* Left lobe */}
        <mesh position={[-0.06, 0.02, 0.01]} scale={[0.6, 0.5, 0.3]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshPhysicalMaterial color="#7C2D12" transparent opacity={opacity * 0.9} />
        </mesh>
      </group>

      {/* Gallbladder */}
      <mesh position={[0.04, 0.92, 0.06]} rotation={[0, 0, 0.5]} scale={[0.3, 0.6, 0.3]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#4ADE80" transparent opacity={opacity} />
      </mesh>

      {/* Pancreas */}
      <mesh position={[0, 0.88, 0.02]} rotation={[0.3, 0, 0]} scale={[2.5, 0.4, 0.4]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#FBBF24" transparent opacity={opacity * 0.9} />
      </mesh>

      {/* Small intestine - coiled tubes */}
      <group position={[0, 0.75, 0.04]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={`si-${i}`} position={[0, -i * 0.025, 0]} rotation={[0, i * 0.8, 0]}>
            <torusGeometry args={[0.055 - i * 0.005, 0.015, 12, 24]} />
            <primitive object={intestineMaterial} />
          </mesh>
        ))}
      </group>

      {/* Large intestine */}
      <group position={[0, 0.72, 0.02]}>
        {/* Ascending colon */}
        <mesh position={[0.09, -0.05, 0]}>
          <cylinderGeometry args={[0.022, 0.02, 0.15, 12]} />
          <meshPhysicalMaterial color="#D97706" transparent opacity={opacity * 0.85} />
        </mesh>
        {/* Transverse colon */}
        <mesh position={[0, 0.03, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.16, 12]} />
          <meshPhysicalMaterial color="#D97706" transparent opacity={opacity * 0.85} />
        </mesh>
        {/* Descending colon */}
        <mesh position={[-0.09, -0.05, 0]}>
          <cylinderGeometry args={[0.02, 0.022, 0.15, 12]} />
          <meshPhysicalMaterial color="#D97706" transparent opacity={opacity * 0.85} />
        </mesh>
      </group>
    </group>
  );
}

// Professional nervous system
function NervousSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const brainMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#F9A8D4',
    roughness: 0.7,
    metalness: 0,
    transparent: true,
    opacity: opacity,
    clearcoat: 0.1,
  }), [opacity]);

  const nerveMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FBBF24',
    transparent: true,
    opacity: opacity * 0.9,
    emissive: '#CA8A04',
    emissiveIntensity: 0.2,
  }), [opacity]);

  if (!visible) return null;

  return (
    <group>
      {/* Brain - cerebrum */}
      <group position={[0, 1.58, 0]}>
        {/* Left hemisphere */}
        <mesh position={[-0.03, 0, 0]} scale={[0.9, 0.85, 0.85]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <primitive object={brainMaterial} />
        </mesh>
        {/* Right hemisphere */}
        <mesh position={[0.03, 0, 0]} scale={[0.9, 0.85, 0.85]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <primitive object={brainMaterial} />
        </mesh>
        {/* Cerebellum */}
        <mesh position={[0, -0.06, -0.04]} scale={[0.8, 0.5, 0.6]}>
          <sphereGeometry args={[0.05, 24, 24]} />
          <meshStandardMaterial color="#EC4899" transparent opacity={opacity * 0.9} />
        </mesh>
      </group>

      {/* Brain stem */}
      <mesh position={[0, 1.46, -0.02]}>
        <cylinderGeometry args={[0.018, 0.022, 0.08, 12]} />
        <meshStandardMaterial color="#EC4899" transparent opacity={opacity} />
      </mesh>

      {/* Spinal cord */}
      <mesh position={[0, 1.05, -0.025]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0.35, 0),
            new THREE.Vector3(0, 0.2, 0.005),
            new THREE.Vector3(0, 0, 0.01),
            new THREE.Vector3(0, -0.2, 0.005),
            new THREE.Vector3(0, -0.4, 0),
          ]),
          48, 0.012, 12, false
        ]} />
        <primitive object={nerveMaterial} />
      </mesh>

      {/* Spinal nerves */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={`nerve-${i}`}>
          <mesh position={[-0.04, 1.3 - i * 0.055, -0.01]} rotation={[0, 0, 0.6]}>
            <cylinderGeometry args={[0.003, 0.002, 0.08, 6]} />
            <primitive object={nerveMaterial} />
          </mesh>
          <mesh position={[0.04, 1.3 - i * 0.055, -0.01]} rotation={[0, 0, -0.6]}>
            <cylinderGeometry args={[0.003, 0.002, 0.08, 6]} />
            <primitive object={nerveMaterial} />
          </mesh>
        </group>
      ))}

      {/* Sciatic nerves */}
      <mesh position={[-0.06, 0.4, -0.01]}>
        <cylinderGeometry args={[0.006, 0.004, 0.35, 8]} />
        <primitive object={nerveMaterial} />
      </mesh>
      <mesh position={[0.06, 0.4, -0.01]}>
        <cylinderGeometry args={[0.006, 0.004, 0.35, 8]} />
        <primitive object={nerveMaterial} />
      </mesh>
    </group>
  );
}

// Professional muscular system
function MuscularSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const muscleMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#DC2626',
    roughness: 0.6,
    metalness: 0.1,
    transparent: true,
    opacity: opacity,
    clearcoat: 0.15,
  }), [opacity]);

  if (!visible) return null;

  return (
    <group>
      {/* Trapezius */}
      <mesh position={[0, 1.28, -0.04]} scale={[1.8, 0.6, 0.25]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <primitive object={muscleMaterial} />
      </mesh>

      {/* Deltoids */}
      <mesh position={[-0.17, 1.22, 0]} scale={[0.6, 0.8, 0.6]}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>
      <mesh position={[0.17, 1.22, 0]} scale={[0.6, 0.8, 0.6]}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>

      {/* Pectoralis major */}
      <mesh position={[-0.06, 1.15, 0.08]} scale={[0.8, 0.5, 0.3]}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>
      <mesh position={[0.06, 1.15, 0.08]} scale={[0.8, 0.5, 0.3]}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>

      {/* Biceps */}
      <mesh position={[-0.21, 1.06, 0.02]} rotation={[0, 0, 0.1]} scale={[0.45, 1.1, 0.45]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <primitive object={muscleMaterial} />
      </mesh>
      <mesh position={[0.21, 1.06, 0.02]} rotation={[0, 0, -0.1]} scale={[0.45, 1.1, 0.45]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <primitive object={muscleMaterial} />
      </mesh>

      {/* Triceps */}
      <mesh position={[-0.2, 1.06, -0.02]} rotation={[0, 0, 0.1]} scale={[0.4, 1, 0.35]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#B91C1C" transparent opacity={opacity * 0.9} />
      </mesh>
      <mesh position={[0.2, 1.06, -0.02]} rotation={[0, 0, -0.1]} scale={[0.4, 1, 0.35]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#B91C1C" transparent opacity={opacity * 0.9} />
      </mesh>

      {/* Rectus abdominis (6-pack) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={`abs-${i}`}>
          <mesh position={[-0.03, 1.0 - i * 0.05, 0.1]} scale={[0.8, 0.4, 0.3]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <primitive object={muscleMaterial} />
          </mesh>
          <mesh position={[0.03, 1.0 - i * 0.05, 0.1]} scale={[0.8, 0.4, 0.3]}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <primitive object={muscleMaterial} />
          </mesh>
        </group>
      ))}

      {/* Obliques */}
      <mesh position={[-0.1, 0.9, 0.05]} rotation={[0, 0, 0.3]} scale={[0.5, 1.2, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#B91C1C" transparent opacity={opacity * 0.85} />
      </mesh>
      <mesh position={[0.1, 0.9, 0.05]} rotation={[0, 0, -0.3]} scale={[0.5, 1.2, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#B91C1C" transparent opacity={opacity * 0.85} />
      </mesh>

      {/* Quadriceps */}
      <mesh position={[-0.08, 0.48, 0.04]} scale={[0.7, 1.5, 0.6]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>
      <mesh position={[0.08, 0.48, 0.04]} scale={[0.7, 1.5, 0.6]}>
        <sphereGeometry args={[0.055, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>

      {/* Hamstrings */}
      <mesh position={[-0.08, 0.45, -0.03]} scale={[0.6, 1.3, 0.5]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#B91C1C" transparent opacity={opacity * 0.9} />
      </mesh>
      <mesh position={[0.08, 0.45, -0.03]} scale={[0.6, 1.3, 0.5]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#B91C1C" transparent opacity={opacity * 0.9} />
      </mesh>

      {/* Gastrocnemius (calves) */}
      <mesh position={[-0.075, 0.12, -0.02]} scale={[0.55, 1.1, 0.7]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <primitive object={muscleMaterial} />
      </mesh>
      <mesh position={[0.075, 0.12, -0.02]} scale={[0.55, 1.1, 0.7]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <primitive object={muscleMaterial} />
      </mesh>

      {/* Gluteus maximus */}
      <mesh position={[-0.07, 0.62, -0.05]} scale={[0.8, 0.7, 0.6]}>
        <sphereGeometry args={[0.06, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>
      <mesh position={[0.07, 0.62, -0.05]} scale={[0.8, 0.7, 0.6]}>
        <sphereGeometry args={[0.06, 20, 20]} />
        <primitive object={muscleMaterial} />
      </mesh>
    </group>
  );
}

interface BodyModelProps {
  onOrganClick?: (organ: Organ) => void;
  highlightOrgan?: string;
  visibleSystems?: Set<BodySystem>;
}

export default function BodyModel({ onOrganClick, highlightOrgan, visibleSystems }: BodyModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { activeSystem, xrayOpacity, setSelectedOrgan } = useExplorerStore();

  const handleOrganClick = (organ: Organ) => {
    setSelectedOrgan(organ);
    onOrganClick?.(organ);
  };

  const showSystem = (system: BodySystem) => {
    if (visibleSystems) {
      return visibleSystems.has(system);
    }
    return activeSystem === null || activeSystem === system;
  };

  const systemOpacity = 0.9;

  return (
    <group ref={groupRef} position={[0, -0.85, 0]}>
      {/* Body outline - clean silhouette */}
      <BodyOutline opacity={xrayOpacity} />

      {/* Anatomical systems */}
      <SkeletalSystem visible={showSystem('skeletal')} opacity={systemOpacity} />
      <NervousSystem visible={showSystem('nervous')} opacity={systemOpacity} />
      <CirculatorySystem visible={showSystem('circulatory')} opacity={systemOpacity} />
      <RespiratorySystem visible={showSystem('respiratory')} opacity={systemOpacity} />
      <DigestiveSystem visible={showSystem('digestive')} opacity={systemOpacity} />
      <MuscularSystem visible={showSystem('muscular')} opacity={systemOpacity} />

      {/* Interactive organ hotspots */}
      {bodySystems.map((system) => {
        const isSystemVisible = showSystem(system.id);
        return (
          <group key={system.id}>
            {isSystemVisible && system.organs.map((organ) => (
              <OrganHotspot
                key={organ.id}
                organ={organ}
                systemColor={system.color}
                isActive={true}
                isHighlighted={highlightOrgan === organ.id}
                onClick={() => handleOrganClick(organ)}
              />
            ))}
          </group>
        );
      })}
    </group>
  );
}
