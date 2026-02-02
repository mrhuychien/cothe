'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useExplorerStore } from '@/stores/useExplorerStore';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { bodySystems } from '@/data/systems';
import { Organ, BodySystem } from '@/types';

// Organ hotspot component
interface OrganHotspotProps {
  organ: Organ;
  systemColor: string;
  isActive: boolean;
  isHighlighted?: boolean;
  onClick: () => void;
}

function OrganHotspot({ organ, systemColor, isActive, isHighlighted, onClick }: OrganHotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { language } = useLanguageStore();

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered || isHighlighted ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  const position = organ.position || [0, 0, 0];

  return (
    <group position={position as [number, number, number]}>
      {/* Pulsing ring */}
      {(hovered || isHighlighted) && (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.06, 0.08, 32]} />
          <meshBasicMaterial color={systemColor} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Main hotspot */}
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
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={hovered || isHighlighted ? '#FFD700' : systemColor}
          emissive={hovered || isHighlighted ? systemColor : '#000000'}
          emissiveIntensity={hovered || isHighlighted ? 0.5 : 0}
          transparent
          opacity={isActive ? 1 : 0.2}
        />
      </mesh>

      {/* Tooltip */}
      {hovered && (
        <Html position={[0, 0.12, 0]} center style={{ pointerEvents: 'none' }}>
          <div className="bg-slate-800 px-3 py-2 rounded-xl shadow-lg whitespace-nowrap border-2"
               style={{ borderColor: systemColor }}>
            <p className="text-sm font-bold text-white">
              {language === 'vi' ? organ.nameVi : organ.nameEn}
            </p>
            <p className="text-xs text-slate-400">
              {language === 'vi' ? 'Nhấn để xem chi tiết' : 'Click for details'}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Human body silhouette using basic shapes - X-ray style
function HumanBodySilhouette({ opacity }: { opacity: number }) {
  const skinMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#E8BEAC',
      roughness: 0.7,
      metalness: 0,
      transparent: true,
      opacity: opacity * 0.5,
      side: THREE.DoubleSide,
      clearcoat: 0.1,
    });
  }, [opacity]);

  return (
    <group>
      {/* Head */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <primitive object={skinMaterial} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.1, 16]} />
        <primitive object={skinMaterial} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.05, 0]}>
        <capsuleGeometry args={[0.15, 0.5, 16, 32]} />
        <primitive object={skinMaterial} />
      </mesh>

      {/* Arms */}
      <group position={[-0.22, 1.2, 0]} rotation={[0, 0, 0.15]}>
        <mesh>
          <capsuleGeometry args={[0.035, 0.25, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.03, 0.22, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>
      <group position={[0.22, 1.2, 0]} rotation={[0, 0, -0.15]}>
        <mesh>
          <capsuleGeometry args={[0.035, 0.25, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <capsuleGeometry args={[0.03, 0.22, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>

      {/* Legs */}
      <group position={[-0.08, 0.55, 0]}>
        <mesh>
          <capsuleGeometry args={[0.055, 0.35, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.045, 0.35, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>
      <group position={[0.08, 0.55, 0]}>
        <mesh>
          <capsuleGeometry args={[0.055, 0.35, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
        <mesh position={[0, -0.38, 0]}>
          <capsuleGeometry args={[0.045, 0.35, 8, 16]} />
          <primitive object={skinMaterial} />
        </mesh>
      </group>
    </group>
  );
}

// Skeletal system visualization
function SkeletalSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const boneColor = '#F5F5DC';

  if (!visible) return null;

  return (
    <group>
      {/* Skull */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>

      {/* Spine */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh key={`vertebra-${i}`} position={[0, 1.3 - i * 0.035, -0.02]}>
          <boxGeometry args={[0.04, 0.025, 0.03]} />
          <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
        </mesh>
      ))}

      {/* Ribcage */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={`rib-${i}`} position={[0, 1.25 - i * 0.04, 0]}>
          <mesh position={[-0.08, 0, 0.02]} rotation={[0, 0.3, 0]}>
            <torusGeometry args={[0.1 - i * 0.003, 0.008, 8, 16, Math.PI * 0.7]} />
            <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
          </mesh>
          <mesh position={[0.08, 0, 0.02]} rotation={[0, -0.3, Math.PI]}>
            <torusGeometry args={[0.1 - i * 0.003, 0.008, 8, 16, Math.PI * 0.7]} />
            <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
          </mesh>
        </group>
      ))}

      {/* Pelvis */}
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>

      {/* Arm bones */}
      <mesh position={[-0.25, 1.1, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.015, 0.012, 0.4, 8]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.25, 1.1, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.015, 0.012, 0.4, 8]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>

      {/* Leg bones */}
      <mesh position={[-0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.025, 0.02, 0.6, 8]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.08, 0.35, 0]}>
        <cylinderGeometry args={[0.025, 0.02, 0.6, 8]} />
        <meshStandardMaterial color={boneColor} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

// Circulatory system visualization
function CirculatorySystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const arteryColor = '#DC143C';
  const veinColor = '#4169E1';

  if (!visible) return null;

  return (
    <group>
      {/* Heart */}
      <mesh position={[0.02, 1.12, 0.06]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={arteryColor}
          transparent
          opacity={opacity}
          emissive={arteryColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Aorta */}
      <mesh position={[0, 1.22, 0.03]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.02, -0.1, 0.03),
            new THREE.Vector3(0.01, 0, 0.02),
            new THREE.Vector3(-0.02, 0.08, 0),
            new THREE.Vector3(-0.03, 0.15, -0.02),
          ]),
          32, 0.018, 8, false
        ]} />
        <meshStandardMaterial color={arteryColor} transparent opacity={opacity} />
      </mesh>

      {/* Main arteries */}
      <mesh position={[0.04, 0.85, 0.02]}>
        <cylinderGeometry args={[0.012, 0.01, 0.6, 8]} />
        <meshStandardMaterial color={arteryColor} transparent opacity={opacity * 0.9} />
      </mesh>

      {/* Main veins */}
      <mesh position={[-0.04, 0.85, 0.02]}>
        <cylinderGeometry args={[0.012, 0.01, 0.6, 8]} />
        <meshStandardMaterial color={veinColor} transparent opacity={opacity * 0.9} />
      </mesh>

      {/* Arm vessels */}
      <mesh position={[-0.22, 1.1, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.005, 0.004, 0.35, 6]} />
        <meshStandardMaterial color={arteryColor} transparent opacity={opacity * 0.7} />
      </mesh>
      <mesh position={[0.22, 1.1, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.005, 0.004, 0.35, 6]} />
        <meshStandardMaterial color={arteryColor} transparent opacity={opacity * 0.7} />
      </mesh>
    </group>
  );
}

// Respiratory system visualization
function RespiratorySystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const lungColor = '#FFB6C1';
  const tracheaColor = '#F0E68C';

  if (!visible) return null;

  return (
    <group>
      {/* Trachea */}
      <mesh position={[0, 1.32, 0.03]}>
        <cylinderGeometry args={[0.025, 0.025, 0.18, 16]} />
        <meshStandardMaterial color={tracheaColor} transparent opacity={opacity} />
      </mesh>

      {/* Bronchi */}
      <mesh position={[-0.04, 1.2, 0.03]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.015, 0.012, 0.1, 8]} />
        <meshStandardMaterial color={tracheaColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.04, 1.2, 0.03]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.015, 0.012, 0.1, 8]} />
        <meshStandardMaterial color={tracheaColor} transparent opacity={opacity} />
      </mesh>

      {/* Left Lung */}
      <mesh position={[-0.09, 1.08, 0.02]} scale={[0.75, 1.1, 0.55]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={lungColor} transparent opacity={opacity * 0.75} />
      </mesh>

      {/* Right Lung */}
      <mesh position={[0.09, 1.08, 0.02]} scale={[0.85, 1.1, 0.55]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color={lungColor} transparent opacity={opacity * 0.75} />
      </mesh>
    </group>
  );
}

