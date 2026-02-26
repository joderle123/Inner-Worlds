// ============================================================
// INNER WORLDS – Garden Island 3D Scene
// Emotion: Verbindung (Connection)
// ============================================================
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Flower({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  const flowerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (flowerRef.current) {
      flowerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
    }
  });

  return (
    <group ref={flowerRef} position={position}>
      {/* Stem */}
      <mesh position={[0, size * 2, 0]}>
        <cylinderGeometry args={[0.02, 0.03, size * 4, 6]} />
        <meshStandardMaterial color="#2E7D32" />
      </mesh>
      {/* Petals */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * size * 0.4,
              size * 4,
              Math.sin(angle) * size * 0.4,
            ]}
          >
            <sphereGeometry args={[size * 0.3, 8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}
      {/* Center */}
      <mesh position={[0, size * 4, 0]}>
        <sphereGeometry args={[size * 0.15, 8, 8]} />
        <meshStandardMaterial color="#FDD835" />
      </mesh>
    </group>
  );
}

function BrokenBridge({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Left side */}
      <mesh position={[-1, 0.2, 0]}>
        <boxGeometry args={[1.5, 0.15, 0.8]} />
        <meshStandardMaterial color="#795548" roughness={0.9} />
      </mesh>
      {/* Right side (broken/fallen) */}
      <mesh position={[1, -0.2, 0.3]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[1.2, 0.15, 0.8]} />
        <meshStandardMaterial color="#6D4C41" roughness={0.9} />
      </mesh>
      {/* Posts */}
      <mesh position={[-1.5, 0.5, 0.3]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      <mesh position={[-1.5, 0.5, -0.3]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 6]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
    </group>
  );
}

function Butterflies() {
  const count = 15;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  const butterflies = Array.from({ length: count }, () => ({
    cx: (Math.random() - 0.5) * 10,
    cy: 1 + Math.random() * 3,
    cz: (Math.random() - 0.5) * 10,
    speed: 0.5 + Math.random(),
    radius: 1 + Math.random() * 2,
    phase: Math.random() * Math.PI * 2,
  }));

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const b = butterflies[i];
      dummy.position.set(
        b.cx + Math.sin(time * b.speed + b.phase) * b.radius,
        b.cy + Math.sin(time * b.speed * 2) * 0.5,
        b.cz + Math.cos(time * b.speed + b.phase) * b.radius
      );
      dummy.scale.set(0.08, 0.04, 0.08);
      dummy.rotation.y = time * b.speed + b.phase;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#FF69B4"
        emissive="#FF69B4"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

function WaterStream() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, 0.05, 0]}>
      <planeGeometry args={[1, 12, 1, 32]} />
      <shaderMaterial
        ref={ref}
        transparent
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          void main() {
            float flow = sin((vUv.y + uTime * 0.3) * 20.0) * 0.5 + 0.5;
            vec3 color = mix(vec3(0.2, 0.5, 0.8), vec3(0.4, 0.7, 1.0), flow);
            float alpha = 0.4 + flow * 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export default function GardenScene() {
  const flowerPositions: { pos: [number, number, number]; color: string }[] = [
    { pos: [-3, 0, 2], color: '#E91E63' },
    { pos: [-4, 0, -1], color: '#9C27B0' },
    { pos: [3, 0, 3], color: '#FF5722' },
    { pos: [4, 0, -3], color: '#FFC107' },
    { pos: [-1, 0, 4], color: '#E91E63' },
    { pos: [1, 0, -4], color: '#FF9800' },
    { pos: [-5, 0, 3], color: '#F44336' },
    { pos: [5, 0, 1], color: '#9C27B0' },
  ];

  return (
    <group>
      {/* Ground - grass */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.95} />
      </mesh>

      {/* Flowers */}
      {flowerPositions.map((f, i) => (
        <Flower key={i} position={f.pos} color={f.color} size={0.2 + Math.random() * 0.2} />
      ))}

      {/* Broken bridges */}
      <BrokenBridge position={[-2, 0, -1]} rotation={0.5} />
      <BrokenBridge position={[3, 0, -2]} rotation={-0.8} />
      <BrokenBridge position={[0, 0, 3]} rotation={1.2} />

      {/* Butterflies */}
      <Butterflies />

      {/* Water stream */}
      <WaterStream />

      {/* Warm lighting */}
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFF9C4" />
      <pointLight position={[-3, 2, 3]} intensity={0.3} color="#FFD54F" />
    </group>
  );
}
