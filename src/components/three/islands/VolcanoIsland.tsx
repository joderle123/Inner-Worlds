// ============================================================
// INNER WORLDS – Volcano Island 3D Scene
// Emotion: Wut (Anger)
// ============================================================
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function LavaFlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#FF4500') },
        uColor2: { value: new THREE.Color('#FF0000') },
        uColor3: { value: new THREE.Color('#8B0000') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        uniform float uTime;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float displacement = sin(pos.x * 3.0 + uTime) * cos(pos.z * 2.0 + uTime * 0.5) * 0.15;
          pos.y += displacement;
          vDisplacement = displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDisplacement;
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        void main() {
          float scrollUV = vUv.y + uTime * 0.1;
          float flow = sin(scrollUV * 8.0) * 0.5 + 0.5;
          float pulse = sin(uTime * 2.0) * 0.1 + 0.9;
          vec3 color = mix(uColor3, mix(uColor2, uColor1, flow), pulse);
          color += vDisplacement * 2.0;
          float glow = smoothstep(0.3, 0.7, flow) * 0.5;
          gl_FragColor = vec4(color + glow, 1.0);
        }
      `,
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        {...shader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Volcano() {
  return (
    <group position={[0, 0, -3]}>
      {/* Main volcano cone */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[4, 5, 16]} />
        <meshStandardMaterial color="#2C1810" roughness={0.9} />
      </mesh>
      {/* Crater opening */}
      <mesh position={[0, 4.5, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 2, 0.5, 16]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF2200"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Glow from crater */}
      <pointLight position={[0, 5, 0]} intensity={2} color="#FF4500" distance={15} />
    </group>
  );
}

function LavaParticles() {
  const count = 30;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const speeds = useMemo(
    () => Array.from({ length: count }, () => 0.5 + Math.random() * 2),
    []
  );
  const offsets = useMemo(
    () => Array.from({ length: count }, () => Math.random() * Math.PI * 2),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const t = ((time * speeds[i] + offsets[i]) % 4) / 4;
      dummy.position.set(
        Math.sin(offsets[i] * 3) * 2,
        t * 8 - 1,
        -3 + Math.cos(offsets[i] * 5) * 2
      );
      dummy.scale.setScalar(0.05 + (1 - t) * 0.1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#FF6600"
        emissive="#FF4400"
        emissiveIntensity={2}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

function CrackedGround() {
  return (
    <group>
      {/* Terrain base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1C1008" roughness={1} />
      </mesh>
      {/* Rock formations */}
      {[
        { pos: [-5, 0, 2] as [number, number, number], scale: 1.2 },
        { pos: [4, 0, 4] as [number, number, number], scale: 0.8 },
        { pos: [-3, 0, -5] as [number, number, number], scale: 1.0 },
        { pos: [6, 0, -2] as [number, number, number], scale: 0.6 },
      ].map((rock, i) => (
        <mesh key={i} position={rock.pos}>
          <dodecahedronGeometry args={[rock.scale, 0]} />
          <meshStandardMaterial color="#3D2817" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function VolcanoScene() {
  // Screen shake effect
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    // Subtle rumble every ~30 seconds
    const shakeIntensity = Math.max(0, Math.sin(time * 0.2) * 0.8 - 0.5) * 0.02;
    groupRef.current.position.x = Math.sin(time * 15) * shakeIntensity;
    groupRef.current.position.y = Math.cos(time * 12) * shakeIntensity;
  });

  return (
    <group ref={groupRef}>
      <CrackedGround />
      <LavaFlow />
      <Volcano />
      <LavaParticles />

      {/* Ambient lava glow */}
      <pointLight position={[0, 1, 0]} intensity={1.5} color="#FF4500" distance={20} />
      <pointLight position={[-5, 0.5, 3]} intensity={0.5} color="#FF6600" distance={8} />
      <pointLight position={[5, 0.5, -2]} intensity={0.5} color="#FF2200" distance={8} />

      {/* Fog effect */}
      <fog attach="fog" args={['#1C0A00', 10, 40]} />
    </group>
  );
}