// Digestive system visualization
function DigestiveSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  if (!visible) return null;

  return (
    <group>
      {/* Esophagus */}
      <mesh position={[0, 1.15, -0.01]}>
        <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
        <meshStandardMaterial color="#DEB887" transparent opacity={opacity} />
      </mesh>

      {/* Stomach */}
      <mesh position={[-0.04, 0.92, 0.04]} rotation={[0, 0, 0.25]} scale={[1.1, 1.4, 0.7]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color="#FFA07A" transparent opacity={opacity} />
      </mesh>

      {/* Liver */}
      <mesh position={[0.1, 0.98, 0.03]} scale={[1.3, 0.85, 0.5]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial color="#8B4513" transparent opacity={opacity} />
      </mesh>

      {/* Small intestine */}
      <mesh position={[0, 0.78, 0.03]}>
        <torusGeometry args={[0.07, 0.02, 12, 32]} />
        <meshStandardMaterial color="#DEB887" transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 0.78, 0.03]} rotation={[0.2, Math.PI / 3, 0]}>
        <torusGeometry args={[0.055, 0.018, 12, 32]} />
        <meshStandardMaterial color="#DEB887" transparent opacity={opacity} />
      </mesh>

      {/* Large intestine */}
      <mesh position={[0, 0.72, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.025, 8, 24, Math.PI * 1.5]} />
        <meshStandardMaterial color="#CD853F" transparent opacity={opacity * 0.9} />
      </mesh>
    </group>
  );
}

