// ============================================================
// INNER WORLDS – Ocean Island 3D Scene
// Emotion: Trauer (Sadness/Grief)
// ============================================================
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color('#0A1628') },
      uSurface: { value: new THREE.Color('#1A5276') },
      uFoam: { value: new THREE.Color('#D4E6F1') },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float wave = sin(pos.x * 1.5 + uTime) * cos(pos.z * 1.0 + uTime * 0.7) * 0.3;
        wave += sin(pos.x * 3.0 + uTime * 1.5) * 0.1;
        pos.y += wave;
        vWave = wave;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uSurface;
      uniform vec3 uFoam;
      void main() {
        float depth = smoothstep(-0.3, 0.3, vWave);
        vec3 color = mix(uDeep, uSurface, depth);
        float foam = smoothstep(0.2, 0.3, vWave) * 0.5;
        color = mix(color, uFoam, foam);
        float shimmer = sin(vUv.x * 20.0 + uTime * 2.0) * sin(vUv.y * 15.0 + uTime * 1.5) * 0.05;
        color += shimmer;
        gl_FragColor = vec4(color, 0.9);
      }
    `,
  }), []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[40, 40, 64, 64]} />
      <shaderMaterial ref={materialRef} {...shader} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function SandIsland() {
  return (
    <group position={[0, -0.3, 0]}>
      {/* Main sand area */}
      <mesh>
        <cylinderGeometry args={[5, 6, 0.5, 24]} />
        <meshStandardMaterial color="#C2B280" roughness={0.9} />
      </mesh>
      {/* Small dunes */}
      <mesh position={[-2, 0.3, 1]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color="#D2C290" roughness={0.9} />
      </mesh>
      <mesh position={[1.5, 0.2, -2]}>
        <sphereGeometry args={[0.8, 12, 8]} />
        <meshStandardMaterial color="#D2C290" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Shells() {
  return (
    <group>
      {[
        [2, 0.1, 3], [-3, 0.1, 2], [1, 0.1, -2], [-2, 0.1, -3],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[0, i * 1.5, 0]}>
          <sphereGeometry args={[0.1, 8, 4, 0, Math.PI]} />
          <meshStandardMaterial color="#FFF5EE" roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function RainDrops() {
  const count = 100;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const offsets = useMemo(
    () => Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
      speed: 2 + Math.random() * 3,
      offset: Math.random() * 10,
    })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const { x, z, speed, offset } = offsets[i];
      const y = ((time * speed + offset) % 10) - 1;
      dummy.position.set(x, 10 - y, z);
      dummy.scale.set(0.02, 0.3, 0.02);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[1, 1, 1, 4]} />
      <meshStandardMaterial color="#85C1E9" transparent opacity={0.3} />
    </instancedMesh>
  );
}

export default function OceanScene() {
  return (
    <group>
      <Ocean />
      <SandIsland />
      <Shells />
      <RainDrops />

      {/* Lighting */}
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#85C1E9" />
      <pointLight position={[-5, 3, 5]} intensity={0.3} color="#2980B9" />

      {/* Fog */}
      <fog attach="fog" args={['#0A1628', 15, 50]} />
    </group>
  );
}
