// ============================================================
// INNER WORLDS – Home Island 3D Scene
// Emotion: Integration (Wholeness/Self-Acceptance)
// ============================================================
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function House() {
  return (
    <group position={[0, 0, -2]}>
      {/* Base */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial color="#FFF8E1" roughness={0.8} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.5, 1.5, 4]} />
        <meshStandardMaterial color="#D84315" roughness={0.7} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.6, 1.51]}>
        <boxGeometry args={[0.8, 1.2, 0.05]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      {/* Windows */}
      {[[-1, 1.2, 1.51], [1, 1.2, 1.51]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.6, 0.6, 0.05]} />
          <meshStandardMaterial
            color="#FFD54F"
            emissive="#FFD54F"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      {/* Warm light from windows */}
      <pointLight position={[0, 1.2, 2]} intensity={0.8} color="#FFD54F" distance={8} />
      {/* Chimney */}
      <mesh position={[1.2, 3.2, -0.5]}>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color="#795548" />
      </mesh>
    </group>
  );
}

function GoldenTree() {
  const leavesRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (leavesRef.current) {
      const mat = leavesRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={[-4, 0, 1]}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      <mesh ref={leavesRef} position={[0, 4.5, 0]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      <pointLight position={[0, 4, 0]} intensity={0.5} color="#FFD700" distance={8} />
    </group>
  );
}

function GardenPath() {
  return (
    <group>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.01, 2 + i * 1]}
          rotation={[-Math.PI / 2, 0, (Math.random() - 0.5) * 0.2]}
        >
          <circleGeometry args={[0.3, 6]} />
          <meshStandardMaterial color="#BCAAA4" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Fireplace() {
  const count = 15;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const t = ((time * 1.5 + i * 0.5) % 3) / 3;
      dummy.position.set(
        1.2 + Math.sin(i * 2 + time) * 0.1,
        3.5 + t * 2,
        -0.5 + Math.cos(i * 3 + time) * 0.1
      );
      dummy.scale.setScalar(0.04 * (1 - t));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#BDBDBD"
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

function IslandGlow() {
  // Soft golden glow that emanates from the island
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
    }
  });

  return (
    <mesh ref={ref} position={[0, 2, -2]}>
      <sphereGeometry args={[12, 16, 16]} />
      <meshStandardMaterial
        color="#FFD700"
        transparent
        opacity={0.03}
        emissive="#FFD700"
        emissiveIntensity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default function HomeScene() {
  return (
    <group>
      {/* Warm, green ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#66BB6A" roughness={0.95} />
      </mesh>

      <House />
      <GoldenTree />
      <GardenPath />
      <Fireplace />
      <IslandGlow />

      {/* Small flowers around the house */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 5 + Math.random() * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, 0.15, Math.sin(angle) * r]}
          >
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshStandardMaterial
              color={['#E91E63', '#FFC107', '#9C27B0', '#FF5722'][i % 4]}
              emissive={['#E91E63', '#FFC107', '#9C27B0', '#FF5722'][i % 4]}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}

      {/* Warm ambient */}
      <pointLight position={[0, 8, 0]} intensity={0.6} color="#FFF3E0" />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#FFD54F" />
    </group>
  );
}
