// ============================================================
// INNER WORLDS – Mountain Island 3D Scene
// Emotion: Selbstwert (Self-Worth)
// ============================================================
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Mountain() {
  return (
    <group position={[0, 0, -5]}>
      {/* Main peak */}
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[6, 10, 8]} />
        <meshStandardMaterial color="#607D8B" roughness={0.9} />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 8.5, 0]}>
        <coneGeometry args={[2.5, 2, 8]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.5} />
      </mesh>
      {/* Secondary peaks */}
      <mesh position={[-4, 2, 2]}>
        <coneGeometry args={[3, 5, 6]} />
        <meshStandardMaterial color="#546E7A" roughness={0.9} />
      </mesh>
      <mesh position={[5, 2.5, 1]}>
        <coneGeometry args={[3.5, 6, 6]} />
        <meshStandardMaterial color="#546E7A" roughness={0.9} />
      </mesh>
    </group>
  );
}

function MirrorAtTop() {
  const mirrorRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mirrorRef.current) {
      mirrorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 5, -3]}>
      {/* Mirror frame */}
      <mesh ref={mirrorRef}>
        <boxGeometry args={[1.5, 2.5, 0.1]} />
        <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Mirror surface */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[1.2, 2.2]} />
        <meshStandardMaterial
          color="#C0C8FF"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2}
        />
      </mesh>
      {/* Glow */}
      <pointLight position={[0, 0, 1]} intensity={0.5} color="#C0C8FF" distance={5} />
    </group>
  );
}

function SnowParticles() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  const particles = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 20,
    y: Math.random() * 15,
    z: (Math.random() - 0.5) * 20,
    speed: 0.3 + Math.random() * 0.5,
    drift: (Math.random() - 0.5) * 0.5,
  }));

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const y = ((p.y - time * p.speed) % 15 + 15) % 15;
      dummy.position.set(
        p.x + Math.sin(time * 0.3 + i) * p.drift,
        y,
        p.z + Math.cos(time * 0.2 + i) * p.drift
      );
      dummy.scale.setScalar(0.04);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial color="white" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function WindLights() {
  const count = 8;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + time * 0.1;
      const radius = 3 + Math.sin(time * 0.5 + i) * 0.5;
      dummy.position.set(
        Math.cos(angle) * radius,
        3 + Math.sin(time * 0.3 + i * 2) * 1.5,
        -3 + Math.sin(angle) * radius
      );
      dummy.scale.setScalar(0.08);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={2}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

export default function MountainScene() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#455A64" roughness={1} />
      </mesh>

      <Mountain />
      <MirrorAtTop />
      <SnowParticles />
      <WindLights />

      {/* Path up the mountain */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          position={[Math.sin(i * 0.8) * 2, i * 0.8, -i * 0.8]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.3, 8]} />
          <meshStandardMaterial color="#78909C" roughness={0.9} />
        </mesh>
      ))}

      {/* Fog */}
      <fog attach="fog" args={['#78909C', 10, 40]} />
    </group>
  );
}
