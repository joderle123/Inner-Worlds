// ============================================================
// INNER WORLDS – Forest Island 3D Scene
// Emotion: Angst (Fear/Anxiety)
// ============================================================
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Tree({ position, height = 4, color = '#1B5E20' }: { position: [number, number, number]; height?: number; color?: string }) {
  const leavesRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (leavesRef.current) {
      const time = state.clock.elapsedTime;
      // Wind sway
      leavesRef.current.rotation.z = Math.sin(time * 0.5 + position[0]) * 0.03;
      leavesRef.current.rotation.x = Math.cos(time * 0.3 + position[2]) * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.15, 0.25, height, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      {/* Leaves */}
      <mesh ref={leavesRef} position={[0, height + 0.5, 0]}>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      <mesh position={[0, height - 0.5, 0]}>
        <coneGeometry args={[1.8, 2.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
    </group>
  );
}

function AncientTree() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const material = glowRef.current.material as THREE.MeshStandardMaterial;
      // Heartbeat pulse
      const time = state.clock.elapsedTime;
      const heartbeat = Math.pow(Math.sin(time * 1.2), 20) * 0.5 + Math.pow(Math.sin(time * 1.2 + 0.3), 20) * 0.3;
      material.emissiveIntensity = 0.3 + heartbeat;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Massive trunk */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.8, 1.2, 6, 12]} />
        <meshStandardMaterial color="#3E2723" roughness={0.95} />
      </mesh>
      {/* Glowing core */}
      <mesh ref={glowRef} position={[0, 2, 0.5]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshStandardMaterial
          color="#76FF03"
          emissive="#76FF03"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Canopy */}
      <mesh position={[0, 6, 0]}>
        <sphereGeometry args={[3, 12, 12]} />
        <meshStandardMaterial color="#1B5E20" roughness={0.9} transparent opacity={0.85} />
      </mesh>
      {/* Roots */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.5, 0.2, Math.sin(angle) * 1.5]}
            rotation={[0, angle, Math.PI / 6]}
          >
            <cylinderGeometry args={[0.15, 0.05, 2, 6]} />
            <meshStandardMaterial color="#4E342E" roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}

function Fireflies() {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(
    () => Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 15,
      y: Math.random() * 3 + 0.5,
      z: (Math.random() - 0.5) * 15,
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const blink = Math.sin(time * p.speed * 3 + p.phase) * 0.5 + 0.5;
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.phase) * 0.5,
        p.y + Math.cos(time * p.speed * 0.7) * 0.3,
        p.z + Math.cos(time * p.speed + p.phase) * 0.5
      );
      dummy.scale.setScalar(0.03 + blink * 0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#CCFF00"
        emissive="#AAFF00"
        emissiveIntensity={3}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

function GroundFog() {
  const fogRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (fogRef.current) {
      const material = fogRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={fogRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#90A4AE"
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function ForestScene() {
  // Tree positions
  const trees = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 4 + Math.random() * 8;
      positions.push([
        Math.cos(angle) * dist,
        0,
        Math.sin(angle) * dist,
      ]);
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#2E4820" roughness={1} />
      </mesh>

      {/* Trees */}
      {trees.map((pos, i) => (
        <Tree
          key={i}
          position={pos}
          height={3 + Math.random() * 3}
          color={['#1B5E20', '#2E7D32', '#388E3C', '#1B4D1B'][i % 4]}
        />
      ))}

      {/* Ancient Tree */}
      <AncientTree />

      {/* Fireflies */}
      <Fireflies />

      {/* Ground fog */}
      <GroundFog />

      {/* Atmospheric lighting */}
      <pointLight position={[0, 8, -2]} intensity={0.3} color="#76FF03" />

      {/* Fog */}
      <fog attach="fog" args={['#1a2f1a', 8, 30]} />
    </group>
  );
}