// Nervous system visualization
function NervousSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const nerveColor = '#FFD700';
  const brainColor = '#FFB6C1';

  if (!visible) return null;

  return (
    <group>
      {/* Brain */}
      <mesh position={[0, 1.58, 0]} scale={[1, 0.85, 0.9]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color={brainColor}
          transparent
          opacity={opacity}
          roughness={0.8}
        />
      </mesh>

      {/* Brain stem */}
      <mesh position={[0, 1.45, -0.02]}>
        <cylinderGeometry args={[0.02, 0.025, 0.1, 8]} />
        <meshStandardMaterial color={brainColor} transparent opacity={opacity} />
      </mesh>

      {/* Spinal cord */}
      <mesh position={[0, 1.05, -0.04]}>
        <cylinderGeometry args={[0.018, 0.015, 0.8, 8]} />
        <meshStandardMaterial color={nerveColor} transparent opacity={opacity} />
      </mesh>

      {/* Nerve branches */}
      {Array.from({ length: 10 }).map((_, i) => (
        <group key={`nerve-${i}`}>
          <mesh position={[-0.06, 1.25 - i * 0.07, -0.02]} rotation={[0, 0, Math.PI / 3]}>
            <cylinderGeometry args={[0.004, 0.002, 0.12, 4]} />
            <meshStandardMaterial color={nerveColor} transparent opacity={opacity * 0.7} />
          </mesh>
          <mesh position={[0.06, 1.25 - i * 0.07, -0.02]} rotation={[0, 0, -Math.PI / 3]}>
            <cylinderGeometry args={[0.004, 0.002, 0.12, 4]} />
            <meshStandardMaterial color={nerveColor} transparent opacity={opacity * 0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Muscular system visualization
function MuscularSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const muscleColor = '#CD5C5C';

  if (!visible) return null;

  return (
    <group>
      {/* Trapezius */}
      <mesh position={[0, 1.32, -0.03]} scale={[2, 0.8, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity * 0.9} />
      </mesh>

      {/* Pectorals */}
      <mesh position={[-0.07, 1.18, 0.1]} scale={[1, 0.55, 0.35]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.07, 1.18, 0.1]} scale={[1, 0.55, 0.35]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>

      {/* Deltoids */}
      <mesh position={[-0.18, 1.22, 0]} scale={[0.7, 0.9, 0.7]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.18, 1.22, 0]} scale={[0.7, 0.9, 0.7]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>

      {/* Abs */}
      {Array.from({ length: 4 }).map((_, i) => (
        <group key={`abs-${i}`}>
          <mesh position={[-0.035, 1.0 - i * 0.055, 0.1]} scale={[0.9, 0.5, 0.35]}>
            <sphereGeometry args={[0.032, 8, 8]} />
            <meshStandardMaterial color={muscleColor} transparent opacity={opacity * 0.9} />
          </mesh>
          <mesh position={[0.035, 1.0 - i * 0.055, 0.1]} scale={[0.9, 0.5, 0.35]}>
            <sphereGeometry args={[0.032, 8, 8]} />
            <meshStandardMaterial color={muscleColor} transparent opacity={opacity * 0.9} />
          </mesh>
        </group>
      ))}

      {/* Biceps */}
      <mesh position={[-0.26, 1.12, 0.02]} scale={[0.55, 1.2, 0.55]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.26, 1.12, 0.02]} scale={[0.55, 1.2, 0.55]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>

      {/* Quadriceps */}
      <mesh position={[-0.085, 0.48, 0.04]} scale={[0.85, 1.6, 0.65]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.085, 0.48, 0.04]} scale={[0.85, 1.6, 0.65]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>

      {/* Calves */}
      <mesh position={[-0.08, 0.12, -0.02]} scale={[0.65, 1.2, 0.8]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.08, 0.12, -0.02]} scale={[0.65, 1.2, 0.8]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
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

  // Use visibleSystems prop if provided, otherwise fall back to activeSystem logic
  const showSystem = (system: BodySystem) => {
    if (visibleSystems) {
      return visibleSystems.has(system);
    }
    return activeSystem === null || activeSystem === system;
  };

  const systemOpacity = 0.85;

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {/* Human body silhouette - transparent X-ray style */}
      <HumanBodySilhouette opacity={xrayOpacity} />

      {/* Anatomical systems - layered from inside to outside */}
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
