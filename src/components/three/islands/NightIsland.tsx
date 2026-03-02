// ============================================================
// INNER WORLDS – Night Island 3D Scene
// Emotion: Achtsamkeit (Mindfulness)
// ============================================================
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function BioluminescentMushrooms() {
  const mushrooms = useMemo(() =>
    Array.from({ length: 20 }, () => ({
      x: (Math.random() - 0.5) * 15,
      z: (Math.random() - 0.5) * 15,
      scale: 0.3 + Math.random() * 0.5,
      color: ['#00BCD4', '#00E5FF', '#84FFFF', '#18FFFF'][Math.floor(Math.random() * 4)],
      phase: Math.random() * Math.PI * 2,
    }))
  , []);

  return (
    <group>
      {mushrooms.map((m, i) => (
        <BioMushroom key={i} {...m} />
      ))}
    </group>
  );
}

function BioMushroom({ x, z, scale, color, phase }: {
  x: number; z: number; scale: number; color: string; phase: number;
}) {
  const glowRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const time = state.clock.elapsedTime;
      // Proximity-based glow (simulated with sin wave)
      glowRef.current.emissiveIntensity = 0.5 + Math.sin(time * 1.5 + phase) * 0.3;
    }
  });

  return (
    <group position={[x, 0, z]} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.3, 8]} />
        <meshStandardMaterial color="#37474F" />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          ref={glowRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Glow light */}
      <pointLight position={[0, 0.4, 0]} intensity={0.3} color={color} distance={2} />
    </group>
  );
}

function Constellations() {
  // Create recognizable constellation patterns
  const constellationLines = useMemo(() => {
    // Orion-like pattern
    const orion: [number, number, number][] = [
      [-3, 12, -20], [-2, 11, -20], [-1, 12, -20],
      [-2, 10, -20], [-2, 9, -20], [-2, 8, -20],
      [-3, 7, -20], [-1, 7, -20],
    ];
    return orion;
  }, []);

  return (
    <group>
      {constellationLines.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="white"
            emissive="white"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

function MilkyWay() {
  const count = 500;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const stars = useMemo(
    () => Array.from({ length: count }, () => {
      const t = Math.random() * Math.PI * 2;
      const spread = 3 + Math.random() * 2;
      return {
        x: Math.cos(t) * spread * 3 + (Math.random() - 0.5) * 4,
        y: 10 + Math.sin(t) * spread + (Math.random() - 0.5) * 2,
        z: -15 + (Math.random() - 0.5) * 10,
        size: 0.01 + Math.random() * 0.03,
        twinkle: Math.random() * Math.PI * 2,
      };
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const s = stars[i];
      dummy.position.set(s.x, s.y, s.z);
      const scale = s.size * (0.8 + Math.sin(time * 2 + s.twinkle) * 0.2);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial
        color="#E8EAF6"
        emissive="#B3E5FC"
        emissiveIntensity={1.5}
      />
    </instancedMesh>
  );
}

function Moon() {
  return (
    <group position={[8, 12, -15]}>
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial
          color="#ECEFF1"
          emissive="#CFD8DC"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Moon glow */}
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial
          color="#CFD8DC"
          transparent
          opacity={0.1}
          emissive="#B0BEC5"
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight intensity={0.5} color="#CFD8DC" distance={30} />
    </group>
  );
}

function WaterReflections() {
  const ref = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, -0.05, 2]}>
      <circleGeometry args={[3, 32]} />
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
            vec2 uv = vUv;
            float ripple = sin(length(uv - 0.5) * 20.0 - uTime * 2.0) * 0.5 + 0.5;
            float moon = smoothstep(0.6, 0.3, length(uv - vec2(0.6, 0.6)));
            vec3 color = mix(vec3(0.02, 0.05, 0.15), vec3(0.1, 0.2, 0.4), ripple);
            color += moon * vec3(0.3, 0.35, 0.4);
            gl_FragColor = vec4(color, 0.8);
          }
        `}
      />
    </mesh>
  );
}

export default function NightScene() {
  return (
    <group>
      {/* Dark ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0D1117" roughness={1} />
      </mesh>

      <Moon />
      <MilkyWay />
      <Constellations />
      <BioluminescentMushrooms />
      <WaterReflections />

      {/* Ambient night lighting */}
      <ambientLight intensity={0.08} color="#4A5ACF" />
      <pointLight position={[0, 3, 0]} intensity={0.15} color="#00BCD4" />
    </group>
  );
}
