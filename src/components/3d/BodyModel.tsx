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
          <div className="bg-white px-3 py-2 rounded-xl shadow-lg whitespace-nowrap border-2"
               style={{ borderColor: systemColor }}>
            <p className="text-sm font-bold text-gray-800">
              {language === 'vi' ? organ.nameVi : organ.nameEn}
            </p>
            <p className="text-xs text-gray-500">
              {language === 'vi' ? 'Nhấn để xem chi tiết' : 'Click for details'}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

// Realistic human body shape using custom geometry
function HumanBodyMesh({ opacity }: { opacity: number }) {
  const bodyGroup = useRef<THREE.Group>(null);

  // Create smooth body shape using Catmull-Rom splines
  const bodyShape = useMemo(() => {
    // Head
    const headGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    headGeometry.translate(0, 1.55, 0);

    // Neck
    const neckGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.1, 16);
    neckGeometry.translate(0, 1.38, 0);

    // Torso - using LatheGeometry for smoother shape
    const torsoPoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.18, 0),
      new THREE.Vector2(0.2, 0.1),
      new THREE.Vector2(0.18, 0.25),
      new THREE.Vector2(0.15, 0.4),
      new THREE.Vector2(0.16, 0.5),
      new THREE.Vector2(0.14, 0.55),
      new THREE.Vector2(0, 0.55),
    ];
    const torsoGeometry = new THREE.LatheGeometry(torsoPoints, 32);
    torsoGeometry.translate(0, 0.75, 0);

    return { headGeometry, neckGeometry, torsoGeometry };
  }, []);

  const skinMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#E8BEAC',
      roughness: 0.7,
      metalness: 0,
      transparent: true,
      opacity: opacity * 0.4,
      side: THREE.DoubleSide,
      clearcoat: 0.1,
    });
  }, [opacity]);

  return (
    <group ref={bodyGroup}>
      {/* Head */}
      <mesh geometry={bodyShape.headGeometry} material={skinMaterial} />

      {/* Neck */}
      <mesh geometry={bodyShape.neckGeometry} material={skinMaterial} />

      {/* Torso */}
      <mesh geometry={bodyShape.torsoGeometry} material={skinMaterial} />

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
        <mesh key={`vertebra-${i}`} position={[0, 1.3 - i * 0.035, 0]}>
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
      <mesh position={[0, 0.72, 0]}>
        <torusGeometry args={[0.12, 0.03, 8, 16, Math.PI]} />
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
      <mesh position={[0.03, 1.15, 0.05]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={arteryColor} transparent opacity={opacity} emissive={arteryColor} emissiveIntensity={0.2} />
      </mesh>

      {/* Aorta */}
      <mesh position={[0, 1.25, 0]}>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.03, -0.1, 0.05),
            new THREE.Vector3(0.02, 0, 0.03),
            new THREE.Vector3(0, 0.1, 0),
            new THREE.Vector3(-0.02, 0.2, -0.02),
          ]),
          32, 0.015, 8, false
        ]} />
        <meshStandardMaterial color={arteryColor} transparent opacity={opacity} />
      </mesh>

      {/* Main vessels down the body */}
      <mesh position={[0.05, 0.9, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
        <meshStandardMaterial color={arteryColor} transparent opacity={opacity * 0.8} />
      </mesh>
      <mesh position={[-0.05, 0.9, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
        <meshStandardMaterial color={veinColor} transparent opacity={opacity * 0.8} />
      </mesh>
    </group>
  );
}

// Respiratory system visualization
function RespiratorySystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const lungColor = '#FFB6C1';

  if (!visible) return null;

  return (
    <group>
      {/* Trachea */}
      <mesh position={[0, 1.35, 0.02]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 16]} />
        <meshStandardMaterial color="#F0E68C" transparent opacity={opacity} />
      </mesh>

      {/* Left Lung */}
      <mesh position={[-0.08, 1.1, 0.02]} scale={[0.8, 1, 0.6]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={lungColor} transparent opacity={opacity * 0.7} />
      </mesh>

      {/* Right Lung */}
      <mesh position={[0.08, 1.1, 0.02]} scale={[0.85, 1, 0.6]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={lungColor} transparent opacity={opacity * 0.7} />
      </mesh>
    </group>
  );
}

// Digestive system visualization
function DigestiveSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  if (!visible) return null;

  return (
    <group>
      {/* Stomach */}
      <mesh position={[-0.05, 0.95, 0.03]} rotation={[0, 0, 0.3]} scale={[1, 1.3, 0.7]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#FFA07A" transparent opacity={opacity} />
      </mesh>

      {/* Liver */}
      <mesh position={[0.08, 1.0, 0.02]} scale={[1.2, 0.8, 0.5]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#8B4513" transparent opacity={opacity} />
      </mesh>

      {/* Intestines */}
      <mesh position={[0, 0.8, 0.02]}>
        <torusGeometry args={[0.08, 0.025, 8, 32]} />
        <meshStandardMaterial color="#DEB887" transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 0.8, 0.02]} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[0.06, 0.02, 8, 32]} />
        <meshStandardMaterial color="#DEB887" transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

// Nervous system visualization
function NervousSystem({ visible, opacity }: { visible: boolean; opacity: number }) {
  const nerveColor = '#FFD700';

  if (!visible) return null;

  return (
    <group>
      {/* Brain */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial color="#FFB6C1" transparent opacity={opacity} />
      </mesh>

      {/* Spinal cord */}
      <mesh position={[0, 1.1, -0.03]}>
        <cylinderGeometry args={[0.015, 0.012, 0.7, 8]} />
        <meshStandardMaterial color={nerveColor} transparent opacity={opacity} />
      </mesh>

      {/* Nerve branches */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={`nerve-${i}`}>
          <mesh position={[-0.08, 1.2 - i * 0.08, -0.02]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.003, 0.002, 0.1, 4]} />
            <meshStandardMaterial color={nerveColor} transparent opacity={opacity * 0.7} />
          </mesh>
          <mesh position={[0.08, 1.2 - i * 0.08, -0.02]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.003, 0.002, 0.1, 4]} />
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
      {/* Pectorals */}
      <mesh position={[-0.06, 1.18, 0.08]} scale={[1, 0.6, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.06, 1.18, 0.08]} scale={[1, 0.6, 0.3]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>

      {/* Abs */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={`abs-${i}`}>
          <mesh position={[-0.03, 1.0 - i * 0.06, 0.08]} scale={[0.8, 0.5, 0.3]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={muscleColor} transparent opacity={opacity * 0.9} />
          </mesh>
          <mesh position={[0.03, 1.0 - i * 0.06, 0.08]} scale={[0.8, 0.5, 0.3]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color={muscleColor} transparent opacity={opacity * 0.9} />
          </mesh>
        </group>
      ))}

      {/* Biceps */}
      <mesh position={[-0.25, 1.15, 0]} scale={[0.6, 1, 0.6]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.25, 1.15, 0]} scale={[0.6, 1, 0.6]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>

      {/* Quadriceps */}
      <mesh position={[-0.08, 0.5, 0.03]} scale={[0.8, 1.5, 0.6]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0.08, 0.5, 0.03]} scale={[0.8, 1.5, 0.6]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={muscleColor} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

interface BodyModelProps {
  onOrganClick?: (organ: Organ) => void;
  highlightOrgan?: string;
}

export default function BodyModel({ onOrganClick, highlightOrgan }: BodyModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { activeSystem, xrayOpacity, setSelectedOrgan } = useExplorerStore();

  const handleOrganClick = (organ: Organ) => {
    setSelectedOrgan(organ);
    onOrganClick?.(organ);
  };

  // Determine which systems to show
  const showSystem = (system: BodySystem) => {
    return activeSystem === null || activeSystem === system;
  };

  const systemOpacity = 0.85;

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      {/* Body outline */}
      <HumanBodyMesh opacity={xrayOpacity} />

      {/* Anatomical systems - layered from inside to outside */}
      <SkeletalSystem visible={showSystem('skeletal')} opacity={systemOpacity} />
      <NervousSystem visible={showSystem('nervous')} opacity={systemOpacity} />
      <CirculatorySystem visible={showSystem('circulatory')} opacity={systemOpacity} />
      <RespiratorySystem visible={showSystem('respiratory')} opacity={systemOpacity} />
      <DigestiveSystem visible={showSystem('digestive')} opacity={systemOpacity} />
      <MuscularSystem visible={showSystem('muscular')} opacity={systemOpacity} />

      {/* Interactive organ hotspots */}
      {bodySystems.map((system) => {
        const isActiveSystem = activeSystem === null || activeSystem === system.id;
        return (
          <group key={system.id}>
            {system.organs.map((organ) => (
              <OrganHotspot
                key={organ.id}
                organ={organ}
                systemColor={system.color}
                isActive={isActiveSystem}
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
